import React from "react"

import Question from "./Question"

function shuffle(array) {
  let currentIndex = array.length,  randomIndex;

  while (currentIndex != 0) {

    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex], array[currentIndex]];
  }

  return array;
}





export default function QuizPage(){
    
    const [questions,setQuestions] = React.useState([])
    const [submitted,setSubmitted] = React.useState(false)
    const [answersArray,setAnswersArray] = React.useState([])
    const [isSetUp,setIsSetUp] = React.useState(false)



    React.useEffect(() => {
    fetch("https://opentdb.com/api.php?amount=5&type=multiple")
    .then(response => response.json())
    .then(data => {
        setQuestions(data.results)
        setIsSetUp(true)
    })
    },[])


    function proccessQuestions(){

        let myallAnswers = []
        const renderedQuestions = questions.map((el)=>
        {
            const answers = [{value:el.correct_answer,id:0,isClicked:false,isCorrect:true}]
        
            for(let i = 0; i< 3; i++){
                answers.push({value:el.incorrect_answers[i],index:i+1,isClicked:false,isCorrect:false})
            }
            
            shuffle(answers)

            const question = {
                question:el.question,
                answers:answers,
                gotCorrect:""
            }

            myallAnswers.push(question)           
            
        })


        return (myallAnswers)

    }

    React.useEffect(() => {
        setAnswersArray(proccessQuestions())
        },[isSetUp])


    function renderQuestions(myquestions){

        let rowNum = -1
        const renderedQuestions = myquestions.map((el)=>
        {
            rowNum ++        
            return(<Question question={el.question} 
            answers={el.answers}
            clickFun={onAnswerClick}
            row = {rowNum}

            submitted ={submitted}
            />)
            
        })


        return  renderedQuestions

    }

    const renderedQuestions = renderQuestions(answersArray)
    
    function onAnswerClick(value,row)
    {
    
        if(submitted === false)
        {

            setAnswersArray((oldArray)=>
            {

                const newArray = oldArray.map((el)=>{

                    if(oldArray.indexOf(el) === row){
                        for(let i =0;i<el.answers.length;i++){
                            if(el.answers[i].value === value){
                                el.answers[i].isClicked = true
                            }
                            else{
                                el.answers[i].isClicked = false
                            }

                        }
                    }

                    return el
                })
                return newArray
            })
        }
    }


    function onSumbitClick(){
        setSubmitted(true)
    }

    function setUp(){

        fetch("https://opentdb.com/api.php?amount=5&type=multiple")
        .then(response => response.json())
        .then(data => {
            setQuestions(data.results)
            setIsSetUp(false)
            setIsSetUp(true)

        })

        setSubmitted(false)
    }


    return(
        
        <div className="quiz-page">
            {renderedQuestions}
            {submitted ? <button onClick={setUp} className="submit-play-btn">play again</button> : <button onClick={onSumbitClick} className="submit-play-btn">submit</button>}
        </div>    
    )
    
    
}