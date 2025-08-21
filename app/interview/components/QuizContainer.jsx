"use client"

import { useState } from 'react'
import QuestionCard from './QuestionCard'
import ResultScreen from './ResultScreen'

const QuizContainer = ({ questions, onSaveResults }) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [userAnswers, setUserAnswers] = useState([])
  const [selectedAnswer, setSelectedAnswer] = useState('')
  const [showExplanation, setShowExplanation] = useState(false)
  const [quizCompleted, setQuizCompleted] = useState(false)
  const [score, setScore] = useState(0)

  const currentQuestion = questions[currentQuestionIndex]
  const totalQuestions = questions.length

  const handleAnswerSelect = (answer) => {
    setSelectedAnswer(answer)
    setShowExplanation(false)
  }

  const handleShowExplanation = () => {
    setShowExplanation(!showExplanation)
  }

  const handleNext = () => {
    // Store the current answer
    const answerData = {
      question: currentQuestion.question,
      options: currentQuestion.options,
      correctAnswer: currentQuestion.correctAnswer,
      explanation: currentQuestion.explanation,
      userAnswer: selectedAnswer
    }

    const newUserAnswers = [...userAnswers, answerData]
    setUserAnswers(newUserAnswers)

    // Reset for next question
    setSelectedAnswer('')
    setShowExplanation(false)
    setCurrentQuestionIndex(currentQuestionIndex + 1)
  }

  const handleFinish = async () => {
    // Store the final answer
    const answerData = {
      question: currentQuestion.question,
      options: currentQuestion.options,
      correctAnswer: currentQuestion.correctAnswer,
      explanation: currentQuestion.explanation,
      userAnswer: selectedAnswer
    }

    const finalUserAnswers = [...userAnswers, answerData]
    setUserAnswers(finalUserAnswers)

    // Calculate score
    const finalScore = finalUserAnswers.reduce((acc, answer) => {
      return acc + (answer.userAnswer === answer.correctAnswer ? 1 : 0)
    }, 0)

    setScore(finalScore)
    setQuizCompleted(true)

    // Save to database
    try {
      await onSaveResults({
        quizScore: finalScore,
        questions: finalUserAnswers
      })
    } catch (error) {
      console.error('Error saving results:', error)
    }
  }

  const handleRestart = () => {
    setCurrentQuestionIndex(0)
    setUserAnswers([])
    setSelectedAnswer('')
    setShowExplanation(false)
    setQuizCompleted(false)
    setScore(0)
  }

  if (quizCompleted) {
    return (
      <ResultScreen
        userAnswers={userAnswers}
        score={score}
        totalQuestions={totalQuestions}
        onRestart={handleRestart}
      />
    )
  }

  return (
    <QuestionCard
      question={currentQuestion}
      currentQuestion={currentQuestionIndex}
      totalQuestions={totalQuestions}
      selectedAnswer={selectedAnswer}
      onAnswerSelect={handleAnswerSelect}
      onNext={handleNext}
      onFinish={handleFinish}
      showExplanation={showExplanation}
      onShowExplanation={handleShowExplanation}
    />
  )
}

export default QuizContainer
