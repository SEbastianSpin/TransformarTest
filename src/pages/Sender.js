import { useState } from 'react';
import {db,storage,auth,ui,uiConfig,signOut} from '../firebase.js'; 
import { collection, addDoc } from "firebase/firestore"; 
import { uploadBytesResumable, ref  } from "firebase/storage";
import { MathJax } from "better-react-mathjax";
import QuestionField from '../components/QuestionField.js';
import AnswerField from '../components/AnswerField.js';
import Navi from '../components/Navi.js';
import './sender.css';

function Sender(){

  const [test, setQuestion] = useState({
    question:"",
  });

  const [answers, setAnswers] = useState([{},{},{},{}]);

  const [category, setCategory] = useState("");
  const [topic, setTopic] = useState("");

  const [imagen, setImagen] = useState(null);

   function onFileChange(e){
    setImagen(e.target.files[0]);
   }

    function handleQuestion (e){
      let updatedValue =  {"question":e.target.value};
      setQuestion(updatedValue);
      console.log(test);
    }

    async function handleUpload (e){
      console.log("o");
      console.log(imagen);

      e.preventDefault();
      const storageRef = ref(storage, `/TestImages/${imagen.name}`);

      const uploadTask = uploadBytesResumable(storageRef, imagen);

      uploadTask.on(
        "state_changed",
        (snapshot) => {
          console.log('Uploaded a blob or file!');
        },
        (err) => console.log(err));

      
    }

    function addAnswer (e){
      console.log(e.target.name);
      switch(e.target.name){
        case"ans1":
          console.log("0");
          setAnswers([{"answer":e.target.value, "correct":true},answers[1],answers[2],answers[3]]);
          break;
        case "ans2":
          console.log("1");
          setAnswers([answers[0],{"answer":e.target.value, "correct":false},answers[2],answers[3]]);
          break;
        case "ans3":
          console.log("2");
          setAnswers([answers[0],answers[1],{"answer":e.target.value, "correct":false},answers[3]]);
          break;
        case "ans4":
          console.log("3");
          setAnswers([answers[0],answers[1],answers[2],{"answer":e.target.value, "correct":false}]);
          break;
      }
      console.log(answers);
    }

    async function handleSubmit(ev){
        ev.preventDefault();
        try {
            const docRef = await addDoc(collection(db, "questions"), {
              question: test.question,
              answers: answers,
              creation: Date.now(),
              category:category,
              topic:topic,
              dificulty:0
            });
            
          } catch (e) {
            console.error("Error adding document: ", e);
          }
          setAnswers([{},{},{},{}]);
          setCategory("");
          setTopic("");
          setQuestion({
            question:"",
          });
    }
    
    
    return(
      <div>
      <Navi/>
      
      <div className='testFactory'>
      
      

      <div className='testProducer'>

      <form onSubmit={handleSubmit}>
           <textarea  className='questionProducer' name="question"  value={test.question} onChange={handleQuestion}/>
           <div>
          

           <textarea name="ans1" className='answerProducer'  onChange={addAnswer}/>
           

           <textarea name="ans2" className='answerProducer'  onChange={addAnswer}/>
           

           <textarea  name="ans3"className='answerProducer'  onChange={addAnswer}/>

           

           <textarea name="ans4" className='answerProducer'  onChange={addAnswer} />

           <select name="topics" id="topic"  onChange={(e)=>{
            setCategory(e.target.value);
            console.log(category);
           }}>
           <optgroup label="Razonamiento Lógico">
              <option value="verbalSeries">Series verbales</option>
              <option value="numaricalSeries">Series numéricas</option> 
              <option value="patterns">Identificar patrones</option>
              <option value="relationsAndOrder">Ordenamiento y relación</option>
            </optgroup>
            <optgroup label="Razonamiento Numérico">
              <option value="checking">Comprobación</option>
              <option value="symbols">Manejo de símbolos</option> 
              <option value="equations">Razonamiento numérico aplicado a ecuaciones simples</option>
              <option value="mathProblems">Comprensión y análisis de problemas matemáticos</option>
              <option value="relations">Relaciones numéricas</option>
            </optgroup>
            <optgroup label="Razonamiento Verbal">
              <option value="categories">Categorización</option>
              <option value="analogies">Analogías</option> 
              <option value="inference">Inferencias</option>
              <option value="sayings">Comprensión de refranes</option>
              <option value="sinonims">Sinónimos</option>
            </optgroup>
            <optgroup label="Atención y Concentración">
              <option value="visualPerception">Percepción visual</option>
              <option value="visualDiferences">Discriminación visual</option> 
              <option value="similitudes">Busco similar</option>
              <option value="visualMemory">Memoria visual</option>
              <option value="rapid">Rapidez y Exactitud perceptiva</option>
            </optgroup>

          </select>
          <select name="category" id="categ" onChange={(e)=>{
            setTopic(e.target.value);
          }}>
            <option value="Logic">Razonamiento Lógico</option>
            <option value="Numeric">Razonamiento Numérico</option>
            <option value="verbal">Razonamiento Verbal</option>
            <option value="attention">Atención y Concentración</option>
          </select>
          <input type="number"  placeholder='Dificulty' min="0" max="3" />
          <input type="submit" value="Submit"/>

           </div>
        </form>
         <p>H</p>
        <input type="file"  onChange={onFileChange} accept="image/*"/>
            <button onClick={handleUpload}>
                  Upload!
            </button>
        
      </div>
           

        <div className='testCheck'>

        <QuestionField text={test.question}/>

        <AnswerField text={answers[0].answer}/>

        <AnswerField text={answers[1].answer}/>
        <AnswerField text={answers[2].answer}/>

        <AnswerField text={answers[3].answer}/>


        </div>
         
           

      </div>
      </div>
       
    );
}

export default Sender;