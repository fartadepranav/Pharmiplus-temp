import React , {useEffect , useState } from 'react';
import Cards from './cards';
import {CardDeck,Button,Modal} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import * as FaIcons from 'react-icons/fa';
import * as Othericons from 'react-icons/hi';
import Carousel from 'react-bootstrap/Carousel'
import 'bootstrap/dist/css/bootstrap.min.css';
import { MdBrandingWatermark } from 'react-icons/md';
import offer from './offerBanner.png';
import offer2 from './offer-banner.jpg';
import offer3 from './comp_3step.jpg';
import {Link} from 'react-router-dom';
import axios from 'axios';

const Home =() =>
{

    const [prods,addProds] = useState([]);
    const [products, upProd] = useState(prods);
    const [lists, addlist] = useState([]);
    const [disp1, toggle1] = useState("none");
    const [disp2, toggle2] = useState("none");
    

    useEffect(()=>{
        axios.get('http://localhost:5000/api/products')
        .then((res)=>{
            res.data.map((item)=>{
                prods.push(item);
            })
            console.log('once');
            addProds(prods)
            upProd(prods);
        })
        .catch(function (error) {
            // handle error
            console.log(error);
          });
    
        },[prods]);
    
    
        document.body.addEventListener('mouseover',()=>{
            toggle2("block");
        })

    return (
        <div>
        <div className='container-lg' style={{marginTop:'40px',marginBottom:'40px'}}>
        <Link to="/Products">
            <Carousel fade style={{maxHeight:'500px'}}>
            <Carousel.Item>
                <img className="d-block w-100" src={offer2} alt="First slide" style={{maxHeight:'400px'}} />
            </Carousel.Item>
            <Carousel.Item>
                <img className="d-block w-100" src={offer} alt="Second slide" style={{minHeight:'400px'}} />
            </Carousel.Item>
            <Carousel.Item>
                <img className="d-block w-100" src={offer3} alt="Third slide" style={{maxHeight:'400px'}} />
            </Carousel.Item>
            </Carousel>
        </Link>
        <hr /><br />

        <h2>Offers now !</h2>
        <CardDeck key={products} style={{display : 'flex',padding:'50px',margin:'50px',flexWrap: 'wrap'}}>
        {products.map((prod)=>
            <Cards key={prod.name} product = {prod} handleClick = {(curr,price) => {
                    const newItem ={
                        name: curr,
                        price: price,
                        quantity: 1
                    }
                    let flag= true;
                    for(let i=0;i<lists.length;i++){
                        if(lists[i].name === newItem.name){
                            flag = false;
                            break;
                        }
                    }
                    if(flag){
                    const res = [...lists,newItem];
                    addlist(res);
                    }
                    if(lists.length>-1){
                        toggle1("block");
                    }
            }}      edit = {(name)=>{
                for(let i=0;i<products.length;i++){
                    if(products[i].name ==name){
                    products[i].price = products[i].price - (products[i].price*0.3);
                    }
                }

            }}></Cards>
            
        )}
        </CardDeck>

        </div> 
        </div>
    );
}

export default Home;