import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useQuery } from '@apollo/react-hooks';
import Cart from "../components/cart";
import { useDispatch, useSelector } from 'react-redux';
import {
  remove_Cart,
  update_Cart_Qyantity,
  add_to_Cart,
  UPDATE_PRODUCTS,
} from "../utils/actions";
import { QUERY_PRODUCTS } from "../utils/queries";
import { idbPromise } from "../utils/helpers";
import spinner from '../assets/spinner.gif'

function Detail() {
  
  const state = useSelector((state) => {
    return state
  });
  const dispatch = useDispatch();

  
  const { id } = useParams();

  const [currentProduct, setCurrentProduct] = useState({});

  const { loading, data } = useQuery(QUERY_PRODUCTS);

  const { products, cart } = state;

  useEffect(() => {
    if (products.length) {
      setCurrentProduct(products.find(product => product._id === id));
    } 
    else if (data) {
      dispatch({
        type: UPDATE_PRODUCTS,
        products: data.products
      });

      data.products.forEach((product) => {
        idbPromise('products', 'put', product);
      });
    }
    else if (!loading) {
      idbPromise('products', 'get').then((indexedProducts) => {
        dispatch({
          type: UPDATE_PRODUCTS,
          products: indexedProducts
        });
      });
    }
  }, [products, data, loading, dispatch, id]);

  const add_to_Cart = () => {
    const itemInCart = cart.find((cartItem) => cartItem._id === id)
    if (itemInCart) {
      dispatch({
        type: update_Cart_Qyantity,
        _id: id,
        purchaseQuantity: parseInt(itemInCart.purchaseQuantity) + 1
      });
      idbPromise('cart', 'put', {
        ...itemInCart,
        purchaseQuantity: parseInt(itemInCart.purchaseQuantity) + 1
      });
    } else {
      dispatch({
        type: add_to_Cart,
        product: { ...currentProduct, purchaseQuantity: 1 }
      });
      idbPromise('cart', 'put', { ...currentProduct, purchaseQuantity: 1 });

    }
  }

  const remove_Cart = () => {
    dispatch({
      type: remove_Cart,
      _id: currentProduct._id
    });

    idbPromise('cart', 'delete', { ...currentProduct });
  };

  // check if there is anything in cart then display also.
  return (
    <>
      {currentProduct && cart ? (
        <div className="container my-1">
          <Link to="/">
            ← Back to Products
          </Link>

          <h2>{currentProduct.name}</h2>

          <p>
            {currentProduct.description}
          </p>

          <p>
            <strong>Price:</strong>
            ${currentProduct.price}
            {" "}
            <button onClick={add_to_Cart}>
              Add to Cart
            </button>
            <button 
              disabled={!cart.find(p => p._id === currentProduct._id)} 
              onClick={remove_Cart}
            >
              Remove from Cart
            </button>
          </p>

          <img
            src={`/images/${currentProduct.image}`}
            alt={currentProduct.name}
          />
        </div>
      ) : null}
      {
        loading ? <img src={spinner} alt="loading" /> : null
      }
      <Cart />
    </>
  );
};

export default Detail;
