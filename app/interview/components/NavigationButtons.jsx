"use client"

import { Button } from '@/components/ui/button'

const NavigationButtons = ({ 
  currentQuestion, 
  totalQuestions, 
  onNext, 
  onFinish, 
  hasSelectedAnswer,
  showExplanation,
  onShowExplanation 
}) => {
  const isLastQuestion = currentQuestion === totalQuestions - 1

  return (
    <div className="flex justify-between items-center mt-6">
      <button
        onClick={onShowExplanation}
        className="text-gray-400 hover:text-white transition-colors"
      >
        Show Explanation
      </button>
      
      <Button
        onClick={isLastQuestion ? onFinish : onNext}
        disabled={!hasSelectedAnswer}
        className="bg-gray-600 hover:bg-gray-500 text-white px-6 py-2 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isLastQuestion ? 'Finish Quiz' : 'Next'}
      </Button>
    </div>
  )
}

export default NavigationButtons
