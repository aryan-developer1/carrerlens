"use client";

import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  CheckCircle,
  XCircle,
  Clock,
  Award,
  BookOpen,
  Lightbulb,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { getQuizDetails } from "@/actions/assessment";

const QuizReviewModal = ({ isOpen, onClose, quizId }) => {
  const [quizData, setQuizData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

  useEffect(() => {
    if (isOpen && quizId) {
      fetchQuizDetails();
    }
  }, [isOpen, quizId]);

  const fetchQuizDetails = async () => {
    setLoading(true);
    try {
      const result = await getQuizDetails(quizId);
      if (result.success) {
        setQuizData(result.data);
        setCurrentQuestionIndex(0);
      }
    } catch (error) {
      console.error("Error fetching quiz details:", error);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const getScoreColor = (score) => {
    if (score >= 80) return "text-green-600";
    if (score >= 60) return "text-yellow-600";
    return "text-red-600";
  };

  const getScoreBadgeVariant = (score) => {
    if (score >= 80) return "default";
    if (score >= 60) return "secondary";
    return "destructive";
  };

  const nextQuestion = () => {
    if (currentQuestionIndex < quizData.questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };

  const prevQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  if (loading) {
    return (
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="max-w-4xl max-h-[90vh]">
          <div className="flex items-center justify-center py-12">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
          </div>
        </DialogContent>
      </Dialog>
    );
  }

  if (!quizData) return null;

  const currentQuestion = quizData.questions[currentQuestionIndex];

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="w-[1400px] max-h-[90vh] p-0 flex flex-col">
        {/* Header (fixed at top) */}
        <DialogHeader className="p-6 pb-4 border-b flex-shrink-0">
          <DialogTitle className="text-2xl font-bold">Quiz Review</DialogTitle>
          <div className="flex items-center justify-between mt-4">
            <div className="flex items-center space-x-4">
              <Badge variant="outline">{quizData.category}</Badge>
            </div>
            <Badge
              variant={getScoreBadgeVariant(quizData.score)}
              className="text-lg px-3 py-1"
            >
              {quizData.score.toFixed(1)}
            </Badge>
          </div>
        </DialogHeader>

        {/* Scrollable content */}
        <ScrollArea className="flex-1 overflow-y-auto">
          {/* Quiz Summary */}
          <div className="p-6 border-b bg-muted/30">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="flex items-center space-x-3">
                <div className="flex items-center justify-center w-10 h-10 rounded-full bg-primary/10">
                  <Award className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Final Score</p>
                  <p className="font-semibold text-lg">
                    {quizData.score.toFixed(1)}
                  </p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <div className="flex items-center justify-center w-10 h-10 rounded-full bg-green-100">
                  <CheckCircle className="h-5 w-5 text-green-600" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Correct</p>
                  <p className="font-semibold text-lg">
                    {quizData.correctAnswers}/{quizData.totalQuestions}
                  </p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <div className="flex items-center justify-center w-10 h-10 rounded-full bg-blue-100">
                  <BookOpen className="h-5 w-5 text-blue-600" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Questions</p>
                  <p className="font-semibold text-lg">
                    {quizData.totalQuestions}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Question Navigation */}
          <div className="p-6 border-b bg-background">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold">
                Question {currentQuestionIndex + 1} of{" "}
                {quizData.questions.length}
              </h3>
              <div className="flex items-center space-x-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={prevQuestion}
                  disabled={currentQuestionIndex === 0}
                >
                  <ChevronLeft className="h-4 w-4 mr-1" />
                  Previous
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={nextQuestion}
                  disabled={
                    currentQuestionIndex === quizData.questions.length - 1
                  }
                >
                  Next
                  <ChevronRight className="h-4 w-4 ml-1" />
                </Button>
              </div>
            </div>

            {/* Progress Bar */}
            <div className="w-full bg-muted rounded-full h-2">
              <div
                className="bg-primary h-2 rounded-full transition-all duration-300"
                style={{
                  width: `${
                    ((currentQuestionIndex + 1) / quizData.questions.length) *
                    100
                  }`,
                }}
              ></div>
            </div>
          </div>

          {/* Question Content */}
          <div className="p-6 bg-background">
            {currentQuestion && (
              <div className="space-y-6">
                {/* Question */}
                <Card className="border-border shadow-sm">
                  <CardHeader className="pb-4">
                    <CardTitle className="text-lg font-semibold leading-relaxed">
                      {currentQuestion.question}
                    </CardTitle>
                  </CardHeader>
                </Card>

                {/* User Answer vs Correct Answer */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {/* User Answer */}
                  <Card
                    className={`border-2 shadow-sm ${
                      currentQuestion.isCorrect
                        ? "border-green-200 bg-green-50/50 dark:bg-green-950/20"
                        : "border-red-200 bg-red-50/50 dark:bg-red-950/20"
                    }`}
                  >
                    <CardHeader className="pb-3">
                      <div className="flex items-center space-x-2">
                        {currentQuestion.isCorrect ? (
                          <CheckCircle className="h-5 w-5 text-green-600" />
                        ) : (
                          <XCircle className="h-5 w-5 text-red-600" />
                        )}
                        <CardTitle className="text-sm font-medium text-foreground">
                          Your Answer
                        </CardTitle>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm leading-relaxed text-foreground">
                        {currentQuestion.userAnswer}
                      </p>
                    </CardContent>
                  </Card>

                  {/* Correct Answer */}
                  <Card className="border-2 border-green-200 bg-green-50/50 dark:bg-green-950/20 shadow-sm">
                    <CardHeader className="pb-3">
                      <div className="flex items-center space-x-2">
                        <CheckCircle className="h-5 w-5 text-green-600" />
                        <CardTitle className="text-sm font-medium text-foreground">
                          Correct Answer
                        </CardTitle>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm leading-relaxed text-foreground">
                        {currentQuestion.correctAnswer}
                      </p>
                    </CardContent>
                  </Card>
                </div>

                {/* Explanation */}
                {currentQuestion.explanation && (
                  <Card className="border-2 border-blue-200 bg-blue-50/50 dark:bg-blue-950/20 shadow-sm">
                    <CardHeader className="pb-3">
                      <div className="flex items-center space-x-2">
                        <Lightbulb className="h-5 w-5 text-blue-600" />
                        <CardTitle className="text-sm font-medium text-foreground">
                          Explanation
                        </CardTitle>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm leading-relaxed text-blue-800 dark:text-blue-200">
                        {currentQuestion.explanation}
                      </p>
                    </CardContent>
                  </Card>
                )}
              </div>
            )}
          </div>

          {/* Improvement Tip */}
          {quizData.improvementTip && (
            <div className="p-6 border-t bg-muted/30">
              <Card className="border-2 border-amber-200 bg-amber-50/50 dark:bg-amber-950/20 shadow-sm">
                <CardHeader className="pb-3">
                  <div className="flex items-center space-x-2">
                    <Lightbulb className="h-5 w-5 text-amber-600" />
                    <CardTitle className="text-sm font-medium text-foreground">
                      Improvement Tip
                    </CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm leading-relaxed text-amber-800 dark:text-amber-200">
                    {quizData.improvementTip}
                  </p>
                </CardContent>
              </Card>
            </div>
          )}
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
};

export default QuizReviewModal;
