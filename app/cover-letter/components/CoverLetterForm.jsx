"use client"
import { useState } from "react";
import { useForm } from "react-hook-form";
import { coverLetterSchema } from "@/schemas/cover_letter_schema";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { getImprovedCoverLetter, saveCoverLetter, getAllCoverLetters } from "@/actions/cover_letter";
import { PacmanLoader } from "react-spinners";



const CoverLetterForm = () => {
    const [loading, setLoading] = useState(false);
    const [generatedCoverLetter, setGeneratedCoverLetter] = useState("");
    const [formData, setFormData] = useState(null);
    const [savedCoverLetters, setSavedCoverLetters] = useState([]);
    const [showSavedLetters, setShowSavedLetters] = useState(false);

  const form = useForm({
    resolver: zodResolver(coverLetterSchema),
    defaultValues: {
      companyName: "",
      jobTitle: "",
      jobDescription: "",
    },
  });

  const onSubmit = async (data) => {
    console.log(data);
    try {
        setLoading(true);
        const response = await getImprovedCoverLetter(data.companyName, data.jobTitle, data.jobDescription);
        console.log("response", response);
        
        if (response.success) {
          setGeneratedCoverLetter(response.cleanedResponse);
          setFormData(data);
        }
        setLoading(false);
      
    } catch (error) {
      console.log("error", error);
      setLoading(false);
    }
  };

  const handleSaveCoverLetter = async () => {
    if (!generatedCoverLetter || !formData) return;
    
    try {
      setLoading(true);
      const response = await saveCoverLetter({
        content: generatedCoverLetter,
        companyName: formData.companyName,
        jobTitle: formData.jobTitle,
        jobDescription: formData.jobDescription
      });
      
      if (response.success) {
        alert("Cover letter saved successfully!");
        setGeneratedCoverLetter("");
        setFormData(null);
        form.reset();
      }
      setLoading(false);
    } catch (error) {
      console.log("error saving cover letter", error);
      setLoading(false);
    }
  };

  const handleShowSavedLetters = async () => {
    try {
      setLoading(true);
      const response = await getAllCoverLetters();
      if (response.success) {
        setSavedCoverLetters(response.coverLetters);
        setShowSavedLetters(true);
      }
      setLoading(false);
    } catch (error) {
      console.log("error fetching cover letters", error);
      setLoading(false);
    }
  };

   if(loading){
    return (
      <div className="flex items-center justify-center h-screen">
        <PacmanLoader color="#3b82f6" size={15} />
      </div>
    )
   }

  return (
    <div>
        {/* create card and than inside it form */}
        <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">

        <Card className="w-full mx-auto">
            <CardHeader>
              <CardTitle>Basic Information</CardTitle>
              <CardDescription>Enter your personal details</CardDescription>
            </CardHeader>
            <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="companyName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Company Name</FormLabel>
                    <FormControl>
                      <Input placeholder="xyz company" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="jobTitle"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Job Title</FormLabel>
                    <FormControl>
                      <Input placeholder="Frontend Developer" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="jobDescription"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Job Description</FormLabel>
                    <FormControl>
                      <Input placeholder="Job description" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button type="submit" className="col-span-1 md:col-span-2">Generate Cover Letter</Button>

            </CardContent>
          </Card>

          {generatedCoverLetter && (
            <Card className="w-full mx-auto mt-6">
              <CardHeader>
                <CardTitle>Generated Cover Letter</CardTitle>
                <CardDescription>Review and save your personalized cover letter</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <Textarea
                  value={generatedCoverLetter}
                  onChange={(e) => setGeneratedCoverLetter(e.target.value)}
                  className="min-h-[400px] resize-none"
                  placeholder="Your generated cover letter will appear here..."
                />
                <div className="flex gap-4">
                  <Button onClick={handleSaveCoverLetter} className="flex-1">
                    Save Cover Letter
                  </Button>
                  <Button 
                    variant="outline" 
                    onClick={() => {
                      setGeneratedCoverLetter("");
                      setFormData(null);
                    }}
                    className="flex-1"
                  >
                    Discard
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}

          <div className="mt-6">
            <Button 
              variant="outline" 
              onClick={handleShowSavedLetters}
              className="w-full"
            >
              {showSavedLetters ? "Hide" : "Show"} Saved Cover Letters
            </Button>
          </div>

          {showSavedLetters && savedCoverLetters.length > 0 && (
            <div className="mt-6 space-y-4">
              <h2 className="text-2xl font-bold">Saved Cover Letters</h2>
              {savedCoverLetters.map((letter) => (
                <Card key={letter.id} className="w-full">
                  <CardHeader>
                    <CardTitle className="text-lg">
                      {letter.jobTitle} at {letter.companyName}
                    </CardTitle>
                    <CardDescription>
                      Created: {new Date(letter.createdAt).toLocaleDateString()}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Textarea
                      value={letter.content}
                      readOnly
                      className="min-h-[200px] resize-none bg-gray-50"
                    />
                  </CardContent>
                </Card>
              ))}
            </div>
          )}

          {showSavedLetters && savedCoverLetters.length === 0 && (
            <Card className="w-full mx-auto mt-6">
              <CardContent className="text-center py-8">
                <p className="text-gray-500">No saved cover letters found.</p>
              </CardContent>
            </Card>
          )}
        
        </form>
        </Form>
       
    </div>
  )
}

export default CoverLetterForm
