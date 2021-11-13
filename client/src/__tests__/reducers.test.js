import { reducer } from '../utils/reducers';

// import our actions
import {
  UPDATE_PRODUCTS,
  update_Categorys,
  update_Current_Category,
  add_to_Cart,
  add_multiple_To_Cart,
  remove_Cart,
  update_Cart_Qyantity,
  clear_Cart,
  toggle_Cart
} from '../utils/actions';
  
  // create a sample of what our global state will look like
  const initialState = {
    products: [],
    categories: [{ name: 'Food' }],
    currentCategory: '1',
    // Cart UI data sample
    cart: [
      {
        _id: '1',
        name: 'Soup',
        purchaseQuantity: 1
      },
      {
        _id: '2',
        name: 'Bread',
        purchaseQuantity: 2
      }
    ],
    cartOpen: false
  };
  

  test('UPDATE_PRODUCTS', () => {
    let newState = reducer(initialState, {
      type: UPDATE_PRODUCTS,
      products: [{}, {}]
    });
  
    expect(newState.products.length).toBe(2);
    expect(initialState.products.length).toBe(0);
    // no changes at all that means 2,0
  });

  test('update_Categorys', () => {
    let newState = reducer(initialState, {
      type: update_Categorys,
      categories: [{}, {}]
    });
  
    /*
    The result of the reducer() should show that the 
    length of our updated categories array will be 2,
    while the initial categories array should still 
    be 1. This indicates that we didn't affect our 
    original state values at all and simply used it
    to create a new version of it.
    */
    expect(newState.categories.length).toBe(2);
    expect(initialState.categories.length).toBe(1);
  });

  test('update_Current_Category', () => {
    let newState = reducer(initialState, {
      type: update_Current_Category,
      currentCategory: '2'
    });
  
    expect(newState.currentCategory).toBe('2');
    expect(initialState.currentCategory).toBe('1');
  });

  // Cart UI testing
  test('add_to_Cart', () => {
    let newState = reducer(initialState, {
      type: add_to_Cart,
      product: { purchaseQuantity: 1 }
    });
  
    expect(newState.cart.length).toBe(3);
    expect(initialState.cart.length).toBe(2);
  });

  test('add_multiple_To_Cart', () => {
    let newState = reducer(initialState, {
      type: add_multiple_To_Cart,
      products: [{}, {}]
    });
  
    expect(newState.cart.length).toBe(4);
    expect(initialState.cart.length).toBe(2);
  });

  // add and remove items from cart tests
  test('remove_Cart', () => {
    let newState1 = reducer(initialState, {
      type: remove_Cart,
      _id: '1'
    });
  
    // cart is still open
    expect(newState1.cartOpen).toBe(true);
  
    // the second item should now be the first
    expect(newState1.cart.length).toBe(1);
    expect(newState1.cart[0]._id).toBe('2');
  
    let newState2 = reducer(newState1, {
      type: remove_Cart,
      _id: '2'
    });
  
    // cart is empty and closed
    expect(newState2.cartOpen).toBe(false);
    expect(newState2.cart.length).toBe(0);
  
    expect(initialState.cart.length).toBe(2);
  });

  // Update cart quanity
  test('update_Cart_Qyantity', () => {
    let newState = reducer(initialState, {
      type: update_Cart_Qyantity,
      _id: '1',
      purchaseQuantity: 3
    });
  
    expect(newState.cartOpen).toBe(true);
    expect(newState.cart[0].purchaseQuantity).toBe(3);
    expect(newState.cart[1].purchaseQuantity).toBe(2);
  
    expect(initialState.cartOpen).toBe(false);
  });

  test('clear_Cart', () => {
    let newState = reducer(initialState, {
      type: clear_Cart
    });
  
    expect(newState.cartOpen).toBe(false);
    expect(newState.cart.length).toBe(0);
    expect(initialState.cart.length).toBe(2);
  });

  test('toggle_Cart', () => {
    let newState = reducer(initialState, {
      type: toggle_Cart
    });
  
    expect(newState.cartOpen).toBe(true);
    expect(initialState.cartOpen).toBe(false);
  
    let newState2 = reducer(newState, {
      type: toggle_Cart
    });
  
    expect(newState2.cartOpen).toBe(false);
  });

   