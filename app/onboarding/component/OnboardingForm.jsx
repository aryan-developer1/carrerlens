"use client";

import { useMemo } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { onboardingSchema } from "@/schemas/onboarding_schema";
import { industries } from "@/data/industries";

// ShadCN UI
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/ui/select";

import { updateUser } from "@/actions/user";
import { useRouter } from "next/navigation";

export default function OnboardingForm() {
  const router = useRouter()
  const {
    control,
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting }
  } = useForm({
    resolver: zodResolver(onboardingSchema),
    defaultValues: {
      industryId: "",
      specialization: "",
      bio: "",
      experience: "",
      skillsText: "",
    },
    mode: "onSubmit",
  });

  const selectedIndustryId = watch("industryId");
  const selectedIndustry = useMemo(
    () => industries.find((i) => i.id === selectedIndustryId) || null,
    [selectedIndustryId]
  );

  const onSubmit = async (values) => {
    console.log("values", values);
    
    try {
      const skillsArray = values.skillsText
        .split(",")
        .map((s) => s.trim())
        .filter(Boolean);

      const ind = industries.find((i) => i.id === values.industryId);

      const data = {
        industry: ind?.name ?? "",
        specialization: values.specialization,
        bio: values.bio,
        experience: values.experience,
        skills: skillsArray,
      };
          console.log("yha tak thik h ")
      const result = await updateUser(data);

      console.log("result", result);
      
      if (result.success) {
        console.log("User updated successfully:", result.data);
        router.push("/dashboard");
      } else {
        console.error("Error updating user:", result.error);
        // Handle error - don't redirect on error
      }
    } catch (error) {
      console.error("Unexpected error:", error);
    }
  };

  return (
    <Card className="max-w-2xl mx-auto mt-6">
      <CardHeader>
        <CardTitle>Onboarding</CardTitle>
        <CardDescription>Tell us about your background to personalize your journey.</CardDescription>
      </CardHeader>

      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Industry */}
          <div className="space-y-2">
            <Label htmlFor="industry">Industry</Label>
            <Controller
              name="industryId"
              control={control}
              render={({ field }) => (
                <Select value={field.value} onValueChange={field.onChange}>
                  <SelectTrigger id="industry">
                    <SelectValue placeholder="Select an industry" />
                  </SelectTrigger>
                  <SelectContent>
                    {industries.map((i) => (
                      <SelectItem key={i.id} value={i.id}>
                        {i.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}
            />
            {errors.industryId && (
              <p className="text-sm text-red-500">{errors.industryId.message}</p>
            )}
          </div>

          {/* Specialization */}
          <div className="space-y-2">
            <Label htmlFor="specialization">Specialization</Label>
            <Controller
              name="specialization"
              control={control}
              render={({ field }) => (
                <Select
                  value={field.value}
                  onValueChange={field.onChange}
                  disabled={!selectedIndustry}
                >
                  <SelectTrigger id="specialization">
                    <SelectValue placeholder={selectedIndustry ? "Select specialization" : "Select industry first"} />
                  </SelectTrigger>
                  <SelectContent>
                    {(selectedIndustry?.subIndustries ?? []).map((s) => (
                      <SelectItem key={s} value={s}>
                        {s}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}
            />
            {errors.specialization && (
              <p className="text-sm text-red-500">{errors.specialization.message}</p>
            )}
          </div>

          {/* Bio */}
          <div className="space-y-2">
            <Label htmlFor="bio">Bio</Label>
            <Textarea
              id="bio"
              placeholder="Briefly describe your background and goals…"
              rows={4}
              {...register("bio")}
            />
            {errors.bio && <p className="text-sm text-red-500">{errors.bio.message}</p>}
          </div>

          {/* Experience */}
          <div className="space-y-2">
            <Label htmlFor="experience">Experience (years)</Label>
            <Input
              id="experience"
              type="number"
              min={0}
              max={50}
              {...register("experience")}
            />
            {errors.experience && (
              <p className="text-sm text-red-500">{errors.experience.message}</p>
            )}
          </div>

          {/* Skills */}
          <div className="space-y-2">
            <Label htmlFor="skills">Skills (comma-separated)</Label>
            <Input
              id="skills"
              placeholder="e.g. React, Node.js, PostgreSQL"
              {...register("skillsText")}
            />
            {errors.skillsText && (
              <p className="text-sm text-red-500">{errors.skillsText.message}</p>
            )}
          </div>

          {/* Submit */}
          <div className="pt-2">
            <Button type="submit" className="w-full" disabled={isSubmitting}>
              {isSubmitting ? "Saving..." : "Save & Continue"}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
