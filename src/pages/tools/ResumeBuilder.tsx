import { Helmet } from "react-helmet-async";
import { useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { FileUser, Download, Plus, Trash2, Eye } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { ToolLayout } from "@/components/ToolLayout";
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

export default function ResumeBuilder() {
  const [resumeData, setResumeData] = useState<ResumeData>({
    name: '',
    email: '',
    phone: '',
    address: '',
    summary: '',
    experience: [{ company: '', position: '', duration: '', description: '' }],
    education: [{ institution: '', degree: '', year: '' }],
    skills: ['']
  });
  
  const [activeTab, setActiveTab] = useState('personal');
  const [showPreview, setShowPreview] = useState(false);
  const { toast } = useToast();

  const updatePersonalInfo = (field: keyof Pick<ResumeData, 'name' | 'email' | 'phone' | 'address' | 'summary'>, value: string) => {
    setResumeData(prev => ({ ...prev, [field]: value }));
  };

  const addExperience = () => {
    setResumeData(prev => ({
      ...prev,
      experience: [...prev.experience, { company: '', position: '', duration: '', description: '' }]
    }));
  };

  const updateExperience = (index: number, field: keyof Experience, value: string) => {
    setResumeData(prev => ({
      ...prev,
      experience: prev.experience.map((exp, i) => 
        i === index ? { ...exp, [field]: value } : exp
      )
    }));
  };

  const removeExperience = (index: number) => {
    setResumeData(prev => ({
      ...prev,
      experience: prev.experience.filter((_, i) => i !== index)
    }));
  };

  const addEducation = () => {
    setResumeData(prev => ({
      ...prev,
      education: [...prev.education, { institution: '', degree: '', year: '' }]
    }));
  };

  const updateEducation = (index: number, field: keyof Education, value: string) => {
    setResumeData(prev => ({
      ...prev,
      education: prev.education.map((edu, i) => 
        i === index ? { ...edu, [field]: value } : edu
      )
    }));
  };

  const removeEducation = (index: number) => {
    setResumeData(prev => ({
      ...prev,
      education: prev.education.filter((_, i) => i !== index)
    }));
  };

  const addSkill = () => {
    setResumeData(prev => ({
      ...prev,
      skills: [...prev.skills, '']
    }));
  };

  const updateSkill = (index: number, value: string) => {
    setResumeData(prev => ({
      ...prev,
      skills: prev.skills.map((skill, i) => i === index ? value : skill)
    }));
  };

  const removeSkill = (index: number) => {
    setResumeData(prev => ({
      ...prev,
      skills: prev.skills.filter((_, i) => i !== index)
    }));
  };

  const generatePDF = () => {
    const pdf = new jsPDF();
    let yPosition = 20;

    // Header
    pdf.setFontSize(20);
    pdf.text(resumeData.name || 'Your Name', 20, yPosition);
    yPosition += 10;

    pdf.setFontSize(12);
    pdf.text(resumeData.email || 'email@example.com', 20, yPosition);
    yPosition += 6;
    pdf.text(resumeData.phone || 'Phone Number', 20, yPosition);
    yPosition += 6;
    pdf.text(resumeData.address || 'Address', 20, yPosition);
    yPosition += 15;

    // Summary
    if (resumeData.summary) {
      pdf.setFontSize(16);
      pdf.text('Professional Summary', 20, yPosition);
      yPosition += 8;
      pdf.setFontSize(12);
      const summaryLines = pdf.splitTextToSize(resumeData.summary, 170);
      pdf.text(summaryLines, 20, yPosition);
      yPosition += summaryLines.length * 6 + 10;
    }

    // Experience
    if (resumeData.experience.some(exp => exp.company)) {
      pdf.setFontSize(16);
      pdf.text('Experience', 20, yPosition);
      yPosition += 8;

      resumeData.experience.forEach(exp => {
        if (exp.company) {
          pdf.setFontSize(14);
          pdf.text(`${exp.position} at ${exp.company}`, 20, yPosition);
          yPosition += 6;
          pdf.setFontSize(12);
          pdf.text(exp.duration, 20, yPosition);
          yPosition += 6;
          if (exp.description) {
            const descLines = pdf.splitTextToSize(exp.description, 170);
            pdf.text(descLines, 20, yPosition);
            yPosition += descLines.length * 6 + 8;
          }
        }
      });
      yPosition += 5;
    }

    // Education
    if (resumeData.education.some(edu => edu.institution)) {
      pdf.setFontSize(16);
      pdf.text('Education', 20, yPosition);
      yPosition += 8;

      resumeData.education.forEach(edu => {
        if (edu.institution) {
          pdf.setFontSize(12);
          pdf.text(`${edu.degree} - ${edu.institution} (${edu.year})`, 20, yPosition);
          yPosition += 8;
        }
      });
      yPosition += 5;
    }

    // Skills
    const validSkills = resumeData.skills.filter(skill => skill.trim());
    if (validSkills.length > 0) {
      pdf.setFontSize(16);
      pdf.text('Skills', 20, yPosition);
      yPosition += 8;
      pdf.setFontSize(12);
      pdf.text(validSkills.join(', '), 20, yPosition);
    }

    pdf.save(`${resumeData.name || 'resume'}.pdf`);
    toast({ title: "Success", description: "Resume downloaded successfully!" });
  };

  const tabs = [
    { id: 'personal', label: 'Personal Info' },
    { id: 'experience', label: 'Experience' },
    { id: 'education', label: 'Education' },
    { id: 'skills', label: 'Skills' }
  ];

  return (
    <>
      <Helmet>
        <title>Resume Builder - Free Online Resume Creator</title>
        <meta name="description" content="Create professional resumes with customizable templates. Free online resume builder with PDF export functionality." />
        <meta name="keywords" content="resume builder, cv creator, resume template, job application, professional resume" />
      </Helmet>

      <ToolLayout>
        <div className="container mx-auto px-4 py-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-6xl mx-auto"
          >
            <div className="text-center mb-8">
              <h1 className="text-4xl font-bold text-foreground mb-4">Resume Builder</h1>
              <p className="text-xl text-muted-foreground">Create professional resumes with ease</p>
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
                        <Button variant="outline" onClick={() => setShowPreview(!showPreview)}>
                          <Eye className="mr-2 h-4 w-4" />
                          {showPreview ? 'Hide' : 'Show'} Preview
                        </Button>
                        <Button onClick={generatePDF} className="bg-primary text-primary-foreground hover:bg-primary/90">
                          <Download className="mr-2 h-4 w-4" />
                          Download PDF
                        </Button>
                      </div>
                    </div>
                    <div className="flex gap-1 mt-4">
                      {tabs.map(tab => (
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
                    {activeTab === 'personal' && (
                      <div className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <label className="text-sm font-medium mb-1 block">Full Name</label>
                            <Input
                              value={resumeData.name}
                              onChange={(e) => updatePersonalInfo('name', e.target.value)}
                              placeholder="John Doe"
                            />
                          </div>
                          <div>
                            <label className="text-sm font-medium mb-1 block">Email</label>
                            <Input
                              type="email"
                              value={resumeData.email}
                              onChange={(e) => updatePersonalInfo('email', e.target.value)}
                              placeholder="john@example.com"
                            />
                          </div>
                          <div>
                            <label className="text-sm font-medium mb-1 block">Phone</label>
                            <Input
                              value={resumeData.phone}
                              onChange={(e) => updatePersonalInfo('phone', e.target.value)}
                              placeholder="+1 (555) 123-4567"
                            />
                          </div>
                          <div>
                            <label className="text-sm font-medium mb-1 block">Address</label>
                            <Input
                              value={resumeData.address}
                              onChange={(e) => updatePersonalInfo('address', e.target.value)}
                              placeholder="City, State, Country"
                            />
                          </div>
                        </div>
                        <div>
                          <label className="text-sm font-medium mb-1 block">Professional Summary</label>
                          <Textarea
                            value={resumeData.summary}
                            onChange={(e) => updatePersonalInfo('summary', e.target.value)}
                            placeholder="Brief professional summary..."
                            rows={4}
                          />
                        </div>
                      </div>
                    )}

                    {activeTab === 'experience' && (
                      <div className="space-y-6">
                        {resumeData.experience.map((exp, index) => (
                          <Card key={index}>
                            <CardContent className="p-4">
                              <div className="flex justify-between items-center mb-4">
                                <h4 className="font-semibold">Experience {index + 1}</h4>
                                {resumeData.experience.length > 1 && (
                                  <Button size="sm" variant="destructive" onClick={() => removeExperience(index)}>
                                    <Trash2 className="h-3 w-3" />
                                  </Button>
                                )}
                              </div>
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                                <Input
                                  placeholder="Company Name"
                                  value={exp.company}
                                  onChange={(e) => updateExperience(index, 'company', e.target.value)}
                                />
                                <Input
                                  placeholder="Position Title"
                                  value={exp.position}
                                  onChange={(e) => updateExperience(index, 'position', e.target.value)}
                                />
                                <Input
                                  placeholder="Duration (e.g., 2020-2023)"
                                  value={exp.duration}
                                  onChange={(e) => updateExperience(index, 'duration', e.target.value)}
                                />
                              </div>
                              <Textarea
                                placeholder="Job description and achievements..."
                                value={exp.description}
                                onChange={(e) => updateExperience(index, 'description', e.target.value)}
                                rows={3}
                              />
                            </CardContent>
                          </Card>
                        ))}
                        <Button variant="outline" onClick={addExperience}>
                          <Plus className="mr-2 h-4 w-4" />
                          Add Experience
                        </Button>
                      </div>
                    )}

                    {activeTab === 'education' && (
                      <div className="space-y-4">
                        {resumeData.education.map((edu, index) => (
                          <div key={index} className="border rounded-lg p-4">
                            <div className="flex justify-between items-center mb-4">
                              <h4 className="font-semibold">Education {index + 1}</h4>
                              {resumeData.education.length > 1 && (
                                <Button size="sm" variant="destructive" onClick={() => removeEducation(index)}>
                                  <Trash2 className="h-3 w-3" />
                                </Button>
                              )}
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                              <Input
                                placeholder="Institution"
                                value={edu.institution}
                                onChange={(e) => updateEducation(index, 'institution', e.target.value)}
                              />
                              <Input
                                placeholder="Degree"
                                value={edu.degree}
                                onChange={(e) => updateEducation(index, 'degree', e.target.value)}
                              />
                              <Input
                                placeholder="Year"
                                value={edu.year}
                                onChange={(e) => updateEducation(index, 'year', e.target.value)}
                              />
                            </div>
                          </div>
                        ))}
                        <Button variant="outline" onClick={addEducation}>
                          <Plus className="mr-2 h-4 w-4" />
                          Add Education
                        </Button>
                      </div>
                    )}

                    {activeTab === 'skills' && (
                      <div className="space-y-4">
                        {resumeData.skills.map((skill, index) => (
                          <div key={index} className="flex gap-2">
                            <Input
                              placeholder="Skill"
                              value={skill}
                              onChange={(e) => updateSkill(index, e.target.value)}
                            />
                            {resumeData.skills.length > 1 && (
                              <Button size="sm" variant="destructive" onClick={() => removeSkill(index)}>
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
                          <h2 className="text-lg font-bold">{resumeData.name || 'Your Name'}</h2>
                          <p className="text-muted-foreground">{resumeData.email || 'email@example.com'}</p>
                          <p className="text-muted-foreground">{resumeData.phone || 'Phone Number'}</p>
                          <p className="text-muted-foreground">{resumeData.address || 'Address'}</p>
                        </div>
                        
                        {resumeData.summary && (
                          <div>
                            <h3 className="font-semibold mb-2">Summary</h3>
                            <p className="text-muted-foreground">{resumeData.summary}</p>
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