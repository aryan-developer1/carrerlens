import { z } from "zod";

export const onboardingSchema = z.object({
    industryId: z.string().min(1, "Industry is required"),
    specialization: z.string().min(1, "Specialization is required"),
    bio: z.string().min(1, "Bio is required"),
    skillsText: z.string().min(1, "Skills are required"),
    experience: z.coerce.number().min(0, "Experience must be 0 or greater"),
})

export const onboardingSchemaType = onboardingSchema.infer;
