
import React,{useState,useEffect} from 'react';
import {Card,Button} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import * as FaIcons from 'react-icons/fa';
import {Link,useHistory} from 'react-router-dom';



const Cards = (props)=>{
    let today = Date.now().valueOf();
    let date = new Date(props.product.date).valueOf();
    const [diff] = useState(today-date)
    const [vis1,setVis1] = useState("none");
    const [vis,setVis] = useState("block");
    const [p,setP] = useState(0);
    useEffect(() => {
        if(diff<1296000000){
            setVis1("block");
            setVis("none");
            setP(parseFloat(props.product.price))
            props.edit(props.product.name);
        }     
    }, [])

    const history = useHistory();
    const handleClick = () => history.push(props.link);
    
    return(
        
        <Card className = "card text-center border-primary mb-3" style={{ maxWidth: '18rem',minWidth:'20rem',margin:'10px',display:vis1}} onClick={handleClick}>
            <Card.Img variant="top" src={props.product.image} height="300px" width="300px"/>
            <Card.Body>
            <Card.Title>{props.product.name}</Card.Title>
            <Card.Text>
            Category : {props.product.category}<br/>
            Dosage: {props.product.dosage}<br/>
            Stock: {props.product.stock}<br/>
           <a style={{display:vis}}>Price: {props.product.price}<br/></a>
           <a style={{display:vis1}}>Price: <strike>{p}</strike> {props.product.price} </a>
           <br/> 
            </Card.Text>
            </Card.Body>
        </Card>
        
    );
    
}

export default Cards;