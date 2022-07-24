import '../App.css';

import { MathJax } from "better-react-mathjax";

function QuestionField({text}){

    return(
        
            <div className="question">
            <MathJax>
                {text}
            </MathJax>
             
            </div>      
      
        
    )


}


export default QuestionField;