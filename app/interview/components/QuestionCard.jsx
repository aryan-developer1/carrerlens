"use client"

import OptionButton from './OptionButton'
import NavigationButtons from './NavigationButtons'

const QuestionCard = ({ 
  question, 
  currentQuestion, 
  totalQuestions, 
  selectedAnswer, 
  onAnswerSelect, 
  onNext, 
  onFinish,
  showExplanation,
  onShowExplanation 
}) => {
  return (
    <div className="bg-gray-900 rounded-lg p-8 border border-gray-800 max-w-4xl mx-auto">
      {/* Question Header */}
      <div className="mb-6">
        <p className="text-gray-400 text-sm mb-2">
          Question {currentQuestion + 1} of {totalQuestions}
        </p>
        <h2 className="text-xl font-medium text-white leading-relaxed">
          {question.question}
        </h2>
      </div>

      {/* Options */}
      <div className="space-y-3 mb-6">
        {question.options.map((option, index) => (
          <OptionButton
            key={index}
            option={option}
            isSelected={selectedAnswer === option}
            onClick={onAnswerSelect}
            disabled={false}
          />
        ))}
      </div>

      {/* Show Explanation */}
      {showExplanation && (
        <div className="mb-6 p-4 bg-gray-800 rounded-lg border border-gray-700">
          <h3 className="text-white font-medium mb-2">Explanation:</h3>
          <p className="text-gray-300 text-sm leading-relaxed">
            {question.explanation}
          </p>
          <p className="text-green-400 text-sm mt-2">
            <strong>Correct Answer:</strong> {question.correctAnswer}
          </p>
        </div>
      )}

      {/* Navigation */}
      <NavigationButtons
        currentQuestion={currentQuestion}
        totalQuestions={totalQuestions}
        onNext={onNext}
        onFinish={onFinish}
        hasSelectedAnswer={!!selectedAnswer}
        showExplanation={showExplanation}
        onShowExplanation={onShowExplanation}
      />
    </div>
  )
}

export default QuestionCard
