
import {auth,ui,uiConfig,signOut} from '../firebase.js'; 

function Navi(){

    function signIn(){
        if (auth.currentUser) {
          // User is signed in; allows user to sign out
          signOut(auth);
        } else {
          // No user is signed in; allows user to sign in
          ui.start('#firebaseui-auth-container', uiConfig);
        }
      }

    return(
        <nav>
        <button>
        Ejercicios
        </button>
        <button>
        Simulador
        </button>
        <button onClick={signIn} >
          Ingresa
        </button>
        <div id="firebaseui-auth-container">
        </div>
        </nav>
        
    );
}
 export default Navi;