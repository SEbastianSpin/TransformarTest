
import './App.css';
import firebase from './firebase.js'; // <--- add this line
import Sender from "./pages/Sender"
import Simulador from "./pages/Simulador"
import { MathJax, MathJaxContext } from "better-react-mathjax";




function App() {
  return (
  <MathJaxContext>
    <div>
      <Sender/>
    </div>
</MathJaxContext> 
  );
}

export default App;
