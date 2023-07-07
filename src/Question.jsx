import React from 'react'
import Option from './Option'

export default function Question({questionObj, answersShown, selectAnswer}) {

  function handleClick(answer) {
    selectAnswer(questionObj.question, answer)
  }

  return (
    <div className='question'>
        <h3>{questionObj.question}</h3>
        <div className='options-container'>
            {questionObj.options.map(option =>(
            <Option 
                key={option}
                value={option} 
                onClick={handleClick} 
                answersShown={answersShown}
                isSelected={questionObj.userAnswer === option}
                isCorrect={questionObj.correctAnswer === option}
            />))}
        </div>
    </div>
  )
}
