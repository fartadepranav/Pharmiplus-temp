import React from 'react';
import {Card,Button} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import * as FaIcons from 'react-icons/fa';

const Cards = (props)=>{
    return(
        <Card className = "card border-primary mb-5 " style={{ maxWidth:'1250px',margin:'50px',minWidth:'200px'}}>
           {// <Card.Img variant="top" src={props.product.image} height="300px" width="300px"/> 
           }
            <div className='media'>
                <img className="mr-3 align-items-center" src="data:image/svg+xml;charset=UTF-8,%3Csvg%20width%3D%2264%22%20height%3D%2264%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%2064%2064%22%20preserveAspectRatio%3D%22none%22%3E%3Cdefs%3E%3Cstyle%20type%3D%22text%2Fcss%22%3E%23holder_179ed892d8c%20text%20%7B%20fill%3Argba(255%2C255%2C255%2C.75)%3Bfont-weight%3Anormal%3Bfont-family%3AHelvetica%2C%20monospace%3Bfont-size%3A10pt%20%7D%20%3C%2Fstyle%3E%3C%2Fdefs%3E%3Cg%20id%3D%22holder_179ed892d8c%22%3E%3Crect%20width%3D%2264%22%20height%3D%2264%22%20fill%3D%22%23777%22%3E%3C%2Frect%3E%3Cg%3E%3Ctext%20x%3D%2213.8359375%22%20y%3D%2236.5609375%22%3E64x64%3C%2Ftext%3E%3C%2Fg%3E%3C%2Fg%3E%3C%2Fsvg%3E" alt="Generic placeholder image" style={{maxHeight:"150px",maxWidth:'150px',paddingRight:'10px'}} />
                    <div className='media-body'>
                        <h5 class="mt-0"><Card.Title style={{alignSelf:'left'}}>{props.product.id}</Card.Title></h5>
                        <p>Order details :</p>
                        <div className='d-lg-flex justify-content-between'>
                            <div>
                        <p style={{maxWidth:'500px'}}>
                        <Card.Text>
                          <ol style={{paddingLeft:'40px'}}>{props.product.commodity.map(text => (
                             <li>{text}</li>
                          ))}</ol>
                         Time: {props.product.time}<br/>
                         Date: {props.product.date}<br/>
                        </Card.Text>
                        </p>
                            </div>
                            <div >
                             <Button variant="danger" >Cancel Order &nbsp; <FaIcons.FaTrash/></Button>
                            </div>
                        </div>
                    </div>
            </div>
        </Card>
    );
}

export default Cards;