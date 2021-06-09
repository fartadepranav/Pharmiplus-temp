import React , {Fragment , useState } from 'react';
import Cards from './cards';
import {CardDeck,Button,Modal} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import * as FaIcons from 'react-icons/fa';
import * as Othericons from 'react-icons/hi';
import {MdCancel,MdRemoveCircleOutline} from 'react-icons/md';
import { ProSidebar, Menu, MenuItem} from 'react-pro-sidebar';
import 'react-pro-sidebar/dist/css/styles.css';
import CartItem from './CartItem'
import axios from 'axios';




const Products = ()=>{
    const [search, addSearch] = useState('');
    const [prods,addProds] = useState([]);
    const [products, upProd] = useState(prods);
    const [lists, addlist] = useState([]);
    const [disp, toggle] = useState("none");
    const [disp1, toggle1] = useState("none");
    const [sum,addSum] =useState(0);
    const [balance,recharge] =useState(0);
    const [ip,changeIp] = useState(0);
    let curr,price,med,val;

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    
    const [showWallet, setShowW] = useState(false);
    const handleCloseW = () => setShowW(false);
    const handleShowW = () => setShowW(true);
    
    async function ret(){
    await axios.get('http://localhost:5000/api/products')
    .then((res)=>{
        addProds(res.data);
    });
}

    ret();

    return(
    <div>

<Modal show={show} onHide={handleClose}>
        <Modal.Header>
          <Modal.Title>Your Order List</Modal.Title>
        </Modal.Header>
        <Modal.Body>Would you like to confirm your order? <br/><br/>
            {lists.map((item)=>
            <h5>{item.name} : {item.price} X {item.quantity} = {item.price*item.quantity}</h5>

            )}
            --------------------------------------------<br/>
            <h4>Grand Total : {sum}</h4>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancel Order
          </Button>
          <Button variant="primary" onClick={()=>{
              if(sum>balance){
                  alert('Insufficient Funds in your PharmiWallet! Recharge to buy more Medicines');
              }
              else{
                recharge(parseFloat(balance)-parseFloat(sum));
                addlist([]);
                addSum(0);
                toggle1("none");
                alert("Products Booked");
              }
              handleClose();}}>
            Confirm Order
          </Button>
        </Modal.Footer>
</Modal>


<Modal show={showWallet}>
<Modal.Header>
          <Modal.Title>Reacharge Your PharmiWallet</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            How much amount would you like to deposit in your PharmiWallet?<br/>
            <h6>Your Current Balance: {balance}</h6>
            <input type="number" onChange={(event)=>{changeIp(parseFloat(event.target.value))}} />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseW}>
            Cancel Recharge
          </Button>
          <Button variant="primary" onClick={()=>{recharge(parseFloat(balance)+ip);handleCloseW();alert("Recharge Successful")}}>
            Recharge
          </Button>
        </Modal.Footer>
</Modal>

        <h1 className="display-2" style={{textAlign:'center',margin:20}}>All the Meds you need</h1>
        <h1>{curr}</h1>
        

        <div className="Coin" onClick={handleShowW}>
         <FaIcons.FaCoins style = {{ display: "block", position: "relative",top:"12px",left:"12px",fontSize:'25px',color:'yellow',pointerEvents:'none'}}/>
        </div>


        <div className="Kart" onClick={
            ()=>{
                if(disp === "block"){
                    toggle("none");
                }
                else{
                    toggle("block");
                }
            }
        }>
         <Othericons.HiOutlineShoppingCart style = {{ display: "block", position: "relative",top:"12px",left:"12px",fontSize:'25px',color:'white',pointerEvents:'none'}}/>
        </div>


        <div className="Cart">
        <ProSidebar style ={{display : disp ,right: 0,top:70,bottom:0,position:'absolute',width: 200,height:1500}}>
            <MdCancel style = {{fontSize:"25px",position : 'absolute', right: 5 ,marginBottom : 5,top: 5}} onClick={
                ()=>{toggle("none")}}/>
                <Menu iconShape="square" style= {{position:'relative',top:20}}>
                <MenuItem><h1 className="display-6" style={{fontSize:"30px"}}>Your Medi-Cart</h1></MenuItem>
                    {lists.map((item)=>
                        <CartItem items={item} man = {
                            (med,price,val) =>{
                                for(let i=0;i<lists.length;i++)
                                {
                                    if(lists[i].name == med){
                                        if(lists[i].quantity+val>=0){
                                            lists[i].quantity+=val;
                                            addSum(parseFloat(sum)+parseFloat(price));
                                        }
                                    }
                                }
                                addlist(lists);
                            }
                        }></CartItem>
                    )}
                </Menu>
                <h1 className="display-6" style={{fontSize:"25px",left:5,position:'relative',width:260,marginTop:100,display: disp1}}>Grand Total: {sum}</h1>
                <Button style={{left:5,position:'relative',width:260,marginTop:10,display: disp1}} onClick={handleShow}>Proceed to Pay</Button>
        </ProSidebar>
        </div>
        <div style = {{textAlign: "center"}}>
            <input placeholder="Search your Meds here" type="text" style={{marginTop:50,width:"400px",height:"35px"}} onChange={
                (event)=>{
                    let list = [];
                    addSearch(event.target.value.trim().toLowerCase());
                    if(search === ""){
                        upProd(prods);
                    }
                    else{
                    for(let i=0;i<prods.length;i++)
                    {
                        let name = prods[i].name.toLowerCase().trim();
                        let comm = prods[i].commodity.toLowerCase().trim();
                        if(name.includes(search) || comm.includes(search))
                        {
                            list.push(prods[i]);
                        }
                    }
                    upProd(list);
                }
            }
        }
            onKeyDown = {
                (event) =>{
                    if(event.key === "Backspace"){
                        addSearch('');
                        event.target.value = " ";
                    }
                }
            }
            />
        </div>
        <CardDeck style={{display : 'flex',padding:'50px',margin:'50px',flexWrap: 'wrap'}}>
        {products.map((prod)=>
            <Cards product = {prod} handleClick = {(curr,price) => {
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
                    addSum(parseFloat(sum)+parseFloat(newItem.price));
                    addlist(res);
                    }
                    if(lists.length>-1){
                        toggle1("block");
                    }
            }}></Cards>
            
        )}
        </CardDeck>
    </div>
    );
}

export default Products;