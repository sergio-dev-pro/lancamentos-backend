import React, {useState, useEffect} from "react";
import Button from '@material-ui/core/Button';
import Home from "./components/Home";
import Despesas from "./components/Despesas";


import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link, 
  Redirect,
  useRouteMatch,
  useParams
} from "react-router-dom";

function mudarBackBody(isHome){
  isHome ? document.getElementById('bodyId').style.backgroundColor = "#607d8b"  : document.getElementById('bodyId').style.backgroundColor = "white"
  console.log("ok");
}

export default function App() {

  const [homeState, setHomeState] = useState(true);
  const [buttomTrue, setButtomTrue] = useState({  
    color: "white ",
    fontSize:"1.3rem"
  });
  const [buttomFalse, setButtomFalse] = useState({
    color: "#616161",
    fontSize:"1.3rem"
  });


  useEffect(() => {
    if(window.location.href == "http://localhost:3000/despesas") {
      setHomeState(false)
       mudarBackBody(false)
      }
    
  }, []);

  const handleHomeState = () => {
    
    setHomeState(false);
    mudarBackBody(false);
    
  }
  
  return (

    <Router>
      <div>
      <header style={{ height: "40px", width:"100%",margin: "0 auto", alignItems:"center"}}>

      <div style={{float:"left", marginLeft:"10px"}}>
      <Link to="/" >
        <Button href="#text-buttons" color="primary">
        <strong style={homeState ? buttomTrue : buttomFalse} onClick={()=> {
          setHomeState(true)
          mudarBackBody(true); 
        } 
         }>Home</strong>
        </Button> 
        </Link>
        
      </div > 
      
      </header>
      
      <div className="container" style={{ width: "80%"}}>

        <Switch>
          <Route exact path="/">
            {homeState ? <Home onHomeState={handleHomeState} />  :  <Redirect to="/despesas" />}
          </Route>
          <Route path="/despesas">
         <Despesas/>
          </Route>
        </Switch>
      </div>
      </div>
    </Router>
  );
}

