import React , {Fragment , useState } from 'react';
import * as FaIcons from 'react-icons/fa';
import * as Othericons from 'react-icons/hi';
import {MdCancel,MdRemoveCircleOutline} from 'react-icons/md';
import {MenuItem} from 'react-pro-sidebar';

const CartItem = (props)=>{
    const [val,change] = useState(1);
    function fun(x)
    {
        if(val+x>=0){
        change(val+x);
        }
    }
    return(
    <div>
        <MenuItem>
            <div className="border border-white" style = {{position:'relative',left:2,width:210,padding:10}}>
                <h1 className="display-6" style={{fontSize:"20px"}}>{props.items.name}</h1>
                <h1 className="display-6" style={{fontSize:"20px"}}>Price: {val} X {props.items.price} = {val*props.items.price}</h1>
                <button type="button" className="btn btn-danger" style={{fontSize:10}} onClick = {()=>{fun(-1);props.man(props.items.name,props.items.price,-1)}}><MdRemoveCircleOutline/></button>
                <input type="text" className="rounded" style={{width:30,marginRight:10,textAlign:"center"}} readOnly min="0" value={val}/>
                <button type="button" className="btn btn-success" style={{fontSize:10}} onClick={()=>{fun(1);props.man(props.items.name,props.items.price,1)}}><Othericons.HiOutlinePlusSm/></button>
            </div>
        </MenuItem>
    </div>
    );
}

export default CartItem;