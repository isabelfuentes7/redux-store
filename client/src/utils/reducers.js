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
} from './actions';

const defaultState = {
  products: [],
  cart: [],
  cartOpen: false,
  categories: [],
  currentCategory: '',
}
  
  const reducer = (state=defaultState, action) => {
    switch (action.type) {
        // if action type value is the value of `UPDATE_PRODUCTS`, return a new state object with an updated products array
        case UPDATE_PRODUCTS:
            return {
            ...state,
            products: [...action.products]
            };
        // if action type value is the value of `update_Categorys`, return a new state object with an updated categories array
        case update_Categorys:
            return {
            ...state,
            categories: [...action.categories]
            };
        // if action type value is the value of `update_Current_Category`, return a new string instead of an array
        case update_Current_Category:
            return {
                ...state,
                currentCategory: action.currentCategory
            };
        // UI Cart case
        case add_to_Cart:
          return {
            ...state,
            cartOpen: true,
            cart: [...state.cart, action.product]
          };
        // add multiple to cart
        case add_multiple_To_Cart:
          return {
            ...state,
            cart: [...state.cart, ...action.products],
          };
        // Remove from cart
        case remove_Cart:
          let newState = state.cart.filter(product => {
            return product._id !== action._id;
          });
        
          return {
            ...state,
            cartOpen: newState.length > 0,
            cart: newState
          };
        case update_Cart_Qyantity:
          return {
            ...state,
            cartOpen: true,
            cart: state.cart.map(product => {
              if (action._id === product._id) {
                product.purchaseQuantity = action.purchaseQuantity;
              }
              return product;
            })
          };

        case clear_Cart:
          return {
            ...state,
            cartOpen: false,
            cart: []
          };
        
        case toggle_Cart:
          return {
            ...state,
            cartOpen: !state.cartOpen
          };
  
          // if no changes, leave as default values
      default:
        return state;
    }
  };


  export default reducer;

  // commented out in favor of redux logic
  // export function useProductReducer(initialState) {
  //   return useReducer(reducer, initialState);
  // }