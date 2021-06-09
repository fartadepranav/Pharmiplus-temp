import React from 'react';
import Cards from './cards';
import {CardDeck} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

const Orders = () =>
{
    const ord = [{
            id: "1",
            commodity : ["paracetamol", "dolo", "amoxicillin"],
            time : "12:34:00",
            date : "12/01/2021"
        },
        {
            id: "2",
            commodity : ["paracetamol", "dolo", "amoxicillin"],
            time : "12:34:00",
            date : "12/01/2021"
        }
    ]
    return(
        <div className='container-fluid'>
            <div className='bgActive'><h1>Your Orders </h1></div>
            <CardDeck style={{padding:'50px',margin:'50px',width:'100%',display:'block',marginTop:'0',marginLeft:'0'}}>
            {ord.map((ord)=>
                <Cards product = {ord} ></Cards> 
                            
            )} 
        </CardDeck>
        </div>
    );
}



export default Orders; 