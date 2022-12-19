import React from "react"
import ReactDOM from "react-dom"
import QuizPage from "../components/QuizPage.jsx"
import StartPage from "../components/StartPage.jsx"

import styles from '../style.css'

export default function App(){
    
    const [start,setStart] = React.useState(false)
    
    function startQuiz(){
        setStart(true)
        
    }
    
    
    return(
        
        <div>
            {start ? <QuizPage/> : <StartPage startFun={startQuiz}/>}
        </div>
        
    )
    
}