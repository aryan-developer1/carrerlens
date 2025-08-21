"use server"

import db from "@/lib/prisma"
import { currentUser } from "@clerk/nextjs/server"

export async function getUserAssessmentData() {
  try {
    const user = await currentUser()
    if (!user) {
      throw new Error("User not authenticated")
    }

    // Get user from database
    const dbUser = await db.user.findUnique({
      where: { clerkId: user.id },
      include: {
        assessments: {
          orderBy: { createdAt: 'desc' }
        }
      }
    })

    if (!dbUser) {
      throw new Error("User not found")
    }

    const assessments = dbUser.assessments

    // Calculate statistics
    const totalQuestions = assessments.reduce((total, assessment) => {
      return total + (assessment.questions ? assessment.questions.length : 0)
    }, 0)

    const validScores = assessments.filter(a => a.quizScore !== null).map(a => a.quizScore)
    const averageScore = validScores.length > 0 
      ? validScores.reduce((sum, score) => sum + score, 0) / validScores.length 
      : 0

    const latestScore = assessments.length > 0 && assessments[0].quizScore !== null 
      ? assessments[0].quizScore 
      : 0

    // Get recent quizzes (last 10)
    const recentQuizzes = assessments.slice(0, 10).map(assessment => ({
      id: assessment.id,
      score: assessment.quizScore || 0,
      category: assessment.category,
      createdAt: assessment.createdAt,
      totalQuestions: assessment.questions ? assessment.questions.length : 0,
      correctAnswers: assessment.questions 
        ? assessment.questions.filter(q => q.isCorrect).length 
        : 0
    }))

    return {
      success: true,
      data: {
        averageScore: Math.round(averageScore * 100) / 100,
        totalQuestions,
        latestScore: Math.round(latestScore * 100) / 100,
        recentQuizzes
      }
    }
  } catch (error) {
    console.error("Error fetching user assessment data:", error)
    return {
      success: false,
      error: error.message
    }
  }
}

export async function getQuizDetails(quizId) {
  try {
    const user = await currentUser()
    if (!user) {
      throw new Error("User not authenticated")
    }

    // Get user from database to verify ownership
    const dbUser = await db.user.findUnique({
      where: { clerkId: user.id }
    })

    if (!dbUser) {
      throw new Error("User not found")
    }

    // Get detailed quiz data
    const quiz = await db.assessments.findFirst({
      where: {
        id: quizId,
        userId: dbUser.id
      }
    })

    if (!quiz) {
      throw new Error("Quiz not found or access denied")
    }

    return {
      success: true,
      data: {
        id: quiz.id,
        score: quiz.quizScore || 0,
        category: quiz.category,
        createdAt: quiz.createdAt,
        improvementTip: quiz.improvementTip,
        questions: quiz.questions || [],
        totalQuestions: quiz.questions ? quiz.questions.length : 0,
        correctAnswers: quiz.questions 
          ? quiz.questions.filter(q => q.isCorrect).length 
          : 0
      }
    }
  } catch (error) {
    console.error("Error fetching quiz details:", error)
    return {
      success: false,
      error: error.message
    }
  }
}
