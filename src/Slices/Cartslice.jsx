import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

const initialState = {
  cart: localStorage.getItem("cart")
    ? JSON.parse(localStorage.getItem("cart"))
    : [],
  totalItems: localStorage.getItem("totalItems")
    ? JSON.parse(localStorage.getItem("totalItems"))
    : 0,
  total: localStorage.getItem("total")
    ? JSON.parse(localStorage.getItem("total"))
    : 0,
};
const cartslice = createSlice({
  name: "cart",
  initialState: initialState,
  reducers: {
    addtocart: (state, action) => {
      const course = action.payload;
      const ind = state.cart.findIndex((item) => item.coursedetail._id === course.coursedetail._id);
console.log(course);
      if (ind >= 0) {
        // course is already present in the cart
        toast.error("Course is already present");
        return;
      }
      // course is not present
      state.cart.push(course);
      state.totalItems++;
      state.total += course.coursedetail.price;

      // update in the local storage
      localStorage.setItem("cart", JSON.stringify(state.cart));
      localStorage.setItem("totalItems", JSON.stringify(state.totalItems));
      localStorage.setItem("total", JSON.stringify(state.total));

      toast.success("course is added successfully")
    },

    removeFromCart: (state, action) => {
      const courseid = action.payload;
      console.log(courseid)
      const ind = state.cart.findIndex((item) => 
       item?.coursedetail._id === courseid
       
      
      
      );
console.log(ind)
console.log(state.cart[ind].coursedetail.price)
      if (ind >= 0) {
        // course is present in the cart
        state.totalItems--;
        state.total -= state.cart[ind].coursedetail.price;
        state.cart.splice(ind, 1);
        // update in the local storage
        localStorage.setItem("cart", JSON.stringify(state.cart));
        localStorage.setItem("totalItems", JSON.stringify(state.totalItems));
        localStorage.setItem("total", JSON.stringify(state.total));
        toast.success("course is removed in the cart successfully")
      }

    },

resetcart:(state,action)=>{
    state.cart=[];
    state.total=0;
    state.totalItems=0;

    //remove from local storage
    localStorage.removeItem("cart");
    localStorage.removeItem("totalItems");
    localStorage.removeItem("total");
}

  },
});

export const {addtocart,removeFromCart,resetcart} = cartslice.actions;
export default cartslice.reducer;
