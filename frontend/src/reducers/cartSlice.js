import { createSlice } from "@reduxjs/toolkit";
const CartSlice = createSlice({
    name: 'products',
    initialState: {
        cart:[],
        shippingaddress:{
          address:null
          ,country:null
          ,city:null
          ,postalcode:null
        },
        mobileNumber:null,
        price:null
    },
    reducers: {
     
        addToCart: (state, action) => {
            const itemInCart = state.cart.find((item) => item._id === action.payload._id);
            if (itemInCart) {
              itemInCart.quantity++;
              
            } else {
              state.cart.push({ ...action.payload});
            }
          },
          setprice:(state,action)=>{
state.price=action.payload
          },
        setshippingaddress: (state, action) => {
            const {address,code,country,city}=action.payload
            state.shippingaddress.address=address
            state.shippingaddress.postalcode=code
            state.shippingaddress.country=country
            state.shippingaddress.city=city
          },
        setMobileNumber: (state, action) => {
           
            state.mobileNumber=action.payload
          },
          incrementQuantity: (state, action) => {
            const item = state.cart.find((item) => item._id === action.payload);
            if(item.quantity<item.countInStock ){
              
              item.quantity++;
            }
          },
          decrementQuantity: (state, action) => {
            const item = state.cart.find((item) => item._id === action.payload);
            if (item.quantity === 1) {
              item.quantity = 1
            } else {
              item.quantity--;
            }
          },
          removeItem: (state, action) => {
            const removeItem = state.cart.filter((item) => item._id !== action.payload);
            state.cart = removeItem;
          },
          makecartempty: (state, action) => {
           
            state.cart =[];
          },
     
    },
  })
  export const cartReducer = CartSlice.reducer;
  export const {
    addToCart,
    incrementQuantity,
    decrementQuantity,
    removeItem,
    setprice,
    makecartempty,
    setMobileNumber,
    setshippingaddress
  } = CartSlice.actions;
  