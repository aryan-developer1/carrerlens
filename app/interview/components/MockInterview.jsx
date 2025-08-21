"use client"

import { Button } from '@/components/ui/button';
import { ArrowLeft, ChevronRight } from 'lucide-react';
import { useState } from 'react';
import { BarLoader } from 'react-spinners';
import { createMockInterview, saveAssessmentResults } from "@/actions/interview"
import QuizContainer from './QuizContainer';
import { useRouter } from 'next/navigation';

const MockInterview = () => {

  const router = useRouter();

  const [loading, setLoading] = useState(false);
  const [interviewQuestions, setInterviewQuestions] = useState([]);
  const [quizStarted, setQuizStarted] = useState(false);

  const handleStartQuiz = async() => {
    setLoading(true);
    const data = await createMockInterview()
    console.log("data aa gaya", data)
    
    if (data?.success) {
     if (data?.parsedResponse?.questions) {
        setInterviewQuestions(data.parsedResponse.questions);
      }
      setQuizStarted(true);
    }
    setLoading(false);
  }

  const handleSaveResults = async (resultsData) => {
    try {
      const result = await saveAssessmentResults(resultsData);
      console.log("Results saved:", result);
      return result;
    } catch (error) {
      console.error("Error saving results:", error);
      throw error;
    }
  }

  const handleBackToPrep = () => {
    setQuizStarted(false);
    setInterviewQuestions([]);
  }

  if (quizStarted && interviewQuestions.length > 0) {
    return (
      <div className="min-h-screen bg-black text-white p-16">
        {/* Back Button */}
        <div className="mb-8">
          <button 
            onClick={handleBackToPrep}
            className="flex items-center gap-2 text-gray-300 hover:text-white transition-colors"
          >
            <ArrowLeft size={20} />
            <span>Back to Interview Preparation </span>
          </button>
        </div>
          

        {/* Header */}
        <div className="mb-8">
          <h1 className="text-5xl font-bold mb-4">Mock Interview</h1>
          <p className="text-gray-400 text-lg">Test your knowledge with industry-specific questions</p>
        </div>

        {/* Quiz Container */}
        <QuizContainer 
          questions={interviewQuestions} 
          onSaveResults={handleSaveResults}
        />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-black text-white p-16">
      {/* Back Button */}
      <div className="mb-8 flex items-center justify-between">
        <button  className="flex items-center gap-2 text-gray-300 hover:text-white transition-colors">
          <ArrowLeft size={20} />
          <span>Back to Interview Preparation</span>
        </button>
        <Button className="cursor-pointer" variant="outline" size="sm" onClick={() => router.push('/interview/tracking')}>
            Track Preparation
            <ChevronRight className="ml-2 h-4 w-4" />
          </Button>
      </div>

      {/* Main Content */}
      <div className=" mx-auto">
        {/* Title Section */}
        <div className="mb-4">
          <h1 className="text-5xl font-bold mb-4">Mock Interview</h1>
          <p className="text-gray-400 text-lg">Test your knowledge with industry-specific questions</p>
        </div>

        {/* Quiz Info Card */}
        {loading ? (
          <BarLoader color="#ffffff" loading={loading} height={4} width={"full"} />
        ) : (
          <div className="w-full rounded-lg p-4 border border-gray-800">
            <h2 className="text-2xl font-semibold mb-3">Ready to test your knowledge?</h2>
            <p className="text-gray-300 mb-8 leading-relaxed">
              This quiz contains 10 questions specific to your industry and skills. Take your time and choose the best answer for each question.
            </p>
            
            {/* Start Quiz Button */}
            <Button onClick={handleStartQuiz} className="w-full bg-white cursor-pointer text-black py-2 px-3 rounded-lg font-semibold text-lg hover:bg-gray-100 transition-colors">
              Start Quiz
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}

export default MockInterview
