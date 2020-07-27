import React from 'react';
import Button from '@material-ui/core/Button';
import Icon from '@material-ui/core/Icon';
import {
  BrowserRouter as Router,
  Link
} from "react-router-dom";

export default function Home({onHomeState}) {

  const handleEntrar = () => {
    
    onHomeState();
  }

    return (
      <Router>
      <div style={{width:"80%", height:"100%",  margin:"0 auto", paddingTop:"10%", color:"#eceff1"}} >
      <p style={{fontSize:"2rem"}}><strong>Organize suas despesas de forma rapida e pratica online,  Entre e confira. </strong>
      </p>  
      
      <Link to="/despesas" >
       <Button
       size="large"
        variant="contained"
        color="primary"
        endIcon={<Icon>send</Icon>}
        onClick={handleEntrar}
      >
        <strong>ENTRAR</strong>
      </Button>
      </Link>
    </div>
      </Router>

    )
}


/*4
<div className="carousel carousel-slider center">
    <div className="carousel-fixed-item center">
      <a className="btn waves-effect white grey-text darken-text-2">button</a>
    </div>
    <div className="carousel-item red white-text" href="#one!">
      <h2>First Panel</h2>
      <p className="white-text">This is your first panel</p>
    </div>
    <div className="carousel-item amber white-text" href="#two!">
      <h2>Second Panel</h2>
      <p className="white-text">This is your second panel</p>
    </div>
    <div className="carousel-item green white-text" href="#three!">
      <h2>Third Panel</h2>
      <p className="white-text">This is your third panel</p>
    </div>
    <div className="carousel-item blue white-text" href="#four!">
      <h2>Fourth Panel</h2>
      <p className="white-text">This is your fourth panel</p>
    </div>
  </div>
   */