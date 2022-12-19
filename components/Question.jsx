import React from "react"

export default function Question(props){
    

    function getAnswerClass(answer){

        if(props.submitted)
        {
         if(answer.isCorrect){
            return("correct-answer")
        }else if(answer.isClicked){
            return("wrong-answer")
        }
        }
        if(answer.isClicked){
            return("possible-answer")
        }else{
            return("not-clicked-answer")
        }

    }
    

    const processedAnswers = props.answers.map((el)=>{
        return (<p className={getAnswerClass(el)} key={el.index}
         onClick={()=> props.clickFun(el.value,props.row)}> {el.value}</p>)
    })


    console.log(props.answers)
    

    return(
        
        <div>
            <h1 className="question">{props.question}</h1>
            <div className="answers">
                {processedAnswers}         
            </div>
            <hr></hr>
        </div>
        
        
        
    )
    
    
}