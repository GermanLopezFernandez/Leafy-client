import React, {Component} from 'react'
import ticket from '../images/ticket.png'
import Button from "react-bootstrap/Button";

export default class Success extends Component{
render(){
    return(
        <div>
            <h1>Bienvenido a leafy</h1>
            <hr className="my-3"/>

        <img src={ticket} class="rounded mx-auto d-block" alt="..." width="250" />
           <div class="d-flex justify-content-center">
               <div class="mt-5">
               <Button href= "/join" size="lg"style={{backgroundColor:'#52d967',borderRadius:'15px',border:'none'}}> unirse a una casa </Button>
               </div>
            
           </div>
           <div class="d-flex justify-content-center" >
               <div class="mt-5">
               <Button href="/create" size="lg" style={{backgroundColor:'#048c73',borderRadius:'15px',border:'none'}}> Crear una casa </Button>
               </div>
           
            </div> 
            
        </div>

    )
}
}