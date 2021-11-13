import React from "react";
import { Link } from "react-router-dom";
import { pluralize } from "../../utils/helpers"
import { useDispatch, useSelector } from 'react-redux';
import { add_to_Cart, update_Cart_Qyantity } from "../../utils/actions";
import { idbPromise } from "../../utils/helpers";

function ProductItem(item) {
  const state = useSelector((state) => {
    return state
  });
  const dispatch = useDispatch();

  const { cart } = state;

  const {
    image,
    name,
    _id,
    price,
    quantity
  } = item;


 
  const add_to_Cart = () => {
    const itemInCart = cart.find((cartItem) => cartItem._id === _id)
    if (itemInCart) {
      dispatch({
        type: update_Cart_Qyantity,
        _id: _id,
        purchaseQuantity: parseInt(itemInCart.purchaseQuantity) + 1
      });
      idbPromise('cart', 'put', {
        ...itemInCart,
        purchaseQuantity: parseInt(itemInCart.purchaseQuantity) + 1
      });
    } else {
      dispatch({
        type: add_to_Cart,
        product: { ...item, purchaseQuantity: 1 }
      });
      idbPromise('cart', 'put', { ...item, purchaseQuantity: 1 });
    }
  }

  return (
    <div className="card px-1 py-1">
      <Link to={`/products/${_id}`}>
        <img
          alt={name}
          src={`/images/${image}`}
        />
        <p>{name}</p>
      </Link>
      <div>
        <div>{quantity} {pluralize("item", quantity)} in stock</div>
        <span>${price}</span>
      </div>
      <button onClick={add_to_Cart}>Add to cart</button>
    </div>
  );
}

export default ProductItem;
