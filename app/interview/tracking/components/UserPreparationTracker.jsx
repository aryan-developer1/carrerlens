"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { 
  TrendingUp, 
  BookOpen, 
  Target, 
  Calendar,
  Clock,
  Award,
  ChevronRight,
  BarChart3,
  ArrowLeft
} from "lucide-react"
import { getUserAssessmentData } from "@/actions/assessment"
import QuizReviewModal from "./QuizReviewModal"
import { useRouter } from "next/navigation"

const UserPreparationTracker = () => {
  const router = useRouter()
  const [assessmentData, setAssessmentData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [selectedQuizId, setSelectedQuizId] = useState(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await getUserAssessmentData()
        if (result.success) {
          setAssessmentData(result.data)
        }
      } catch (error) {
        console.error("Error fetching assessment data:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  const formatDate = (dateString) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  const getScoreColor = (score) => {
    if (score >= 80) return "text-green-600"
    if (score >= 60) return "text-yellow-600"
    return "text-red-600"
  }

  const getScoreBadgeVariant = (score) => {
    if (score >= 80) return "default"
    if (score >= 60) return "secondary"
    return "destructive"
  }

  const handleQuizClick = (quizId) => {
    setSelectedQuizId(quizId)
    setIsModalOpen(true)
  }

  const handleCloseModal = () => {
    setIsModalOpen(false)
    setSelectedQuizId(null)
  }

  if (loading) {
    return (
      <div className="p-6 space-y-6">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-64 mb-6"></div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-32 bg-gray-200 rounded-lg"></div>
            ))}
          </div>
          <div className="h-96 bg-gray-200 rounded-lg"></div>
        </div>
      </div>
    )
  }

  return (
    <div className="p-6 space-y-6 bg-background min-h-screen">

      
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-foreground">Interview Preparation</h1>
     
      </div>

      {/* Assessment Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Average Score Card */}
        <Card className="relative overflow-hidden border-border bg-card hover:shadow-lg transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Average Score
            </CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">
              {assessmentData?.averageScore?.toFixed(1) || 0}
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              Across all assessments
            </p>
          </CardContent>
        </Card>

        {/* Questions Practiced Card */}
        <Card className="relative overflow-hidden border-border bg-card hover:shadow-lg transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Questions Practiced
            </CardTitle>
            <BookOpen className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">
              {assessmentData?.totalQuestions || 0}
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              Total questions
            </p>
          </CardContent>
        </Card>

        {/* Latest Score Card */}
        <Card className="relative overflow-hidden border-border bg-card hover:shadow-lg transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Latest Score
            </CardTitle>
            <Target className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">
              {assessmentData?.latestScore?.toFixed(1) || 0}
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              Most recent quiz
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Recent Quizzes Section */}
      <Card className="border-border bg-card">
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle className="text-xl font-semibold text-foreground">Recent Quizzes</CardTitle>
            <p className="text-sm text-muted-foreground mt-1">
              Review your past quiz performance
            </p>
          </div>
          <Button variant="outline" size="sm" onClick={() => router.push('/interview')}>
            Start New Quiz
            <ChevronRight className="ml-2 h-4 w-4" />
          </Button>
        </CardHeader>
        <CardContent className="space-y-4">
          {assessmentData?.recentQuizzes?.length > 0 ? (
            assessmentData.recentQuizzes.map((quiz, index) => (
              <Card 
                key={quiz.id} 
                className="border-border bg-muted/50 hover:bg-muted/80 transition-colors cursor-pointer"
                onClick={() => handleQuizClick(quiz.id)}
              >
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center justify-center w-10 h-10 rounded-full bg-primary/10">
                        <BarChart3 className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-medium text-foreground">
                          Quiz {index + 1}
                        </h3>
                        <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                          <Calendar className="h-3 w-3" />
                          <span>{formatDate(quiz.createdAt)}</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-4">
                      <div className="text-right">
                        <Badge 
                          variant={getScoreBadgeVariant(quiz.score)}
                          className="mb-1"
                        >
                          {quiz.score.toFixed(1)}
                        </Badge>
                        <p className="text-xs text-muted-foreground">
                          {quiz.correctAnswers}/{quiz.totalQuestions} correct
                        </p>
                      </div>
                      <Button variant="ghost" size="sm">
                        <ChevronRight className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                  <div className="mt-3">
                    <Badge variant="outline" className="text-xs">
                      {quiz.category}
                    </Badge>
                  </div>
                </CardContent>
              </Card>
            ))
          ) : (
            <div className="text-center py-12">
              <Award className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-medium text-foreground mb-2">
                No quizzes taken yet
              </h3>
              <p className="text-muted-foreground mb-4">
                Start your first quiz to track your progress
              </p>
              <Button>
                Take Your First Quiz
                <ChevronRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Quiz Review Modal */}
      <QuizReviewModal 
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        quizId={selectedQuizId}
      />
    </div>
  )
}

export default UserPreparationTracker
