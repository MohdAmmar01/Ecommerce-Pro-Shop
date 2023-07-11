import { createSlice } from "@reduxjs/toolkit";
const ProductSlice = createSlice({
    name: 'products',
    initialState: {
        data:null
    },
    reducers: {
     
      setdata(state,action){
        state.data=action.payload
      },
     
    },
  })


  export default ProductSlice.reducer
  export const {setdata}=ProductSlice.actions
  