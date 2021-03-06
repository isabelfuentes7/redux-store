import React, { useState } from "react";
import ProductList from "../components/productList";
import CategoryMenu from "../components/categorymenu";
import Cart from '../components/cart';
const Home = () => {
  return (
    <div className="container">
      <CategoryMenu />
      <ProductList />
      <Cart />
    </div>
  );
};

export default Home;
