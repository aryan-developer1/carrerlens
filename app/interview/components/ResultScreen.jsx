"use client"

import { Trophy, CheckCircle, XCircle } from 'lucide-react'

const ResultScreen = ({ userAnswers, score, totalQuestions, onRestart }) => {
  const percentage = Math.round((score / totalQuestions) * 100)

  return (
    <div className="max-w-4xl mx-auto">
      {/* Header */}
      <div className="text-center mb-8">
        <div className="flex items-center justify-center gap-2 mb-4">
          <Trophy className="text-yellow-500" size={32} />
          <h2 className="text-3xl font-bold text-white">Quiz Results</h2>
        </div>
        <div className="text-6xl font-bold text-white mb-2">{percentage}%</div>
        <p className="text-gray-400 text-lg">
          You scored {score} out of {totalQuestions} questions correctly
        </p>
      </div>

      {/* Improvement Tip */}
      <div className="bg-gray-800 rounded-lg p-6 mb-8 border border-gray-700">
        <h3 className="text-white font-semibold mb-2">💡 Improvement Tip:</h3>
        <p className="text-gray-300 text-sm leading-relaxed">
          Focus on mastering asynchronous JavaScript patterns like Promises and 'async/await', and deepen your understanding of HTTP methods and their appropriate uses in RESTful APIs. 
          Consistent practice with these concepts will significantly improve your coding skills.
        </p>
      </div>

      {/* Question Review */}
      <div className="mb-8">
        <h3 className="text-white text-xl font-semibold mb-4">Question Review</h3>
        <div className="space-y-4">
          {userAnswers.map((answer, index) => {
            const isCorrect = answer.userAnswer === answer.correctAnswer
            return (
              <div key={index} className="bg-gray-900 rounded-lg p-6 border border-gray-800">
                <div className="flex items-start gap-3 mb-4">
                  {isCorrect ? (
                    <CheckCircle className="text-green-500 mt-1" size={20} />
                  ) : (
                    <XCircle className="text-red-500 mt-1" size={20} />
                  )}
                  <div className="flex-1">
                    <p className="text-white font-medium mb-2">
                      {answer.question}
                    </p>
                    <div className="space-y-2 text-sm">
                      <p className="text-gray-300">
                        <span className="text-gray-400">Your answer:</span> {answer.userAnswer || 'Not answered'}
                      </p>
                      <p className="text-green-400">
                        <span className="text-gray-400">Correct answer:</span> {answer.correctAnswer}
                      </p>
                    </div>
                  </div>
                </div>
                
                {/* Explanation */}
                <div className="bg-gray-800 rounded-lg p-4 border border-gray-700">
                  <h4 className="text-white font-medium mb-2">Explanation:</h4>
                  <p className="text-gray-300 text-sm leading-relaxed">
                    {answer.explanation}
                  </p>
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {/* Restart Button */}
      <div className="text-center">
        <button
          onClick={onRestart}
          className="bg-white text-black px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
        >
          Take Another Quiz
        </button>
      </div>
    </div>
  )
}

export default ResultScreen
