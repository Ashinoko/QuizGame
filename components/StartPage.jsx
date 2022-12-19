import React from "react"


export default function StartPage(props){
    
    return(
        
        <div className="start-page">
        
            <h1 className="start-title">Quizzical </h1>
            <p className="start-desc"> Some description blabla</p>
            <button onClick={props.startFun} className="start-btn">start quiz</button>
        
        </div>
        
    )
    
}