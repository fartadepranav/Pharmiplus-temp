import React,{useState,useEffect} from 'react';
import Cards from './cards';
import {CardDeck} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';

const Orders = () =>
{
    
    const [ord,addord] = useState([]);
    const [orders, upord] = useState(ord);
    const [disp2, toggle2] = useState("none");

    useEffect(()=>{
        axios.get('http://localhost:5000/api/orders')
        .then((res)=>{
            res.data.map((item)=>{
                ord.push(item);
            })
            console.log('once');
            addord(ord)
            upord(ord);
        })
        .catch(function (error) {
            // handle error
            console.log(error);
          });
        },[ord]);

        document.body.addEventListener('click',()=>{
            toggle2("block");
        })

    return(
        <div className='container-fluid'>
            <div className='bgActive'><h1>Your Orders </h1></div>
            <CardDeck key={orders} style={{padding:'50px',margin:'50px',width:'100%',display:'block',marginTop:'0',marginLeft:'0'}}>
            {orders.map((ord)=>
                <Cards order = {ord} ></Cards>                             
            )} 
        </CardDeck>
        </div>
    );
}



export default Orders; 