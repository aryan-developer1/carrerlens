"use client"

const OptionButton = ({ option, isSelected, onClick, disabled }) => {
  return (
    <button
      onClick={() => onClick(option)}
      disabled={disabled}
      className={`w-full text-left p-4 rounded-lg border transition-all duration-200 ${
        isSelected
          ? 'bg-white text-black border-white'
          : 'bg-transparent text-white border-gray-600 hover:border-gray-400'
      } ${disabled ? 'cursor-not-allowed opacity-50' : 'cursor-pointer'}`}
    >
      <div className="flex items-center gap-3">
        <div className={`w-4 h-4 rounded-full border-2 ${
          isSelected ? 'bg-black border-black' : 'border-gray-400'
        }`}>
          {isSelected && <div className="w-2 h-2 bg-white rounded-full m-0.5"></div>}
        </div>
        <span className="text-base">{option}</span>
      </div>
    </button>
  )
}

export default OptionButton
