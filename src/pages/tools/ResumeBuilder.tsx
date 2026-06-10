import { useState, useRef, useCallback } from "react";
import { motion } from "framer-motion";
import { SEOHead } from "@/components/SEOHead";
import { getSEOConfig } from "@/lib/seo-config";
import { ToolExplanation } from "@/components/ToolExplanation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Download, Plus, Trash2, Camera, User, Briefcase,
  GraduationCap, Wrench, FolderOpen, Award, Globe,
  CheckCircle, Link,
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { ToolLayout } from "@/components/ToolLayout";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

// ─── Types ────────────────────────────────────────────────────────────────────

interface Experience {
  company: string; position: string; startDate: string;
  endDate: string; current: boolean; location: string; description: string;
}
interface Education {
  institution: string; degree: string; field: string;
  startYear: string; endYear: string; gpa: string;
}
interface Skill { name: string; level: number; }
interface Project { name: string; description: string; tech: string; link: string; }
interface Certification { name: string; issuer: string; year: string; }
interface Language { name: string; level: string; }

interface ResumeData {
  name: string; jobTitle: string; email: string; phone: string;
  location: string; website: string; linkedin: string; github: string;
  summary: string; photo: string;
  experience: Experience[];
  education: Education[];
  skills: Skill[];
  projects: Project[];
  certifications: Certification[];
  languages: Language[];
}

type TemplateId = "modern" | "classic" | "minimal";

interface ThemeColor { name: string; hex: string; dark: string; light: string; muted: string; }

// ─── Theme Colors ─────────────────────────────────────────────────────────────

const COLORS: ThemeColor[] = [
  { name: "Navy",   hex: "#1e3a5f", dark: "#152b47", light: "#dbeafe", muted: "#e8f0fe" },
  { name: "Blue",   hex: "#2563eb", dark: "#1d4ed8", light: "#dbeafe", muted: "#eff6ff" },
  { name: "Teal",   hex: "#0d9488", dark: "#0f766e", light: "#ccfbf1", muted: "#f0fdfa" },
  { name: "Green",  hex: "#16a34a", dark: "#15803d", light: "#dcfce7", muted: "#f0fdf4" },
  { name: "Purple", hex: "#7c3aed", dark: "#6d28d9", light: "#ede9fe", muted: "#faf5ff" },
  { name: "Rose",   hex: "#e11d48", dark: "#be123c", light: "#ffe4e6", muted: "#fff1f2" },
  { name: "Slate",  hex: "#475569", dark: "#334155", light: "#f1f5f9", muted: "#f8fafc" },
];

const EMPTY: ResumeData = {
  name: "", jobTitle: "", email: "", phone: "", location: "",
  website: "", linkedin: "", github: "", summary: "", photo: "",
  experience: [{ company: "", position: "", startDate: "", endDate: "", current: false, location: "", description: "" }],
  education: [{ institution: "", degree: "", field: "", startYear: "", endYear: "", gpa: "" }],
  skills: [{ name: "", level: 4 }],
  projects: [], certifications: [], languages: [],
};

// ─── Resume Template Components ───────────────────────────────────────────────

const SkillDots = ({ level, color }: { level: number; color: string }) => (
  <span style={{ display: "inline-flex", gap: 3 }}>
    {[1,2,3,4,5].map(i => (
      <span key={i} style={{ width: 8, height: 8, borderRadius: "50%", background: i <= level ? color : "#d1d5db", display: "inline-block" }} />
    ))}
  </span>
);

// Modern Template – dark sidebar + white main area
function ModernTemplate({ data, color }: { data: ResumeData; color: ThemeColor }) {
  const exp = data.experience.filter(e => e.company || e.position);
  const edu = data.education.filter(e => e.institution || e.degree);
  const skills = data.skills.filter(s => s.name);
  const langs = data.languages.filter(l => l.name);
  const certs = data.certifications.filter(c => c.name);

  const sidebar: React.CSSProperties = {
    width: "32%", background: color.dark, color: "#fff",
    padding: "32px 20px", boxSizing: "border-box", minHeight: "100%",
    display: "flex", flexDirection: "column", gap: 0,
  };
  const main: React.CSSProperties = {
    width: "68%", background: "#fff", padding: "32px 28px",
    boxSizing: "border-box",
  };
  const sideSection = (title: string) => (
    <div style={{ marginBottom: 20 }}>
      <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: 2, textTransform: "uppercase", color: color.light, marginBottom: 8, paddingBottom: 4, borderBottom: `1px solid rgba(255,255,255,0.25)` }}>
        {title}
      </div>
    </div>
  );
  const sectionHeader = (title: string) => (
    <div style={{ fontSize: 13, fontWeight: 800, letterSpacing: 1.5, textTransform: "uppercase", color: color.hex, borderBottom: `2px solid ${color.hex}`, paddingBottom: 4, marginBottom: 12, marginTop: 20 }}>
      {title}
    </div>
  );

  return (
    <div style={{ display: "flex", width: "100%", minHeight: "100%", fontFamily: "'Segoe UI', Arial, sans-serif", fontSize: 11 }}>
      {/* Sidebar */}
      <div style={sidebar}>
        {/* Photo */}
        <div style={{ textAlign: "center", marginBottom: 20 }}>
          {data.photo ? (
            <img src={data.photo} alt="profile" style={{ width: 90, height: 90, borderRadius: "50%", objectFit: "cover", border: `3px solid ${color.light}` }} />
          ) : (
            <div style={{ width: 90, height: 90, borderRadius: "50%", background: "rgba(255,255,255,0.15)", margin: "0 auto", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <span style={{ fontSize: 36, color: "rgba(255,255,255,0.5)" }}>👤</span>
            </div>
          )}
        </div>

        {/* Contact */}
        <div style={{ marginBottom: 20 }}>
          <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: 2, textTransform: "uppercase", color: color.light, marginBottom: 8, paddingBottom: 4, borderBottom: "1px solid rgba(255,255,255,0.25)" }}>Contact</div>
          {data.email && <div style={{ marginBottom: 6, display: "flex", gap: 6, alignItems: "flex-start" }}><span style={{ opacity: 0.7, flexShrink: 0 }}>✉</span><span style={{ wordBreak: "break-all", fontSize: 10 }}>{data.email}</span></div>}
          {data.phone && <div style={{ marginBottom: 6, display: "flex", gap: 6 }}><span style={{ opacity: 0.7 }}>📱</span><span style={{ fontSize: 10 }}>{data.phone}</span></div>}
          {data.location && <div style={{ marginBottom: 6, display: "flex", gap: 6 }}><span style={{ opacity: 0.7 }}>📍</span><span style={{ fontSize: 10 }}>{data.location}</span></div>}
          {data.website && <div style={{ marginBottom: 6, display: "flex", gap: 6 }}><span style={{ opacity: 0.7 }}>🌐</span><span style={{ fontSize: 10, wordBreak: "break-all" }}>{data.website}</span></div>}
          {data.linkedin && <div style={{ marginBottom: 6, display: "flex", gap: 6 }}><span style={{ opacity: 0.7 }}>in</span><span style={{ fontSize: 10, wordBreak: "break-all" }}>{data.linkedin}</span></div>}
          {data.github && <div style={{ marginBottom: 6, display: "flex", gap: 6 }}><span style={{ opacity: 0.7 }}>⌥</span><span style={{ fontSize: 10, wordBreak: "break-all" }}>{data.github}</span></div>}
        </div>

        {/* Skills */}
        {skills.length > 0 && (
          <div style={{ marginBottom: 20 }}>
            <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: 2, textTransform: "uppercase", color: color.light, marginBottom: 8, paddingBottom: 4, borderBottom: "1px solid rgba(255,255,255,0.25)" }}>Skills</div>
            {skills.map((s, i) => (
              <div key={i} style={{ marginBottom: 8 }}>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 3 }}>
                  <span style={{ fontSize: 10 }}>{s.name}</span>
                </div>
                <div style={{ height: 4, background: "rgba(255,255,255,0.2)", borderRadius: 2 }}>
                  <div style={{ height: 4, width: `${(s.level / 5) * 100}%`, background: color.light, borderRadius: 2 }} />
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Languages */}
        {langs.length > 0 && (
          <div style={{ marginBottom: 20 }}>
            <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: 2, textTransform: "uppercase", color: color.light, marginBottom: 8, paddingBottom: 4, borderBottom: "1px solid rgba(255,255,255,0.25)" }}>Languages</div>
            {langs.map((l, i) => (
              <div key={i} style={{ display: "flex", justifyContent: "space-between", marginBottom: 5, fontSize: 10 }}>
                <span>{l.name}</span>
                <span style={{ color: color.light, fontSize: 9 }}>{l.level}</span>
              </div>
            ))}
          </div>
        )}

        {/* Certifications */}
        {certs.length > 0 && (
          <div style={{ marginBottom: 20 }}>
            <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: 2, textTransform: "uppercase", color: color.light, marginBottom: 8, paddingBottom: 4, borderBottom: "1px solid rgba(255,255,255,0.25)" }}>Certifications</div>
            {certs.map((c, i) => (
              <div key={i} style={{ marginBottom: 8 }}>
                <div style={{ fontSize: 10, fontWeight: 600 }}>{c.name}</div>
                <div style={{ fontSize: 9, opacity: 0.8 }}>{c.issuer} {c.year && `· ${c.year}`}</div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Main */}
      <div style={main}>
        {/* Header */}
        <div style={{ marginBottom: 20 }}>
          <div style={{ fontSize: 28, fontWeight: 800, color: "#1a1a1a", lineHeight: 1.1 }}>{data.name || "Your Name"}</div>
          {data.jobTitle && <div style={{ fontSize: 14, color: color.hex, fontWeight: 600, marginTop: 4 }}>{data.jobTitle}</div>}
        </div>

        {/* Summary */}
        {data.summary && (
          <>
            {sectionHeader("Professional Summary")}
            <p style={{ color: "#4b5563", lineHeight: 1.6, fontSize: 10, marginTop: 0 }}>{data.summary}</p>
          </>
        )}

        {/* Experience */}
        {exp.length > 0 && (
          <>
            {sectionHeader("Work Experience")}
            {exp.map((e, i) => (
              <div key={i} style={{ marginBottom: 16, paddingLeft: 12, borderLeft: `3px solid ${color.light}` }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                  <div>
                    <div style={{ fontWeight: 700, fontSize: 12, color: "#111827" }}>{e.position}</div>
                    <div style={{ color: color.hex, fontSize: 11, fontWeight: 600 }}>{e.company}{e.location && ` · ${e.location}`}</div>
                  </div>
                  <div style={{ fontSize: 9, color: "#6b7280", whiteSpace: "nowrap", marginLeft: 8, marginTop: 2 }}>
                    {e.startDate}{(e.startDate || e.endDate) && " – "}{e.current ? "Present" : e.endDate}
                  </div>
                </div>
                {e.description && (
                  <div style={{ marginTop: 6, color: "#4b5563", fontSize: 10, lineHeight: 1.6 }}>
                    {e.description.split("\n").map((line, li) => line.trim() ? (
                      <div key={li} style={{ display: "flex", gap: 6, marginBottom: 2 }}>
                        <span style={{ color: color.hex, flexShrink: 0 }}>▸</span>
                        <span>{line.replace(/^[-•*]\s*/, "")}</span>
                      </div>
                    ) : null)}
                  </div>
                )}
              </div>
            ))}
          </>
        )}

        {/* Education */}
        {edu.length > 0 && (
          <>
            {sectionHeader("Education")}
            {edu.map((e, i) => (
              <div key={i} style={{ marginBottom: 12 }}>
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                  <div>
                    <div style={{ fontWeight: 700, fontSize: 11, color: "#111827" }}>{e.degree}{e.field && ` in ${e.field}`}</div>
                    <div style={{ color: color.hex, fontSize: 10 }}>{e.institution}</div>
                    {e.gpa && <div style={{ fontSize: 9, color: "#6b7280" }}>GPA: {e.gpa}</div>}
                  </div>
                  <div style={{ fontSize: 9, color: "#6b7280", whiteSpace: "nowrap", marginLeft: 8 }}>
                    {e.startYear}{(e.startYear || e.endYear) && " – "}{e.endYear}
                  </div>
                </div>
              </div>
            ))}
          </>
        )}

        {/* Projects */}
        {data.projects.filter(p => p.name).length > 0 && (
          <>
            {sectionHeader("Projects")}
            {data.projects.filter(p => p.name).map((p, i) => (
              <div key={i} style={{ marginBottom: 12 }}>
                <div style={{ fontWeight: 700, fontSize: 11, color: "#111827" }}>{p.name}{p.tech && <span style={{ color: "#6b7280", fontWeight: 400, fontSize: 9 }}> · {p.tech}</span>}</div>
                {p.description && <div style={{ fontSize: 10, color: "#4b5563", marginTop: 2, lineHeight: 1.5 }}>{p.description}</div>}
                {p.link && <div style={{ fontSize: 9, color: color.hex, marginTop: 2 }}>{p.link}</div>}
              </div>
            ))}
          </>
        )}
      </div>
    </div>
  );
}

// Classic Template – single column, traditional
function ClassicTemplate({ data, color }: { data: ResumeData; color: ThemeColor }) {
  const exp = data.experience.filter(e => e.company || e.position);
  const edu = data.education.filter(e => e.institution || e.degree);
  const skills = data.skills.filter(s => s.name);
  const langs = data.languages.filter(l => l.name);
  const certs = data.certifications.filter(c => c.name);

  const Section = ({ title }: { title: string }) => (
    <div style={{ display: "flex", alignItems: "center", gap: 10, margin: "20px 0 12px" }}>
      <div style={{ fontSize: 12, fontWeight: 800, letterSpacing: 1.5, textTransform: "uppercase", color: color.hex }}>{title}</div>
      <div style={{ flex: 1, height: 1, background: color.hex, opacity: 0.3 }} />
    </div>
  );

  return (
    <div style={{ padding: "36px 44px", fontFamily: "'Georgia', serif", fontSize: 11, background: "#fff", color: "#1a1a1a" }}>
      {/* Header */}
      <div style={{ textAlign: "center", marginBottom: 4 }}>
        {data.photo && (
          <img src={data.photo} alt="profile" style={{ width: 80, height: 80, borderRadius: "50%", objectFit: "cover", border: `3px solid ${color.hex}`, marginBottom: 10 }} />
        )}
        <div style={{ fontSize: 30, fontWeight: 800, letterSpacing: 1, color: "#111" }}>{data.name || "Your Name"}</div>
        {data.jobTitle && <div style={{ fontSize: 13, color: color.hex, fontWeight: 600, marginTop: 4, fontStyle: "italic" }}>{data.jobTitle}</div>}
        <div style={{ height: 2, background: `linear-gradient(to right, transparent, ${color.hex}, transparent)`, margin: "10px auto", width: "60%" }} />
        <div style={{ fontSize: 10, color: "#6b7280", display: "flex", justifyContent: "center", gap: 16, flexWrap: "wrap" }}>
          {data.email && <span>✉ {data.email}</span>}
          {data.phone && <span>📱 {data.phone}</span>}
          {data.location && <span>📍 {data.location}</span>}
          {data.website && <span>🌐 {data.website}</span>}
          {data.linkedin && <span>in {data.linkedin}</span>}
        </div>
      </div>

      {/* Summary */}
      {data.summary && (
        <>
          <Section title="Summary" />
          <p style={{ textAlign: "justify", lineHeight: 1.7, color: "#374151" }}>{data.summary}</p>
        </>
      )}

      {/* Experience */}
      {exp.length > 0 && (
        <>
          <Section title="Experience" />
          {exp.map((e, i) => (
            <div key={i} style={{ marginBottom: 16 }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
                <div style={{ fontWeight: 700, fontSize: 12 }}>{e.position}</div>
                <div style={{ fontSize: 9, color: "#6b7280" }}>{e.startDate}{(e.startDate || e.endDate) && " – "}{e.current ? "Present" : e.endDate}</div>
              </div>
              <div style={{ color: color.hex, fontSize: 11, fontStyle: "italic" }}>{e.company}{e.location && `, ${e.location}`}</div>
              {e.description && (
                <div style={{ marginTop: 5, color: "#374151", lineHeight: 1.6 }}>
                  {e.description.split("\n").map((line, li) => line.trim() ? (
                    <div key={li} style={{ display: "flex", gap: 8, marginBottom: 2 }}>
                      <span style={{ color: color.hex }}>•</span><span>{line.replace(/^[-•*]\s*/, "")}</span>
                    </div>
                  ) : null)}
                </div>
              )}
            </div>
          ))}
        </>
      )}

      {/* Education */}
      {edu.length > 0 && (
        <>
          <Section title="Education" />
          {edu.map((e, i) => (
            <div key={i} style={{ marginBottom: 10 }}>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <div style={{ fontWeight: 700, fontSize: 11 }}>{e.degree}{e.field && ` in ${e.field}`}</div>
                <div style={{ fontSize: 9, color: "#6b7280" }}>{e.startYear}{(e.startYear || e.endYear) && " – "}{e.endYear}</div>
              </div>
              <div style={{ color: color.hex, fontStyle: "italic", fontSize: 10 }}>{e.institution}</div>
              {e.gpa && <div style={{ fontSize: 9, color: "#6b7280" }}>GPA: {e.gpa}</div>}
            </div>
          ))}
        </>
      )}

      {/* Skills + Languages */}
      {(skills.length > 0 || langs.length > 0) && (
        <>
          <Section title="Skills & Languages" />
          <div style={{ display: "flex", gap: 40 }}>
            {skills.length > 0 && (
              <div style={{ flex: 1 }}>
                <div style={{ fontWeight: 700, fontSize: 10, marginBottom: 6, color: "#374151" }}>Technical Skills</div>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                  {skills.map((s, i) => (
                    <span key={i} style={{ background: color.muted, color: color.dark, padding: "2px 10px", borderRadius: 20, fontSize: 9, fontWeight: 600 }}>{s.name}</span>
                  ))}
                </div>
              </div>
            )}
            {langs.length > 0 && (
              <div>
                <div style={{ fontWeight: 700, fontSize: 10, marginBottom: 6, color: "#374151" }}>Languages</div>
                {langs.map((l, i) => (
                  <div key={i} style={{ fontSize: 10, marginBottom: 3 }}><span style={{ fontWeight: 600 }}>{l.name}</span> <span style={{ color: "#6b7280" }}>— {l.level}</span></div>
                ))}
              </div>
            )}
          </div>
        </>
      )}

      {/* Certifications + Projects */}
      {certs.length > 0 && (
        <>
          <Section title="Certifications" />
          <div style={{ display: "flex", flexWrap: "wrap", gap: 10 }}>
            {certs.map((c, i) => (
              <div key={i} style={{ fontSize: 10 }}>
                <span style={{ fontWeight: 700 }}>✓ {c.name}</span>
                {(c.issuer || c.year) && <span style={{ color: "#6b7280" }}> — {[c.issuer, c.year].filter(Boolean).join(", ")}</span>}
              </div>
            ))}
          </div>
        </>
      )}

      {data.projects.filter(p => p.name).length > 0 && (
        <>
          <Section title="Projects" />
          {data.projects.filter(p => p.name).map((p, i) => (
            <div key={i} style={{ marginBottom: 10 }}>
              <div style={{ fontWeight: 700, fontSize: 11 }}>{p.name}{p.tech && <span style={{ color: color.hex, fontSize: 9, fontWeight: 400 }}> · {p.tech}</span>}</div>
              {p.description && <div style={{ fontSize: 10, color: "#374151", lineHeight: 1.5 }}>{p.description}</div>}
            </div>
          ))}
        </>
      )}
    </div>
  );
}

// Minimal Template – ultra clean, modern
function MinimalTemplate({ data, color }: { data: ResumeData; color: ThemeColor }) {
  const exp = data.experience.filter(e => e.company || e.position);
  const edu = data.education.filter(e => e.institution || e.degree);
  const skills = data.skills.filter(s => s.name);
  const langs = data.languages.filter(l => l.name);
  const certs = data.certifications.filter(c => c.name);

  const Section = ({ title }: { title: string }) => (
    <div style={{ marginTop: 22, marginBottom: 10, display: "flex", alignItems: "center", gap: 8 }}>
      <div style={{ width: 4, height: 16, background: color.hex, borderRadius: 2 }} />
      <span style={{ fontSize: 11, fontWeight: 800, letterSpacing: 1.2, textTransform: "uppercase", color: "#111" }}>{title}</span>
    </div>
  );

  return (
    <div style={{ padding: "40px 48px", fontFamily: "'Segoe UI', Arial, sans-serif", fontSize: 11, background: "#fff", color: "#111" }}>
      {/* Header */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 20 }}>
        <div>
          <div style={{ fontSize: 32, fontWeight: 800, color: "#111", lineHeight: 1 }}>{data.name || "Your Name"}</div>
          {data.jobTitle && <div style={{ fontSize: 14, color: color.hex, fontWeight: 500, marginTop: 4 }}>{data.jobTitle}</div>}
          <div style={{ marginTop: 10, display: "flex", flexWrap: "wrap", gap: 14, fontSize: 9, color: "#6b7280" }}>
            {data.email && <span>{data.email}</span>}
            {data.phone && <span>{data.phone}</span>}
            {data.location && <span>{data.location}</span>}
            {data.linkedin && <span>LinkedIn: {data.linkedin}</span>}
            {data.github && <span>GitHub: {data.github}</span>}
            {data.website && <span>{data.website}</span>}
          </div>
        </div>
        {data.photo && (
          <img src={data.photo} alt="profile" style={{ width: 72, height: 72, borderRadius: "50%", objectFit: "cover", border: `2px solid ${color.light}` }} />
        )}
      </div>

      <div style={{ height: 2, background: color.hex, borderRadius: 1, marginBottom: 4 }} />

      {/* Summary */}
      {data.summary && (
        <>
          <Section title="About" />
          <p style={{ color: "#374151", lineHeight: 1.7, margin: 0 }}>{data.summary}</p>
        </>
      )}

      {/* Experience */}
      {exp.length > 0 && (
        <>
          <Section title="Experience" />
          {exp.map((e, i) => (
            <div key={i} style={{ marginBottom: 14, display: "flex", gap: 16 }}>
              <div style={{ width: 100, flexShrink: 0, textAlign: "right", color: "#9ca3af", fontSize: 9, paddingTop: 2 }}>
                {e.startDate}{(e.startDate || e.endDate) && "–"}{e.current ? "Present" : e.endDate}
              </div>
              <div style={{ flex: 1, borderLeft: `2px solid ${color.light}`, paddingLeft: 12 }}>
                <div style={{ fontWeight: 700, fontSize: 12, color: "#111" }}>{e.position}</div>
                <div style={{ color: color.hex, fontSize: 10, fontWeight: 500 }}>{e.company}{e.location && ` · ${e.location}`}</div>
                {e.description && (
                  <div style={{ marginTop: 4, color: "#4b5563", lineHeight: 1.6 }}>
                    {e.description.split("\n").map((line, li) => line.trim() ? (
                      <div key={li} style={{ display: "flex", gap: 6, marginBottom: 2 }}>
                        <span style={{ color: color.hex, fontWeight: 700 }}>›</span>
                        <span>{line.replace(/^[-•*]\s*/, "")}</span>
                      </div>
                    ) : null)}
                  </div>
                )}
              </div>
            </div>
          ))}
        </>
      )}

      {/* Education */}
      {edu.length > 0 && (
        <>
          <Section title="Education" />
          {edu.map((e, i) => (
            <div key={i} style={{ marginBottom: 10, display: "flex", gap: 16 }}>
              <div style={{ width: 100, flexShrink: 0, textAlign: "right", color: "#9ca3af", fontSize: 9, paddingTop: 2 }}>
                {e.startYear}{(e.startYear || e.endYear) && "–"}{e.endYear}
              </div>
              <div style={{ flex: 1, borderLeft: `2px solid ${color.light}`, paddingLeft: 12 }}>
                <div style={{ fontWeight: 700, fontSize: 11 }}>{e.degree}{e.field && ` · ${e.field}`}</div>
                <div style={{ color: color.hex, fontSize: 10 }}>{e.institution}</div>
                {e.gpa && <div style={{ fontSize: 9, color: "#6b7280" }}>GPA: {e.gpa}</div>}
              </div>
            </div>
          ))}
        </>
      )}

      {/* Skills */}
      {skills.length > 0 && (
        <>
          <Section title="Skills" />
          <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
            {skills.map((s, i) => (
              <div key={i} style={{ display: "flex", alignItems: "center", gap: 6, background: "#f9fafb", border: "1px solid #e5e7eb", borderRadius: 6, padding: "4px 10px" }}>
                <span style={{ fontSize: 10, color: "#374151" }}>{s.name}</span>
                <SkillDots level={s.level} color={color.hex} />
              </div>
            ))}
          </div>
        </>
      )}

      {/* Projects + Certs + Languages in row */}
      <div style={{ display: "flex", gap: 24, marginTop: 4 }}>
        {data.projects.filter(p => p.name).length > 0 && (
          <div style={{ flex: 1 }}>
            <Section title="Projects" />
            {data.projects.filter(p => p.name).map((p, i) => (
              <div key={i} style={{ marginBottom: 8 }}>
                <div style={{ fontWeight: 700, fontSize: 11 }}>{p.name}</div>
                {p.tech && <div style={{ fontSize: 9, color: color.hex }}>{p.tech}</div>}
                {p.description && <div style={{ fontSize: 9, color: "#6b7280", lineHeight: 1.5 }}>{p.description}</div>}
              </div>
            ))}
          </div>
        )}
        {(certs.length > 0 || langs.length > 0) && (
          <div style={{ flex: 1 }}>
            {certs.length > 0 && (
              <>
                <Section title="Certifications" />
                {certs.map((c, i) => (
                  <div key={i} style={{ marginBottom: 5, fontSize: 10 }}>
                    <span style={{ fontWeight: 600 }}>{c.name}</span>
                    {(c.issuer || c.year) && <span style={{ color: "#6b7280" }}> · {[c.issuer, c.year].filter(Boolean).join(", ")}</span>}
                  </div>
                ))}
              </>
            )}
            {langs.length > 0 && (
              <>
                <Section title="Languages" />
                {langs.map((l, i) => (
                  <div key={i} style={{ display: "flex", justifyContent: "space-between", fontSize: 10, marginBottom: 4 }}>
                    <span style={{ fontWeight: 600 }}>{l.name}</span>
                    <span style={{ color: "#6b7280" }}>{l.level}</span>
                  </div>
                ))}
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

// ─── Template renderer ────────────────────────────────────────────────────────

function ResumeCanvas({ data, template, color }: { data: ResumeData; template: TemplateId; color: ThemeColor }) {
  if (template === "modern") return <ModernTemplate data={data} color={color} />;
  if (template === "classic") return <ClassicTemplate data={data} color={color} />;
  return <MinimalTemplate data={data} color={color} />;
}

// ─── Helper: labeled input ────────────────────────────────────────────────────

function Field({ label, children, half = false }: { label: string; children: React.ReactNode; half?: boolean }) {
  return (
    <div className={half ? "col-span-1" : "col-span-2"}>
      <label className="text-xs font-medium text-muted-foreground mb-1 block">{label}</label>
      {children}
    </div>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────

export default function ResumeBuilder() {
  const seoConfig = getSEOConfig("resume-builder");
  const [data, setData] = useState<ResumeData>(EMPTY);
  const [template, setTemplate] = useState<TemplateId>("modern");
  const [colorIdx, setColorIdx] = useState(0);
  const [tab, setTab] = useState("personal");
  const [downloading, setDownloading] = useState(false);
  const captureRef = useRef<HTMLDivElement>(null);
  const photoInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  const color = COLORS[colorIdx];

  // ─── Generic updaters ──────────────────────────────────────────────────────

  const set = useCallback(<K extends keyof ResumeData>(key: K, val: ResumeData[K]) => {
    setData(prev => ({ ...prev, [key]: val }));
  }, []);

  const setArr = useCallback(<K extends keyof ResumeData>(key: K, idx: number, val: Partial<ResumeData[K] extends (infer U)[] ? U : never>) => {
    setData(prev => {
      const arr = [...(prev[key] as any[])];
      arr[idx] = { ...arr[idx], ...val };
      return { ...prev, [key]: arr };
    });
  }, []);

  const addItem = useCallback(<K extends keyof ResumeData>(key: K, blank: any) => {
    setData(prev => ({ ...prev, [key]: [...(prev[key] as any[]), blank] }));
  }, []);

  const removeItem = useCallback(<K extends keyof ResumeData>(key: K, idx: number) => {
    setData(prev => ({ ...prev, [key]: (prev[key] as any[]).filter((_: any, i: number) => i !== idx) }));
  }, []);

  // ─── Photo upload ──────────────────────────────────────────────────────────

  const handlePhoto = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (file.size > 2 * 1024 * 1024) {
      toast({ title: "Photo too large", description: "Please use an image under 2MB", variant: "destructive" });
      return;
    }
    const reader = new FileReader();
    reader.onload = (ev) => set("photo", ev.target?.result as string);
    reader.readAsDataURL(file);
    if (photoInputRef.current) photoInputRef.current.value = "";
  }, [set, toast]);

  // ─── PDF download ──────────────────────────────────────────────────────────

  const downloadPDF = useCallback(async () => {
    const el = captureRef.current;
    if (!el) return;
    setDownloading(true);
    try {
      const canvas = await html2canvas(el, {
        scale: 2,
        useCORS: true,
        backgroundColor: "#ffffff",
        logging: false,
        width: 794,
        height: el.scrollHeight,
      });

      const pdf = new jsPDF({ orientation: "portrait", unit: "mm", format: "a4" });
      const pdfW = pdf.internal.pageSize.getWidth();
      const pdfH = pdf.internal.pageSize.getHeight();
      const imgH = (canvas.height * pdfW) / canvas.width;
      let yOffset = 0;
      let remaining = imgH;

      while (remaining > 0) {
        const sliceH = Math.min(pdfH, remaining);
        const sliceCanvas = document.createElement("canvas");
        sliceCanvas.width = canvas.width;
        sliceCanvas.height = (sliceH / pdfW) * canvas.width;
        const ctx = sliceCanvas.getContext("2d")!;
        ctx.drawImage(canvas, 0, -(yOffset / pdfW) * canvas.width);
        const imgData = sliceCanvas.toDataURL("image/jpeg", 0.97);
        if (yOffset > 0) pdf.addPage();
        pdf.addImage(imgData, "JPEG", 0, 0, pdfW, sliceH);
        yOffset += sliceH;
        remaining -= sliceH;
      }

      const fname = (data.name || "resume").replace(/[^a-zA-Z0-9\s]/g, "").trim().replace(/\s+/g, "_");
      pdf.save(`${fname}_resume.pdf`);
      toast({ title: "Downloaded!", description: "Your resume PDF is ready." });
    } catch (err) {
      console.error(err);
      toast({ title: "Error", description: "PDF generation failed. Please try again.", variant: "destructive" });
    } finally {
      setDownloading(false);
    }
  }, [data.name, toast]);

  // ─── Template thumbnails ───────────────────────────────────────────────────

  const templates: { id: TemplateId; label: string; desc: string }[] = [
    { id: "modern",  label: "Modern",  desc: "Sidebar + main" },
    { id: "classic", label: "Classic", desc: "Centered header" },
    { id: "minimal", label: "Minimal", desc: "Timeline style"  },
  ];

  const tabs = [
    { id: "personal",  label: "Personal",  icon: User },
    { id: "experience",label: "Experience", icon: Briefcase },
    { id: "education", label: "Education", icon: GraduationCap },
    { id: "skills",    label: "Skills",    icon: Wrench },
    { id: "extras",    label: "Extras",    icon: Award },
  ];

  return (
    <>
      <SEOHead config={seoConfig} />
      <ToolLayout>
        <div className="container mx-auto px-4 py-8">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="max-w-7xl mx-auto">

            <div className="text-center mb-8">
              <h1 className="text-4xl font-bold mb-3">Resume Builder</h1>
              <p className="text-lg text-muted-foreground">Professional resumes in minutes — 3 templates, 7 color themes, photo upload, PDF download</p>
            </div>

            <div className="grid grid-cols-1 xl:grid-cols-5 gap-6">
              {/* ── Left: Form ── */}
              <div className="xl:col-span-2 space-y-4">

                {/* Template + Color */}
                <Card>
                  <CardHeader className="pb-3">
                    <CardTitle className="text-sm flex items-center gap-2"><span className="text-base">🎨</span> Template & Color</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-3 gap-2">
                      {templates.map(t => (
                        <button
                          key={t.id}
                          onClick={() => setTemplate(t.id)}
                          className={`rounded-lg border-2 p-3 text-left transition-all ${template === t.id ? "border-primary bg-primary/5" : "border-border hover:border-primary/40"}`}
                        >
                          <div className="text-xs font-bold mb-0.5">{t.label}</div>
                          <div className="text-[10px] text-muted-foreground">{t.desc}</div>
                        </button>
                      ))}
                    </div>
                    <div>
                      <div className="text-xs font-medium text-muted-foreground mb-2">Accent color</div>
                      <div className="flex gap-2 flex-wrap">
                        {COLORS.map((c, i) => (
                          <button
                            key={i}
                            onClick={() => setColorIdx(i)}
                            title={c.name}
                            style={{ background: c.hex }}
                            className={`w-7 h-7 rounded-full transition-transform hover:scale-110 ${colorIdx === i ? "ring-2 ring-offset-2 ring-primary scale-110" : ""}`}
                          />
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Section Tabs */}
                <Card>
                  <CardHeader className="pb-0">
                    <div className="flex flex-wrap gap-1">
                      {tabs.map(t => {
                        const Icon = t.icon;
                        return (
                          <button
                            key={t.id}
                            onClick={() => setTab(t.id)}
                            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium transition-colors ${tab === t.id ? "bg-primary text-primary-foreground" : "hover:bg-muted text-muted-foreground"}`}
                          >
                            <Icon className="h-3 w-3" />{t.label}
                          </button>
                        );
                      })}
                    </div>
                  </CardHeader>
                  <CardContent className="pt-4">

                    {/* ── Personal ── */}
                    {tab === "personal" && (
                      <div className="space-y-3">
                        {/* Photo upload */}
                        <div className="flex items-center gap-4 p-3 border rounded-lg bg-muted/30">
                          <div className="relative">
                            {data.photo ? (
                              <img src={data.photo} alt="photo" className="w-16 h-16 rounded-full object-cover border-2" style={{ borderColor: color.hex }} />
                            ) : (
                              <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center border-2 border-dashed border-border">
                                <User className="h-6 w-6 text-muted-foreground" />
                              </div>
                            )}
                          </div>
                          <div className="flex flex-col gap-1.5">
                            <Button size="sm" variant="outline" onClick={() => photoInputRef.current?.click()} className="h-7 text-xs gap-1">
                              <Camera className="h-3 w-3" /> {data.photo ? "Change Photo" : "Upload Photo"}
                            </Button>
                            {data.photo && (
                              <Button size="sm" variant="ghost" onClick={() => set("photo", "")} className="h-7 text-xs text-destructive hover:text-destructive">
                                Remove
                              </Button>
                            )}
                            <p className="text-[10px] text-muted-foreground">JPG/PNG, max 2MB</p>
                          </div>
                          <input ref={photoInputRef} type="file" accept="image/*" onChange={handlePhoto} className="hidden" />
                        </div>

                        <div className="grid grid-cols-2 gap-3">
                          <Field label="Full Name *" half><Input value={data.name} onChange={e => set("name", e.target.value)} placeholder="John Doe" /></Field>
                          <Field label="Job Title" half><Input value={data.jobTitle} onChange={e => set("jobTitle", e.target.value)} placeholder="Senior Developer" /></Field>
                          <Field label="Email *" half><Input type="email" value={data.email} onChange={e => set("email", e.target.value)} placeholder="john@example.com" /></Field>
                          <Field label="Phone" half><Input value={data.phone} onChange={e => set("phone", e.target.value)} placeholder="+1 555 123 4567" /></Field>
                          <Field label="Location" half><Input value={data.location} onChange={e => set("location", e.target.value)} placeholder="New York, USA" /></Field>
                          <Field label="Website" half><Input value={data.website} onChange={e => set("website", e.target.value)} placeholder="yoursite.com" /></Field>
                          <Field label="LinkedIn" half><Input value={data.linkedin} onChange={e => set("linkedin", e.target.value)} placeholder="linkedin.com/in/johndoe" /></Field>
                          <Field label="GitHub" half><Input value={data.github} onChange={e => set("github", e.target.value)} placeholder="github.com/johndoe" /></Field>
                        </div>
                        <Field label="Professional Summary">
                          <Textarea value={data.summary} onChange={e => set("summary", e.target.value)} placeholder="Experienced developer with 5+ years in..." rows={4} />
                        </Field>
                      </div>
                    )}

                    {/* ── Experience ── */}
                    {tab === "experience" && (
                      <div className="space-y-4">
                        {data.experience.map((e, i) => (
                          <div key={i} className="border rounded-lg p-4 space-y-3 relative">
                            <div className="flex justify-between items-center">
                              <span className="text-xs font-bold text-muted-foreground uppercase tracking-wide">Experience {i + 1}</span>
                              {data.experience.length > 1 && (
                                <Button size="sm" variant="ghost" onClick={() => removeItem("experience", i)} className="h-6 w-6 p-0 text-destructive hover:text-destructive">
                                  <Trash2 className="h-3.5 w-3.5" />
                                </Button>
                              )}
                            </div>
                            <div className="grid grid-cols-2 gap-3">
                              <Input placeholder="Job Title *" value={e.position} onChange={ev => setArr("experience", i, { position: ev.target.value })} />
                              <Input placeholder="Company *" value={e.company} onChange={ev => setArr("experience", i, { company: ev.target.value })} />
                              <Input placeholder="Location" value={e.location} onChange={ev => setArr("experience", i, { location: ev.target.value })} />
                              <div />
                              <Input placeholder="Start (e.g. Jan 2022)" value={e.startDate} onChange={ev => setArr("experience", i, { startDate: ev.target.value })} />
                              <div className="space-y-1">
                                <Input placeholder="End (e.g. Dec 2024)" value={e.endDate} onChange={ev => setArr("experience", i, { endDate: ev.target.value })} disabled={e.current} />
                                <label className="flex items-center gap-1.5 text-xs cursor-pointer">
                                  <input type="checkbox" checked={e.current} onChange={ev => setArr("experience", i, { current: ev.target.checked, endDate: "" })} className="rounded" />
                                  Currently working here
                                </label>
                              </div>
                            </div>
                            <div>
                              <label className="text-xs text-muted-foreground block mb-1">Responsibilities & Achievements (one per line)</label>
                              <Textarea placeholder="• Built scalable API handling 1M+ requests/day&#10;• Reduced load time by 40% through optimization" value={e.description} onChange={ev => setArr("experience", i, { description: ev.target.value })} rows={4} />
                            </div>
                          </div>
                        ))}
                        <Button variant="outline" size="sm" onClick={() => addItem("experience", { company: "", position: "", startDate: "", endDate: "", current: false, location: "", description: "" })} className="gap-1.5">
                          <Plus className="h-3.5 w-3.5" /> Add Experience
                        </Button>
                      </div>
                    )}

                    {/* ── Education ── */}
                    {tab === "education" && (
                      <div className="space-y-4">
                        {data.education.map((e, i) => (
                          <div key={i} className="border rounded-lg p-4 space-y-3">
                            <div className="flex justify-between items-center">
                              <span className="text-xs font-bold text-muted-foreground uppercase tracking-wide">Education {i + 1}</span>
                              {data.education.length > 1 && (
                                <Button size="sm" variant="ghost" onClick={() => removeItem("education", i)} className="h-6 w-6 p-0 text-destructive hover:text-destructive">
                                  <Trash2 className="h-3.5 w-3.5" />
                                </Button>
                              )}
                            </div>
                            <div className="grid grid-cols-2 gap-3">
                              <Input placeholder="Institution *" value={e.institution} onChange={ev => setArr("education", i, { institution: ev.target.value })} className="col-span-2" />
                              <Input placeholder="Degree (e.g. B.Sc.)" value={e.degree} onChange={ev => setArr("education", i, { degree: ev.target.value })} />
                              <Input placeholder="Field of Study" value={e.field} onChange={ev => setArr("education", i, { field: ev.target.value })} />
                              <Input placeholder="Start Year" value={e.startYear} onChange={ev => setArr("education", i, { startYear: ev.target.value })} />
                              <Input placeholder="End Year" value={e.endYear} onChange={ev => setArr("education", i, { endYear: ev.target.value })} />
                              <Input placeholder="GPA (optional)" value={e.gpa} onChange={ev => setArr("education", i, { gpa: ev.target.value })} />
                            </div>
                          </div>
                        ))}
                        <Button variant="outline" size="sm" onClick={() => addItem("education", { institution: "", degree: "", field: "", startYear: "", endYear: "", gpa: "" })} className="gap-1.5">
                          <Plus className="h-3.5 w-3.5" /> Add Education
                        </Button>
                      </div>
                    )}

                    {/* ── Skills ── */}
                    {tab === "skills" && (
                      <div className="space-y-3">
                        <p className="text-xs text-muted-foreground">Rate each skill from 1 (beginner) to 5 (expert)</p>
                        {data.skills.map((s, i) => (
                          <div key={i} className="flex items-center gap-2">
                            <Input placeholder="Skill name" value={s.name} onChange={e => setArr("skills", i, { name: e.target.value })} className="flex-1" />
                            <div className="flex gap-1">
                              {[1,2,3,4,5].map(lvl => (
                                <button key={lvl} onClick={() => setArr("skills", i, { level: lvl })}
                                  className={`w-6 h-6 rounded-full border-2 transition-colors ${s.level >= lvl ? "border-transparent" : "border-border bg-transparent"}`}
                                  style={s.level >= lvl ? { background: color.hex } : {}} />
                              ))}
                            </div>
                            {data.skills.length > 1 && (
                              <Button size="sm" variant="ghost" onClick={() => removeItem("skills", i)} className="h-7 w-7 p-0 text-destructive hover:text-destructive">
                                <Trash2 className="h-3.5 w-3.5" />
                              </Button>
                            )}
                          </div>
                        ))}
                        <Button variant="outline" size="sm" onClick={() => addItem("skills", { name: "", level: 3 })} className="gap-1.5">
                          <Plus className="h-3.5 w-3.5" /> Add Skill
                        </Button>
                      </div>
                    )}

                    {/* ── Extras ── */}
                    {tab === "extras" && (
                      <div className="space-y-6">
                        {/* Projects */}
                        <div>
                          <div className="flex items-center justify-between mb-3">
                            <h4 className="text-sm font-semibold flex items-center gap-1.5"><FolderOpen className="h-4 w-4" /> Projects</h4>
                            <Button variant="outline" size="sm" onClick={() => addItem("projects", { name: "", description: "", tech: "", link: "" })} className="h-7 text-xs gap-1">
                              <Plus className="h-3 w-3" /> Add
                            </Button>
                          </div>
                          {data.projects.map((p, i) => (
                            <div key={i} className="border rounded-lg p-3 mb-3 space-y-2">
                              <div className="flex justify-between">
                                <span className="text-xs font-medium text-muted-foreground">Project {i + 1}</span>
                                <Button size="sm" variant="ghost" onClick={() => removeItem("projects", i)} className="h-5 w-5 p-0 text-destructive hover:text-destructive"><Trash2 className="h-3 w-3" /></Button>
                              </div>
                              <Input placeholder="Project Name" value={p.name} onChange={e => setArr("projects", i, { name: e.target.value })} />
                              <Input placeholder="Technologies used" value={p.tech} onChange={e => setArr("projects", i, { tech: e.target.value })} />
                              <Textarea placeholder="Brief description..." value={p.description} onChange={e => setArr("projects", i, { description: e.target.value })} rows={2} />
                              <Input placeholder="Project URL (optional)" value={p.link} onChange={e => setArr("projects", i, { link: e.target.value })} />
                            </div>
                          ))}
                          {data.projects.length === 0 && <p className="text-xs text-muted-foreground">No projects added yet.</p>}
                        </div>

                        {/* Certifications */}
                        <div>
                          <div className="flex items-center justify-between mb-3">
                            <h4 className="text-sm font-semibold flex items-center gap-1.5"><Award className="h-4 w-4" /> Certifications</h4>
                            <Button variant="outline" size="sm" onClick={() => addItem("certifications", { name: "", issuer: "", year: "" })} className="h-7 text-xs gap-1">
                              <Plus className="h-3 w-3" /> Add
                            </Button>
                          </div>
                          {data.certifications.map((c, i) => (
                            <div key={i} className="flex gap-2 mb-2 items-center">
                              <Input placeholder="Certification name" value={c.name} onChange={e => setArr("certifications", i, { name: e.target.value })} />
                              <Input placeholder="Issuer" value={c.issuer} onChange={e => setArr("certifications", i, { issuer: e.target.value })} />
                              <Input placeholder="Year" value={c.year} onChange={e => setArr("certifications", i, { year: e.target.value })} className="w-24" />
                              <Button size="sm" variant="ghost" onClick={() => removeItem("certifications", i)} className="h-9 w-9 p-0 text-destructive hover:text-destructive"><Trash2 className="h-3.5 w-3.5" /></Button>
                            </div>
                          ))}
                          {data.certifications.length === 0 && <p className="text-xs text-muted-foreground">No certifications added yet.</p>}
                        </div>

                        {/* Languages */}
                        <div>
                          <div className="flex items-center justify-between mb-3">
                            <h4 className="text-sm font-semibold flex items-center gap-1.5"><Globe className="h-4 w-4" /> Languages</h4>
                            <Button variant="outline" size="sm" onClick={() => addItem("languages", { name: "", level: "Fluent" })} className="h-7 text-xs gap-1">
                              <Plus className="h-3 w-3" /> Add
                            </Button>
                          </div>
                          {data.languages.map((l, i) => (
                            <div key={i} className="flex gap-2 mb-2 items-center">
                              <Input placeholder="Language" value={l.name} onChange={e => setArr("languages", i, { name: e.target.value })} />
                              <select value={l.level} onChange={e => setArr("languages", i, { level: e.target.value })}
                                className="flex h-9 w-36 rounded-md border border-input bg-background px-3 py-1 text-sm">
                                {["Native", "Fluent", "Advanced", "Intermediate", "Basic"].map(lv => (
                                  <option key={lv} value={lv}>{lv}</option>
                                ))}
                              </select>
                              <Button size="sm" variant="ghost" onClick={() => removeItem("languages", i)} className="h-9 w-9 p-0 text-destructive hover:text-destructive"><Trash2 className="h-3.5 w-3.5" /></Button>
                            </div>
                          ))}
                          {data.languages.length === 0 && <p className="text-xs text-muted-foreground">No languages added yet.</p>}
                        </div>
                      </div>
                    )}

                  </CardContent>
                </Card>

                <Button onClick={downloadPDF} disabled={downloading} size="lg" className="w-full gap-2" style={{ background: color.hex }}>
                  {downloading ? (
                    <><div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent" /> Generating PDF…</>
                  ) : (
                    <><Download className="h-5 w-5" /> Download PDF</>
                  )}
                </Button>
              </div>

              {/* ── Right: Live Preview ── */}
              <div className="xl:col-span-3">
                <Card className="sticky top-6">
                  <CardHeader className="pb-2 flex flex-row items-center justify-between">
                    <CardTitle className="text-sm">Live Preview</CardTitle>
                    <span className="text-xs text-muted-foreground">A4 · Updates as you type</span>
                  </CardHeader>
                  <CardContent className="p-4">
                    {/* Scaled preview wrapper */}
                    <div className="overflow-auto bg-gray-100 rounded-lg p-2" style={{ maxHeight: "80vh" }}>
                      <div style={{ width: 794, transformOrigin: "top left", transform: `scale(${Math.min(1, (window.innerWidth > 1280 ? 580 : window.innerWidth > 768 ? 420 : 320) / 794)})` }}>
                        <div ref={captureRef} style={{ width: 794, minHeight: 1123, background: "#fff", boxShadow: "0 4px 24px rgba(0,0,0,0.12)" }}>
                          <ResumeCanvas data={data} template={template} color={color} />
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>

            <ToolExplanation
              title="Professional Resume Builder"
              description="Build a market-standard resume with three professional templates, seven accent color themes, photo upload, and sections for experience, education, skills, projects, certifications, and languages. The live preview updates as you type. Download as a high-quality PDF instantly — no account, no watermark, no data stored."
              howToUse={[
                "Choose a template (Modern, Classic, or Minimal) and pick an accent color.",
                "Fill in Personal Info — upload a profile photo, enter your name, job title, contact details, and summary.",
                "Add Work Experience — use one bullet point per line in the description field.",
                "Add Education, Skills (with proficiency level), and optional Extras (Projects, Certifications, Languages).",
                "Watch the live A4 preview update in real time, then click Download PDF.",
              ]}
              features={[
                "3 professional templates: Modern (sidebar), Classic (centered), Minimal (timeline).",
                "7 accent color themes to match your personal brand.",
                "Profile photo upload (shown as a circle in all templates).",
                "Skill proficiency levels with visual dot/bar indicators.",
                "Sections: Summary, Experience (with current-job toggle), Education, Skills, Projects, Certifications, Languages.",
                "Multi-page PDF support — long resumes automatically split across pages.",
                "100% browser-based — nothing uploaded, nothing stored.",
              ]}
              faqs={[
                { question: "Which template is best for ATS?", answer: "Classic and Minimal use single-column layouts which are most ATS-friendly. Modern's sidebar may cause some ATS systems to read columns out of order, but it looks the most impressive for human reviewers." },
                { question: "Can I save my resume and edit it later?", answer: "Currently the form doesn't persist across browser sessions. Fill in all sections in one sitting and download the PDF. You can keep the PDF and re-enter content anytime." },
                { question: "How do I add bullet points to my experience?", answer: "In the description field, put each achievement on its own line. The templates automatically format each line as a bullet point (▸ or •)." },
              ]}
            />
          </motion.div>
        </div>
      </ToolLayout>
    </>
  );
}
