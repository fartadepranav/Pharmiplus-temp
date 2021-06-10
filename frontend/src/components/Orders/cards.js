import React,{useEffect, useState} from 'react';
import {Card,Button} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import * as FaIcons from 'react-icons/fa';
import axios from 'axios';
import yes from './logo4.png';
import no from './cancel.jpg';

const Cards = (props)=>{

    const [isorder,setorder] = useState(false);
    const [sum,addSum] = useState("");
    let timestamp = new Date(props.order.date).valueOf();
    const today1 = Date.now().valueOf();
    const [diff,ChangeDiff] = useState(today1-timestamp);
    
    const[srcc,setsrcc] = useState(yes);
    const [vis,setvis] =useState('block');
    useEffect(() => {
        if(props.order.status==="cancelled")
        {
            addSum("true");
            setsrcc(no);
        }
        if(diff>=43200000)
        {
            addSum("true");
        }
        
        if(props.order.userID == localStorage.getItem('user'))
        {
           setvis("block");
        }
        else
        {
            setvis("none");
        }
    },[])


    return(
        <Card className = "card border-primary mb-5 " style={{ maxWidth:'1250px',margin:'50px',minWidth:'200px',padding:'10px', display :vis}}>
           {// <Card.Img variant="top" src={props.product.image} height="300px" width="300px"/> 
           }
            <div className=''>
                    <Card.Title style={{alignSelf:'left'}}>Order Id: <p style={{color:'gold'}}>{props.order._id}</p></Card.Title>
                    <p>Order details :</p>
                    <div className='d-flex justify-content-between'>
                    <img className="d-flex" src= {srcc} alt="Generic placeholder image" style={{maxHeight:"150px",maxWidth:'150px',paddingRight:'10px'}} />
                        <div>
                        <p style={{maxWidth:'500px'}}>
                            <Card.Text>
                                <ol style={{paddingLeft:'40px'}}>{props.order.product.map(text => (
                                <li>{text.name} &nbsp; X {text.quantity} &nbsp; qty</li>
                                ))}</ol>
                            Status: {props.order.status}<br/>
                            Date Ordered: {Date(props.order.date)} 
                            </Card.Text>
                        </p>
                    </div>
                    <div >
                         <Button variant="danger" disabled={sum} onClick={()=>{
                             axios.post('http://localhost:5000/api/orderupdate',{
                                 orderID : props.order._id
                             })
                         }}>Cancel Order &nbsp; <FaIcons.FaTrash/></Button>
                    </div>
                </div>
            </div>
        </Card>
    );
}

export default Cards;