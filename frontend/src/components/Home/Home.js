import React from 'react';
import {CardDeck} from 'react-bootstrap';
import Carousel from 'react-bootstrap/Carousel'
import 'bootstrap/dist/css/bootstrap.min.css';
import { MdBrandingWatermark } from 'react-icons/md';
import offer from './offerBanner.png';
import offer2 from './offer-banner.jpg';
import offer3 from './comp_3step.jpg';
import {Link} from 'react-router-dom';

const Home =() =>
{
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
            <hr />

            
        </div> 
        </div>
    );
}

export default Home;