import { useForm,useFieldArray } from "react-hook-form";
import { resumeSchema } from "@/schemas/resume_schema";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Plus, Sparkle } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import { ResumePreview } from "./ResumePreview";
import { fetchResume,getImprovedProfessionalSummary,saveResume } from "@/actions/resume";
import { useEffect, useState } from "react";
import { toast } from "sonner";


const ResumeForm = ({ onDataChange }) => {
 
  const [isDataLoaded, setIsDataLoaded] = useState(false);
  const [AIProcessing, setAIProcessing] = useState({
    professionalSummary: false,
    skills: false
  });
  
  useEffect(()=>{
    if (!isDataLoaded) {
      fetchResumeData();
    }
  },[isDataLoaded])

  const handleImproveProfessionalSummary = async(type)=>{
    try {
      setAIProcessing(prev => ({ ...prev, [type]: true }));
      const response = await getImprovedProfessionalSummary(type,form.getValues(type));
      console.log("response of improved professional summary",response);
      if (response.success) {
        toast.success(response.message);
        form.setValue(type,response.cleanedResponse);
      }
    } catch (error) {
      toast.error("Error improving professional summary");
      console.error("Error improving professional summary:", error);
    }
    setAIProcessing(prev => ({ ...prev, [type]: false }));
  }

  const fetchResumeData = async()=>{
    try {
      const response = await fetchResume();
      console.log("response of fetched resume",response);
      if (response.success && response.resume) {
        // Reset form with fetched data
        form.reset({
          name: response.resume.name || "",
          email: response.resume.email || "",
          phone: response.resume.phone || "",
          address: response.resume.address || "",
          linkedinProfile: response.resume.linkedinProfile || "",
          twitterProfile: response.resume.twitterProfile || "",
          githubProfile: response.resume.githubProfile || "",
          professionalSummary: response.resume.professionalSummary || "",
          skills: response.resume.skills || "",
        });
        
        // Manually populate dynamic arrays after form reset
        setTimeout(() => {
          // Clear existing fields and populate with fetched data
          if (response.resume.workExperience && response.resume.workExperience.length > 0) {
            // Clear existing work experience
            for (let i = fields.length - 1; i >= 0; i--) {
              remove(i);
            }
            // Add fetched work experience
            response.resume.workExperience.forEach(exp => append(exp));
          }
          
          if (response.resume.education && response.resume.education.length > 0) {
            // Clear existing education
            for (let i = educationFields.length - 1; i >= 0; i--) {
              removeEducation(i);
            }
            // Add fetched education
            response.resume.education.forEach(edu => appendEducation(edu));
          }
          
          if (response.resume.projects && response.resume.projects.length > 0) {
            // Clear existing projects
            for (let i = projectFields.length - 1; i >= 0; i--) {
              removeProject(i);
            }
            // Add fetched projects
            response.resume.projects.forEach(project => appendProject(project));
          }
        }, 100); // Small delay to ensure form reset is complete
      }
      setIsDataLoaded(true);
    } catch (error) {
      console.error("Error fetching resume:", error);
      setIsDataLoaded(true);
    }
  }

  const form = useForm({
    resolver: zodResolver(resumeSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      address: "",
      linkedinProfile: "",
      twitterProfile: "",
      githubProfile: "",
      professionalSummary: "",
      skills: "",
      workExperience: [],
      education: [],
      projects: [],
    },
  });

  

  // 👇 useFieldArray for dynamic workExperience
  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "workExperience",
  });

  // 👇 useFieldArray for dynamic education
  const { fields: educationFields, append: appendEducation, remove: removeEducation } = useFieldArray({
    control: form.control,
    name: "education",
  });

  // 👇 useFieldArray for dynamic projects
  const { fields: projectFields, append: appendProject, remove: removeProject } = useFieldArray({
    control: form.control,
    name: "projects",
  });

  const onSubmit = async (data) => {
    console.log(data);
    onDataChange(data);

      try {
        const response = await saveResume(data);
        console.log(response);
        if (response.success) {
          toast.success("Resume saved successfully see markdown tab");
        }
      } catch (error) {
        toast.error("Error saving resume");
        console.error("Error saving resume:", error);
      }
  };

  return (
    <div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          {/* 👇 Basic Info Card */}
          <Card className="w-full mx-auto">
            <CardHeader>
              <CardTitle>Basic Information</CardTitle>
              <CardDescription>Enter your personal details</CardDescription>
            </CardHeader>
            <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input placeholder="shadcn" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input placeholder="demo@gmail.com" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="phone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Phone</FormLabel>
                    <FormControl>
                      <Input placeholder="10 digit indian number" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="address"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Address</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="123 Main St, City, State"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="linkedinProfile"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>LinkedIn Profile</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="https://linkedin.com/in/username"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="twitterProfile"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Twitter Profile</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="https://twitter.com/username"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="githubProfile"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>GitHub Profile</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="https://github.com/username"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </CardContent>
          </Card>

          <div>
            <Card>
              <CardContent>
                <FormField
                  control={form.control}
                  name="professionalSummary"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Professional Summary</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Enter your professional summary"
                          className="h-24"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button
                disabled={AIProcessing.professionalSummary}
                type="button"
                  variant="outline"
                  className="flex items-center gap-2 mt-2 cursor-pointer"
                  onClick={() => handleImproveProfessionalSummary("professionalSummary")}
                >
                  <Sparkle className="w-4 h-4" />
                 {AIProcessing.professionalSummary ? "Processing..." : "Improve with AI"}
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Skills */}
          <div>
            <Card>
              <CardContent>
                <FormField
                  control={form.control}
                  name="skills"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Skills</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Enter your skills..."
                          className="h-24"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                 <Button
                disabled={AIProcessing.skills}
                type="button"
                  variant="outline"
                  className="flex items-center gap-2 mt-2 cursor-pointer"
                  onClick={() => handleImproveProfessionalSummary("skills")}
                >
                  <Sparkle className="w-4 h-4" />
                 {AIProcessing.skills ? "Processing..." : "Improve with AI"}
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Work Experience */}
         {/* Dynamic Work Experience Section */}
        <div className="space-y-4">
          <div className="flex flex-col gap-5 ">
            <h2 className="text-xl font-bold">Work Experience</h2>
            <Button
            variant="outline"
            className="flex items-center gap-2 cursor-pointer w-full"
              type="button"
              onClick={() =>
                append({
                  title: "",
                  company: "",
                  startDate: "",
                  endDate: "",
                  current: false,
                  description: "",
                })
              }
            >
             <Plus className="w-4 h-4" />
             <span>Add Experience</span>
            </Button>
          </div>

          {/* Render Experience Cards */}
          {fields.map((field, index) => (
            <Card key={field.id} className="p-4">
              <CardHeader>
                <div className="flex justify-between items-center">
                  <CardTitle>Experience {index + 1}</CardTitle>
                  <Button
                  className="cursor-pointer hover:bg-red-900"
                    type="button"
                    variant="destructive"
                    size="sm"
                    onClick={() => remove(index)}
                  >
                    Delete
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Job Title */}
                <FormField
                  control={form.control}
                  name={`workExperience.${index}.title`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Job Title</FormLabel>
                      <FormControl>
                        <Input placeholder="Software Engineer" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Company */}
                <FormField
                  control={form.control}
                  name={`workExperience.${index}.company`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Company</FormLabel>
                      <FormControl>
                        <Input placeholder="Company Name" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Start Date */}
                <FormField
                  control={form.control}
                  name={`workExperience.${index}.startDate`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Start Date</FormLabel>
                      <FormControl>
                        <Input type="date" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* End Date */}
                <FormField
                  control={form.control}
                  name={`workExperience.${index}.endDate`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>End Date</FormLabel>
                      <FormControl>
                        <Input type="date" {...field} disabled={form.watch(`workExperience.${index}.current`)} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Current Job Checkbox */}
                <FormField
                  control={form.control}
                  name={`workExperience.${index}.current`}
                  render={({ field }) => (
                    <FormItem className="flex items-center space-x-2">
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                      <FormLabel>Current Job</FormLabel>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Description */}
                <FormField
                  control={form.control}
                  name={`workExperience.${index}.description`}
                  render={({ field }) => (
                    <FormItem className="col-span-full">
                      <FormLabel>Description</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Describe your role and achievements..."
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </CardContent>
            </Card>
          ))}
        </div>

          {/* Education */}
          <div className="space-y-4">
            <div className="flex flex-col gap-5">
              <h2 className="text-xl font-bold">Education</h2>
              <Button
                variant="outline"
                className="flex items-center gap-2 cursor-pointer w-full"
                type="button"
                onClick={() =>
                  appendEducation({
                    collegeName: "",
                    degree: "",
                    fieldOfStudy: "",
                    session: "",
                    cgpa: "",
                  })
                }
              >
                <Plus className="w-4 h-4" />
                <span>Add Education</span>
              </Button>
            </div>

            {/* Render Education Cards */}
            {educationFields.map((field, index) => (
              <Card key={field.id} className="p-4">
                <CardHeader>
                  <div className="flex justify-between items-center">
                    <CardTitle>Education {index + 1}</CardTitle>
                    <Button
                      type="button"
                      variant="destructive"
                      size="sm"
                      onClick={() => removeEducation(index)}
                    >
                      Delete
                    </Button>
                  </div>
                </CardHeader>
                <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* College Name */}
                  <FormField
                    control={form.control}
                    name={`education.${index}.collegeName`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>College Name</FormLabel>
                        <FormControl>
                          <Input placeholder="University/College Name" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* Degree */}
                  <FormField
                    control={form.control}
                    name={`education.${index}.degree`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Degree</FormLabel>
                        <FormControl>
                          <Input placeholder="Bachelor's, Master's, etc." {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* Field of Study */}
                  <FormField
                    control={form.control}
                    name={`education.${index}.fieldOfStudy`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Field of Study</FormLabel>
                        <FormControl>
                          <Input placeholder="Computer Science, Engineering, etc." {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* Session */}
                  <FormField
                    control={form.control}
                    name={`education.${index}.session`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Session</FormLabel>
                        <FormControl>
                          <Input placeholder="2020-2024" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* CGPA */}
                  <FormField
                    control={form.control}
                    name={`education.${index}.cgpa`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>CGPA</FormLabel>
                        <FormControl>
                          <Input placeholder="8.5/10" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </CardContent>
              </Card>
            ))}
          </div>
          {/* Projects */}
          <div className="space-y-4">
            <div className="flex flex-col gap-5">
              <h2 className="text-xl font-bold">Projects</h2>
              <Button
                variant="outline"
                className="flex items-center gap-2 cursor-pointer w-full"
                type="button"
                onClick={() =>
                  appendProject({
                    title: "",
                    description: "",
                    technologies: "",
                    liveLink: "",
                  })
                }
              >
                <Plus className="w-4 h-4" />
                <span>Add Project</span>
              </Button>
            </div>

            {/* Render Project Cards */}
            {projectFields.map((field, index) => (
              <Card key={field.id} className="p-4">
                <CardHeader>
                  <div className="flex justify-between items-center">
                    <CardTitle>Project {index + 1}</CardTitle>
                    <Button
                      type="button"
                      variant="destructive"
                      size="sm"
                      onClick={() => removeProject(index)}
                    >
                      Delete
                    </Button>
                  </div>
                </CardHeader>
                <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Project Title */}
                  <FormField
                    control={form.control}
                    name={`projects.${index}.title`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Project Title</FormLabel>
                        <FormControl>
                          <Input placeholder="My Awesome Project" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* Technologies */}
                  <FormField
                    control={form.control}
                    name={`projects.${index}.technologies`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Technologies</FormLabel>
                        <FormControl>
                          <Input placeholder="React, Node.js, MongoDB" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* Live Link */}
                  <FormField
                    control={form.control}
                    name={`projects.${index}.liveLink`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Live Link (Optional)</FormLabel>
                        <FormControl>
                          <Input placeholder="https://myproject.com" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* Description */}
                  <FormField
                    control={form.control}
                    name={`projects.${index}.description`}
                    render={({ field }) => (
                      <FormItem className="col-span-full">
                        <FormLabel>Description</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="Describe your project and its key features..."
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Submit Button */}
          <div className="flex justify-end">
            <Button disabled={form.formState.isSubmitting} type="submit">{form.formState.isSubmitting ? "Saving..." : "Save"} </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default ResumeForm;
