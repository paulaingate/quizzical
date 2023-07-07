import React from 'react'
/**
    value={option} 
    onClick={handleClick} 
    answersShown={answersShown}
    isSelected={questionObj.userAnswer === option}
    isCorrect={questionObj.correctAnswer === option}
 */
export default function Option(props) {
    let backgroundColor
    if (props.isSelected && !props.answersShown) { //selected
        backgroundColor = '#D6DBF5'
    } else if (props.answersShown && props.isCorrect) { //shown and correct
        backgroundColor = '#94D7A2'
    } else if (props.answersShown && !props.isCorrect && props.isSelected) { //selected and incorrect
        backgroundColor = '#F8BCBC'
    } else  {
        backgroundColor = 'transparent' //not selected
    }


    const styles = {
        backgroundColor: backgroundColor,
        borderColor: props.isSelected || (props.isCorrect && props.answersShown) ? 'transparent' : '#4D5B9E' ,
        opacity: !props.answersShown || props.isCorrect ? 1 : 0.5,
    }

    return (
        <div style={styles} className='option' onClick={() => {!props.answersShown && props.onClick(props.value)}}>
        <p>{props.value}</p>
        </div>
    )
}
