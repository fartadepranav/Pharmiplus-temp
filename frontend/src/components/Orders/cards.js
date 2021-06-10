import React,{useEffect, useState} from 'react';
import {Card,Button} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import * as FaIcons from 'react-icons/fa';
import axios from 'axios';

const Cards = (props)=>{

    const [isorder,setorder] = useState(false);
    const [sum,addSum] = useState("");
    let timestamp = new Date(props.order.date).valueOf();
    const today1 = Date.now().valueOf();
    const [diff,ChangeDiff] = useState(today1-timestamp);
    
    const [vis,setvis] =useState('block');
    useEffect(() => {
        if(props.order.status==="cancelled")
        {
            addSum("true");
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
                    <img className="d-flex" src="data:image/svg+xml;charset=UTF-8,%3Csvg%20width%3D%2264%22%20height%3D%2264%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%2064%2064%22%20preserveAspectRatio%3D%22none%22%3E%3Cdefs%3E%3Cstyle%20type%3D%22text%2Fcss%22%3E%23holder_179ed892d8c%20text%20%7B%20fill%3Argba(255%2C255%2C255%2C.75)%3Bfont-weight%3Anormal%3Bfont-family%3AHelvetica%2C%20monospace%3Bfont-size%3A10pt%20%7D%20%3C%2Fstyle%3E%3C%2Fdefs%3E%3Cg%20id%3D%22holder_179ed892d8c%22%3E%3Crect%20width%3D%2264%22%20height%3D%2264%22%20fill%3D%22%23777%22%3E%3C%2Frect%3E%3Cg%3E%3Ctext%20x%3D%2213.8359375%22%20y%3D%2236.5609375%22%3E64x64%3C%2Ftext%3E%3C%2Fg%3E%3C%2Fg%3E%3C%2Fsvg%3E" alt="Generic placeholder image" style={{maxHeight:"150px",maxWidth:'150px',paddingRight:'10px'}} />
                        <div>
                        <p style={{maxWidth:'500px'}}>
                            <Card.Text>
                                <ol style={{paddingLeft:'40px'}}>{props.order.product.map(text => (
                                <li>{text.name} &nbsp; X {text.quantity} &nbsp; qty</li>
                                ))}</ol>
                            Status: {props.order.status}<br/>
                            Date: {diff} 
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