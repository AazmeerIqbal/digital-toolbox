import { useState, useCallback, useMemo } from "react";
import { motion } from "framer-motion";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  FileUser,
  Download,
  Plus,
  Trash2,
  Eye,
  AlertCircle,
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { ToolLayout } from "@/components/ToolLayout";
import { SEOHead } from "@/components/SEOHead";
import { getSEOConfig } from "@/lib/seo-config";
import jsPDF from "jspdf";

interface Experience {
  company: string;
  position: string;
  duration: string;
  description: string;
}

interface Education {
  institution: string;
  degree: string;
  year: string;
}

interface ResumeData {
  name: string;
  email: string;
  phone: string;
  address: string;
  summary: string;
  experience: Experience[];
  education: Education[];
  skills: string[];
}

interface ValidationErrors {
  [key: string]: string;
}

export default function ResumeBuilder() {
  const seoConfig = getSEOConfig("resume-builder");
  const [resumeData, setResumeData] = useState<ResumeData>({
    name: "",
    email: "",
    phone: "",
    address: "",
    summary: "",
    experience: [{ company: "", position: "", duration: "", description: "" }],
    education: [{ institution: "", degree: "", year: "" }],
    skills: [""],
  });

  const [activeTab, setActiveTab] = useState("personal");
  const [showPreview, setShowPreview] = useState(false);
  const [validationErrors, setValidationErrors] = useState<ValidationErrors>(
    {}
  );
  const { toast } = useToast();

  // Memoized validation function
  const validateResume = useCallback((data: ResumeData): ValidationErrors => {
    const errors: ValidationErrors = {};

    if (!data.name.trim()) errors.name = "Name is required";
    if (!data.email.trim()) errors.email = "Email is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
      errors.email = "Invalid email format";
    }
    if (!data.phone.trim()) errors.phone = "Phone is required";
    if (!data.summary.trim())
      errors.summary = "Professional summary is required";

    // Validate experience
    data.experience.forEach((exp, index) => {
      if (!exp.company.trim())
        errors[`exp_${index}_company`] = "Company is required";
      if (!exp.position.trim())
        errors[`exp_${index}_position`] = "Position is required";
      if (!exp.duration.trim())
        errors[`exp_${index}_duration`] = "Duration is required";
      if (!exp.description.trim())
        errors[`exp_${index}_description`] = "Description is required";
    });

    // Validate education
    data.education.forEach((edu, index) => {
      if (!edu.institution.trim())
        errors[`edu_${index}_institution`] = "Institution is required";
      if (!edu.degree.trim())
        errors[`edu_${index}_degree`] = "Degree is required";
      if (!edu.year.trim()) errors[`edu_${index}_year`] = "Year is required";
    });

    return errors;
  }, []);

  // Consolidated state update function
  const updateResumeData = useCallback((updates: Partial<ResumeData>) => {
    setResumeData((prev) => ({ ...prev, ...updates }));
    // Clear validation errors when data changes
    setValidationErrors({});
  }, []);

  const updatePersonalInfo = useCallback(
    (
      field: keyof Pick<
        ResumeData,
        "name" | "email" | "phone" | "address" | "summary"
      >,
      value: string
    ) => {
      updateResumeData({ [field]: value });
    },
    [updateResumeData]
  );

  const addExperience = useCallback(() => {
    setResumeData((prev) => ({
      ...prev,
      experience: [
        ...prev.experience,
        { company: "", position: "", duration: "", description: "" },
      ],
    }));
  }, []);

  const updateExperience = useCallback(
    (index: number, field: keyof Experience, value: string) => {
      setResumeData((prev) => ({
        ...prev,
        experience: prev.experience.map((exp, i) =>
          i === index ? { ...exp, [field]: value } : exp
        ),
      }));
    },
    []
  );

  const removeExperience = useCallback((index: number) => {
    setResumeData((prev) => ({
      ...prev,
      experience: prev.experience.filter((_, i) => i !== index),
    }));
  }, []);

  const addEducation = useCallback(() => {
    setResumeData((prev) => ({
      ...prev,
      education: [...prev.education, { institution: "", degree: "", year: "" }],
    }));
  }, []);

  const updateEducation = useCallback(
    (index: number, field: keyof Education, value: string) => {
      setResumeData((prev) => ({
        ...prev,
        education: prev.education.map((edu, i) =>
          i === index ? { ...edu, [field]: value } : edu
        ),
      }));
    },
    []
  );

  const removeEducation = useCallback((index: number) => {
    setResumeData((prev) => ({
      ...prev,
      education: prev.education.filter((_, i) => i !== index),
    }));
  }, []);

  const addSkill = useCallback(() => {
    setResumeData((prev) => ({
      ...prev,
      skills: [...prev.skills, ""],
    }));
  }, []);

  const updateSkill = useCallback((index: number, value: string) => {
    setResumeData((prev) => ({
      ...prev,
      skills: prev.skills.map((skill, i) => (i === index ? value : skill)),
    }));
  }, []);

  const removeSkill = useCallback((index: number) => {
    setResumeData((prev) => ({
      ...prev,
      skills: prev.skills.filter((_, i) => i !== index),
    }));
  }, []);

  // Memoized PDF generation function
  const generatePDF = useCallback(() => {
    try {
      const errors = validateResume(resumeData);
      if (Object.keys(errors).length > 0) {
        setValidationErrors(errors);
        toast({
          title: "Validation Error",
          description: "Please fill in all required fields correctly.",
          variant: "destructive",
        });
        return;
      }

      const pdf = new jsPDF();
      const pageWidth = pdf.internal.pageSize.width;
      const margin = 20;
      const contentWidth = pageWidth - margin * 2;
      let yPosition = 20;
      const lineHeight = 7;
      const sectionSpacing = 15;

      // Helper function to add text with overflow handling
      const addTextWithOverflow = (
        text: string,
        fontSize: number,
        isBold: boolean = false
      ) => {
        pdf.setFontSize(fontSize);
        if (isBold) pdf.setFont(undefined, "bold");
        else pdf.setFont(undefined, "normal");

        const lines = pdf.splitTextToSize(text, contentWidth);
        if (
          yPosition + lines.length * lineHeight >
          pdf.internal.pageSize.height - margin
        ) {
          pdf.addPage();
          yPosition = 20;
        }

        pdf.text(lines, margin, yPosition);
        yPosition += lines.length * lineHeight + 2;
      };

      // Header
      addTextWithOverflow(resumeData.name, 24, true);
      yPosition += 5;

      // Contact info
      pdf.setFontSize(12);
      pdf.setFont(undefined, "normal");
      const contactInfo = [
        resumeData.email,
        resumeData.phone,
        resumeData.address,
      ]
        .filter(Boolean)
        .join(" • ");

      if (contactInfo) {
        addTextWithOverflow(contactInfo, 12);
      }
      yPosition += sectionSpacing;

      // Summary
      if (resumeData.summary.trim()) {
        addTextWithOverflow("PROFESSIONAL SUMMARY", 16, true);
        yPosition += 5;
        addTextWithOverflow(resumeData.summary, 12);
        yPosition += sectionSpacing;
      }

      // Experience
      const validExperience = resumeData.experience.filter(
        (exp) => exp.company.trim() && exp.position.trim()
      );

      if (validExperience.length > 0) {
        addTextWithOverflow("PROFESSIONAL EXPERIENCE", 16, true);
        yPosition += 5;

        validExperience.forEach((exp, index) => {
          // Position and Company
          const titleText = `${exp.position} at ${exp.company}`;
          addTextWithOverflow(titleText, 14, true);

          // Duration
          if (exp.duration.trim()) {
            addTextWithOverflow(exp.duration, 12);
          }

          // Description
          if (exp.description.trim()) {
            addTextWithOverflow(exp.description, 12);
          }

          if (index < validExperience.length - 1) {
            yPosition += 8;
          }
        });
        yPosition += sectionSpacing;
      }

      // Education
      const validEducation = resumeData.education.filter(
        (edu) => edu.institution.trim() && edu.degree.trim()
      );

      if (validEducation.length > 0) {
        addTextWithOverflow("EDUCATION", 16, true);
        yPosition += 5;

        validEducation.forEach((edu, index) => {
          const eduText = `${edu.degree} - ${edu.institution} (${edu.year})`;
          addTextWithOverflow(eduText, 12);

          if (index < validEducation.length - 1) {
            yPosition += 5;
          }
        });
        yPosition += sectionSpacing;
      }

      // Skills
      const validSkills = resumeData.skills.filter((skill) => skill.trim());
      if (validSkills.length > 0) {
        addTextWithOverflow("SKILLS", 16, true);
        yPosition += 5;
        addTextWithOverflow(validSkills.join(", "), 12);
      }

      // Save PDF
      const fileName = resumeData.name.trim()
        ? `${resumeData.name.replace(/[^a-zA-Z0-9\s]/g, "")}_resume.pdf`
        : "resume.pdf";
      pdf.save(fileName);

      toast({
        title: "Success",
        description: "Resume downloaded successfully!",
      });
    } catch (error) {
      console.error("PDF generation error:", error);
      toast({
        title: "Error",
        description: "Failed to generate PDF. Please try again.",
        variant: "destructive",
      });
    }
  }, [resumeData, validateResume, toast]);

  // Memoized tabs array
  const tabs = useMemo(
    () => [
      { id: "personal", label: "Personal Info" },
      { id: "experience", label: "Experience" },
      { id: "education", label: "Education" },
      { id: "skills", label: "Skills" },
    ],
    []
  );

  // Memoized validation check
  const hasErrors = useMemo(
    () => Object.keys(validationErrors).length > 0,
    [validationErrors]
  );

  // Helper function to get field error
  const getFieldError = (field: string) => validationErrors[field] || "";

  return (
    <>
      <SEOHead config={seoConfig} />

      <ToolLayout>
        <div className="container mx-auto px-4 py-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-6xl mx-auto"
          >
            <div className="text-center mb-8">
              <h1 className="text-4xl font-bold text-foreground mb-4">
                Resume Builder
              </h1>
              <p className="text-xl text-muted-foreground">
                Create professional resumes with ease
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2">
                <Card>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="flex items-center gap-2">
                        <FileUser className="h-5 w-5" />
                        Resume Information
                      </CardTitle>
                      <div className="flex gap-2">
                        <Button
                          variant="outline"
                          onClick={() => setShowPreview(!showPreview)}
                        >
                          <Eye className="mr-2 h-4 w-4" />
                          {showPreview ? "Hide" : "Show"} Preview
                        </Button>
                        <Button
                          onClick={generatePDF}
                          className="bg-primary text-primary-foreground hover:bg-primary/90"
                          disabled={hasErrors}
                        >
                          <Download className="mr-2 h-4 w-4" />
                          Download PDF
                        </Button>
                      </div>
                    </div>
                    <div className="flex gap-1 mt-4">
                      {tabs.map((tab) => (
                        <Button
                          key={tab.id}
                          variant={activeTab === tab.id ? "default" : "outline"}
                          size="sm"
                          onClick={() => setActiveTab(tab.id)}
                        >
                          {tab.label}
                        </Button>
                      ))}
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    {activeTab === "personal" && (
                      <div className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <label className="text-sm font-medium mb-1 block">
                              Full Name *
                            </label>
                            <Input
                              value={resumeData.name}
                              onChange={(e) =>
                                updatePersonalInfo("name", e.target.value)
                              }
                              placeholder="John Doe"
                              className={
                                getFieldError("name") ? "border-red-500" : ""
                              }
                            />
                            {getFieldError("name") && (
                              <p className="text-red-500 text-xs mt-1 flex items-center gap-1">
                                <AlertCircle className="h-3 w-3" />
                                {getFieldError("name")}
                              </p>
                            )}
                          </div>
                          <div>
                            <label className="text-sm font-medium mb-1 block">
                              Email *
                            </label>
                            <Input
                              type="email"
                              value={resumeData.email}
                              onChange={(e) =>
                                updatePersonalInfo("email", e.target.value)
                              }
                              placeholder="john@example.com"
                              className={
                                getFieldError("email") ? "border-red-500" : ""
                              }
                            />
                            {getFieldError("email") && (
                              <p className="text-red-500 text-xs mt-1 flex items-center gap-1">
                                <AlertCircle className="h-3 w-3" />
                                {getFieldError("email")}
                              </p>
                            )}
                          </div>
                          <div>
                            <label className="text-sm font-medium mb-1 block">
                              Phone *
                            </label>
                            <Input
                              value={resumeData.phone}
                              onChange={(e) =>
                                updatePersonalInfo("phone", e.target.value)
                              }
                              placeholder="+1 (555) 123-4567"
                              className={
                                getFieldError("phone") ? "border-red-500" : ""
                              }
                            />
                            {getFieldError("phone") && (
                              <p className="text-red-500 text-xs mt-1 flex items-center gap-1">
                                <AlertCircle className="h-3 w-3" />
                                {getFieldError("phone")}
                              </p>
                            )}
                          </div>
                          <div>
                            <label className="text-sm font-medium mb-1 block">
                              Address
                            </label>
                            <Input
                              value={resumeData.address}
                              onChange={(e) =>
                                updatePersonalInfo("address", e.target.value)
                              }
                              placeholder="City, State, Country"
                            />
                          </div>
                        </div>
                        <div>
                          <label className="text-sm font-medium mb-1 block">
                            Professional Summary *
                          </label>
                          <Textarea
                            value={resumeData.summary}
                            onChange={(e) =>
                              updatePersonalInfo("summary", e.target.value)
                            }
                            placeholder="Brief professional summary..."
                            rows={4}
                            className={
                              getFieldError("summary") ? "border-red-500" : ""
                            }
                          />
                          {getFieldError("summary") && (
                            <p className="text-red-500 text-xs mt-1 flex items-center gap-1">
                              <AlertCircle className="h-3 w-3" />
                              {getFieldError("summary")}
                            </p>
                          )}
                        </div>
                      </div>
                    )}

                    {activeTab === "experience" && (
                      <div className="space-y-6">
                        {resumeData.experience.map((exp, index) => (
                          <Card key={index}>
                            <CardContent className="p-4">
                              <div className="flex justify-between items-center mb-4">
                                <h4 className="font-semibold">
                                  Experience {index + 1}
                                </h4>
                                {resumeData.experience.length > 1 && (
                                  <Button
                                    size="sm"
                                    variant="destructive"
                                    onClick={() => removeExperience(index)}
                                  >
                                    <Trash2 className="h-3 w-3" />
                                  </Button>
                                )}
                              </div>
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                                <div>
                                  <Input
                                    placeholder="Company Name *"
                                    value={exp.company}
                                    onChange={(e) =>
                                      updateExperience(
                                        index,
                                        "company",
                                        e.target.value
                                      )
                                    }
                                    className={
                                      getFieldError(`exp_${index}_company`)
                                        ? "border-red-500"
                                        : ""
                                    }
                                  />
                                  {getFieldError(`exp_${index}_company`) && (
                                    <p className="text-red-500 text-xs mt-1 flex items-center gap-1">
                                      <AlertCircle className="h-3 w-3" />
                                      {getFieldError(`exp_${index}_company`)}
                                    </p>
                                  )}
                                </div>
                                <div>
                                  <Input
                                    placeholder="Position Title *"
                                    value={exp.position}
                                    onChange={(e) =>
                                      updateExperience(
                                        index,
                                        "position",
                                        e.target.value
                                      )
                                    }
                                    className={
                                      getFieldError(`exp_${index}_position`)
                                        ? "border-red-500"
                                        : ""
                                    }
                                  />
                                  {getFieldError(`exp_${index}_position`) && (
                                    <p className="text-red-500 text-xs mt-1 flex items-center gap-1">
                                      <AlertCircle className="h-3 w-3" />
                                      {getFieldError(`exp_${index}_position`)}
                                    </p>
                                  )}
                                </div>
                                <div>
                                  <Input
                                    placeholder="Duration (e.g., 2020-2023) *"
                                    value={exp.duration}
                                    onChange={(e) =>
                                      updateExperience(
                                        index,
                                        "duration",
                                        e.target.value
                                      )
                                    }
                                    className={
                                      getFieldError(`exp_${index}_duration`)
                                        ? "border-red-500"
                                        : ""
                                    }
                                  />
                                  {getFieldError(`exp_${index}_duration`) && (
                                    <p className="text-red-500 text-xs mt-1 flex items-center gap-1">
                                      <AlertCircle className="h-3 w-3" />
                                      {getFieldError(`exp_${index}_duration`)}
                                    </p>
                                  )}
                                </div>
                              </div>
                              <div>
                                <Textarea
                                  placeholder="Job description and achievements... *"
                                  value={exp.description}
                                  onChange={(e) =>
                                    updateExperience(
                                      index,
                                      "description",
                                      e.target.value
                                    )
                                  }
                                  rows={3}
                                  className={
                                    getFieldError(`exp_${index}_description`)
                                      ? "border-red-500"
                                      : ""
                                  }
                                />
                                {getFieldError(`exp_${index}_description`) && (
                                  <p className="text-red-500 text-xs mt-1 flex items-center gap-1">
                                    <AlertCircle className="h-3 w-3" />
                                    {getFieldError(`exp_${index}_description`)}
                                  </p>
                                )}
                              </div>
                            </CardContent>
                          </Card>
                        ))}
                        <Button variant="outline" onClick={addExperience}>
                          <Plus className="mr-2 h-4 w-4" />
                          Add Experience
                        </Button>
                      </div>
                    )}

                    {activeTab === "education" && (
                      <div className="space-y-4">
                        {resumeData.education.map((edu, index) => (
                          <div key={index} className="border rounded-lg p-4">
                            <div className="flex justify-between items-center mb-4">
                              <h4 className="font-semibold">
                                Education {index + 1}
                              </h4>
                              {resumeData.education.length > 1 && (
                                <Button
                                  size="sm"
                                  variant="destructive"
                                  onClick={() => removeEducation(index)}
                                >
                                  <Trash2 className="h-3 w-3" />
                                </Button>
                              )}
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                              <div>
                                <Input
                                  placeholder="Institution *"
                                  value={edu.institution}
                                  onChange={(e) =>
                                    updateEducation(
                                      index,
                                      "institution",
                                      e.target.value
                                    )
                                  }
                                  className={
                                    getFieldError(`edu_${index}_institution`)
                                      ? "border-red-500"
                                      : ""
                                  }
                                />
                                {getFieldError(`edu_${index}_institution`) && (
                                  <p className="text-red-500 text-xs mt-1 flex items-center gap-1">
                                    <AlertCircle className="h-3 w-3" />
                                    {getFieldError(`edu_${index}_institution`)}
                                  </p>
                                )}
                              </div>
                              <div>
                                <Input
                                  placeholder="Degree *"
                                  value={edu.degree}
                                  onChange={(e) =>
                                    updateEducation(
                                      index,
                                      "degree",
                                      e.target.value
                                    )
                                  }
                                  className={
                                    getFieldError(`edu_${index}_degree`)
                                      ? "border-red-500"
                                      : ""
                                  }
                                />
                                {getFieldError(`edu_${index}_degree`) && (
                                  <p className="text-red-500 text-xs mt-1 flex items-center gap-1">
                                    <AlertCircle className="h-3 w-3" />
                                    {getFieldError(`edu_${index}_degree`)}
                                  </p>
                                )}
                              </div>
                              <div>
                                <Input
                                  placeholder="Year *"
                                  value={edu.year}
                                  onChange={(e) =>
                                    updateEducation(
                                      index,
                                      "year",
                                      e.target.value
                                    )
                                  }
                                  className={
                                    getFieldError(`edu_${index}_year`)
                                      ? "border-red-500"
                                      : ""
                                  }
                                />
                                {getFieldError(`edu_${index}_year`) && (
                                  <p className="text-red-500 text-xs mt-1 flex items-center gap-1">
                                    <AlertCircle className="h-3 w-3" />
                                    {getFieldError(`edu_${index}_year`)}
                                  </p>
                                )}
                              </div>
                            </div>
                          </div>
                        ))}
                        <Button variant="outline" onClick={addEducation}>
                          <Plus className="mr-2 h-4 w-4" />
                          Add Education
                        </Button>
                      </div>
                    )}

                    {activeTab === "skills" && (
                      <div className="space-y-4">
                        {resumeData.skills.map((skill, index) => (
                          <div key={index} className="flex gap-2">
                            <Input
                              placeholder="Skill"
                              value={skill}
                              onChange={(e) =>
                                updateSkill(index, e.target.value)
                              }
                            />
                            {resumeData.skills.length > 1 && (
                              <Button
                                size="sm"
                                variant="destructive"
                                onClick={() => removeSkill(index)}
                              >
                                <Trash2 className="h-3 w-3" />
                              </Button>
                            )}
                          </div>
                        ))}
                        <Button variant="outline" onClick={addSkill}>
                          <Plus className="mr-2 h-4 w-4" />
                          Add Skill
                        </Button>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </div>

              {showPreview && (
                <div className="lg:col-span-1">
                  <Card>
                    <CardHeader>
                      <CardTitle>Resume Preview</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4 text-sm">
                        <div className="border-b pb-3">
                          <h2 className="text-lg font-bold">
                            {resumeData.name || "Your Name"}
                          </h2>
                          <p className="text-muted-foreground">
                            {resumeData.email || "email@example.com"}
                          </p>
                          <p className="text-muted-foreground">
                            {resumeData.phone || "Phone Number"}
                          </p>
                          {resumeData.address && (
                            <p className="text-muted-foreground">
                              {resumeData.address}
                            </p>
                          )}
                        </div>

                        {resumeData.summary && (
                          <div>
                            <h3 className="font-semibold mb-2">Summary</h3>
                            <p className="text-muted-foreground">
                              {resumeData.summary}
                            </p>
                          </div>
                        )}

                        {resumeData.experience.some((exp) =>
                          exp.company.trim()
                        ) && (
                          <div>
                            <h3 className="font-semibold mb-2">Experience</h3>
                            <div className="space-y-3">
                              {resumeData.experience
                                .filter((exp) => exp.company.trim())
                                .map((exp, index) => (
                                  <div
                                    key={index}
                                    className="border-l-2 border-primary pl-3"
                                  >
                                    <p className="font-medium">
                                      {exp.position}
                                    </p>
                                    <p className="text-muted-foreground">
                                      {exp.company}
                                    </p>
                                    <p className="text-xs text-muted-foreground">
                                      {exp.duration}
                                    </p>
                                    {exp.description && (
                                      <p className="text-muted-foreground mt-1">
                                        {exp.description}
                                      </p>
                                    )}
                                  </div>
                                ))}
                            </div>
                          </div>
                        )}

                        {resumeData.education.some((edu) =>
                          edu.institution.trim()
                        ) && (
                          <div>
                            <h3 className="font-semibold mb-2">Education</h3>
                            <div className="space-y-2">
                              {resumeData.education
                                .filter((edu) => edu.institution.trim())
                                .map((edu, index) => (
                                  <div key={index}>
                                    <p className="font-medium">{edu.degree}</p>
                                    <p className="text-muted-foreground">
                                      {edu.institution}
                                    </p>
                                    <p className="text-xs text-muted-foreground">
                                      {edu.year}
                                    </p>
                                  </div>
                                ))}
                            </div>
                          </div>
                        )}

                        {resumeData.skills.some((skill) => skill.trim()) && (
                          <div>
                            <h3 className="font-semibold mb-2">Skills</h3>
                            <p className="text-muted-foreground">
                              {resumeData.skills
                                .filter((skill) => skill.trim())
                                .join(", ")}
                            </p>
                          </div>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                </div>
              )}
            </div>
          </motion.div>
        </div>
      </ToolLayout>
    </>
  );
}
