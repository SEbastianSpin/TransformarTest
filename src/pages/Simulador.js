import QuestionField from "../components/QuestionField";
import AnswerField from "../components/AnswerField";
import { doc, getDoc } from "firebase/firestore";
import {db} from '../firebase.js'; 
import { useState } from "react";
import { MathJax, MathJaxContext } from "better-react-mathjax";


function Simulador(){

    const [question,setQuestion] = useState("");
    const [answers,setAnswers] = useState(["","","",""]);

    async function getQuestion(){
        const docRef = doc(db, "questions" ,"bHk4cR0kAwic9Ebskvu2");
        const docSnap = await getDoc(docRef);
        
        if (docSnap.exists()) {
          const test= docSnap.data();
          console.log(test);
          setQuestion(test.question);
          setAnswers(test.answers)
        } else {
          // doc.data() will be undefined in this case
          console.log("No such document!");
        }

    }


    return(
        <div>
            <QuestionField text={question}/>
            <MathJax>
           {question}
            </MathJax>

            <MathJax>
           {answers[0].answer}
            </MathJax>
            <MathJax>
            {"Does it work \\(\\frac{10}{4x} \\approx 2^{12}\\)"}
            </MathJax> 
            {/* <AnswerField text={answers[0].answer}/>
            <AnswerField text={answers[1].answer}/>
            <AnswerField text={answers[2].answer}/>
            <AnswerField text={answers[3].answer}/> */}
            <button onClick={getQuestion}></button>
        </div>
    )
}

export default Simulador;