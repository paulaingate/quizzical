import { useState, useEffect } from 'react'
import he from 'he'
import Question from './Question'
import './App.css'

function App() {
  const [started, setStarted] = useState(false)
  const [questions, setQuestions] = useState([])
  const [showAnswers, setShowAnswers] = useState(false)
  const [score, setScore] = useState(0)
  /**
   * this value will change when the restart game button is changed so that 
   * the useEffect will run again and get more questions
   */
  const [replay, setReplay] = useState(0) 
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    setLoading(true)
    fetch('https://opentdb.com/api.php?amount=5&type=multiple')
      .then(res => res.json())
      .then(data => setQuestions(data.results.map(item => {

        //put all answers in an array and shuffle them randomly
        const options = [...item.incorrect_answers, item.correct_answer]
          .map(value => ({ value, sort: Math.random() }))
          .sort((a, b) => a.sort - b.sort)
          .map(({ value }) => he.decode(value))

        return {
          question: he.decode(item.question),
          options: options,
          correctAnswer: he.decode(item.correct_answer),
          userAnswer: '' //answer that the user has picked
        }
      })))
      .catch(err => setError(err))
      .finally(() => setLoading(false))
  }, [replay])

  function playAgain() {
    setReplay(prev => prev + 1) //this will get new questions
    setShowAnswers(false)
  }

  function selectAnswer(question, answer) {
    setQuestions(prev => prev.map(q => {
      return q.question === question ? {...q, userAnswer: answer} : q
    }))
  }
  
  function checkAnswers() {
    setShowAnswers(true)
    setScore(questions.reduce((total, currentQuestion) => {
      return currentQuestion.correctAnswer === currentQuestion.userAnswer ?
          total + 1 : total
    }, 0))
  }

  const questionComponents = questions.map(q => (
    <Question 
      key={q.question} 
      questionObj={q}
      answersShown={showAnswers}
      selectAnswer={selectAnswer}
    />))

    if(loading) {
      return <h3>Loading...</h3>
    }

    if (error) {
      return <h3>There was an error.</h3>
    }
  
  return (
    <main>

       {!started || questions.length === 0 ? 
          <div className='start-container'>
            <h1>Quizzical</h1>
            <button onClick={() => setStarted(true)}>Start quiz</button>
          </div> 

          : <div>
              {questionComponents}
              {
                showAnswers ?
                <div className='score-container'>
                  <h4>You scored {score}/{questions.length} correct answers</h4>
                  <button onClick={playAgain}>Play again</button>
                </div>
                : <div className='score-container'><button onClick={checkAnswers}>Check answers</button></div>
              }
            </div>
        }
          
    </main>
  )
}

export default App
