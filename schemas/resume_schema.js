import { z } from "zod";

export const resumeSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email"),
  phone: z.string().min(1, "Phone is required"),
  address: z.string().min(1, "Address is required"),
  linkedinProfile: z.string().url("Invalid URL"),
  twitterProfile: z.string().url("Invalid URL"),
  githubProfile: z.string().url("Invalid URL"),
  professionalSummary: z.string().min(10, "Professional summary is required"),
  skills: z.string().min(1, "Skills are required"),

  workExperience: z
    .array(
      z
        .object({
          title: z.string().min(1, "Job title is required"),
          company: z.string().min(1, "Company name is required"),
          startDate: z.string().min(1, "Start date is required"),
          endDate: z.string().optional(), // optional if current = true
          current: z.boolean().default(false),
          description: z.string().min(1, "Description is required"),
        })
        // 👇 Custom validation: agar current false hai toh endDate required hai
        .refine(
          (data) =>
            data.current || (!!data.endDate && data.endDate.trim() !== ""),
          {
            message: "End date is required if not a current job",
            path: ["endDate"],
          }
        )
    ).optional(),
    // .min(1, "At least one work experience is required"),

  education: z.array(
    z.object({
      collegeName: z.string().min(1, "College name is required"),
      degree: z.string().min(1, "Degree is required"),
      fieldOfStudy: z.string().min(1, "Field of study is required"),
      session: z.string().min(1, "Session is required"),
      cgpa: z.string().min(1, "CGPA is required"),
    })
  ).optional(),

  projects: z.array(
    z.object({
      title: z.string().min(1, "Project title is required"),
      description: z.string().min(1, "Description is required"),
      technologies: z.string().min(1, "Technologies are required"),
      liveLink: z.string().url("Invalid URL").optional(),
    })
  ).optional(),
});
