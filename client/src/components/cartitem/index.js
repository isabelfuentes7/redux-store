import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { remove_Cart, update_Cart_Qyantity } from '../../utils/actions';
import { idbPromise } from "../../utils/helpers";

const CartItem = ({ item }) => {


    const state = useSelector((state) => {
      return state
    });
    const dispatch = useDispatch();

    const remove_Cart = item => {
      dispatch({
        type: remove_Cart,
        _id: item._id
      });
      idbPromise('cart', 'delete', { ...item });
    };
    
    const onChange = (e) => {
      const value = e.target.value;
    
      if (value === '0') {
        dispatch({
          type: remove_Cart,
          _id: item._id
        });
      
        idbPromise('cart', 'delete', { ...item });
      } else {
        dispatch({
          type: update_Cart_Qyantity,
          _id: item._id,
          purchaseQuantity: parseInt(value)
        });
      
        idbPromise('cart', 'put', { ...item, purchaseQuantity: parseInt(value) });
      }

    };


  return (
    <div className="flex-row">
      <div>
        <img
          src={`/images/${item.image}`}
          alt=""
        />
      </div>
      <div>
        <div>{item.name}, ${item.price}</div>
        <div>
          <span>Qty:</span>
          <input
            type="number"
            placeholder="1"
            value={item.purchaseQuantity}
            onChange={onChange}
          />
          <span
            role="img"
            aria-label="trash"
            onClick={() => remove_Cart(item)}
          >
            🗑️
          </span>
        </div>
      </div>
    </div>
  );
}

export default CartItem;