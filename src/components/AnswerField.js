import '../App.css';

import { MathJax } from "better-react-mathjax";

function AnswerField({text}){

    return(
       
        <MathJax>
            {text}
        </MathJax>
        
        
    )


}


export default AnswerField;