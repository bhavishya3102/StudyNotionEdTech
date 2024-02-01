import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { configureStore } from "@reduxjs/toolkit";
import rootReducer from "./reducer/index"
import { Provider } from "react-redux";
import { ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const store=configureStore({
  reducer:rootReducer,
})
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
  <Provider store={store}>
  <BrowserRouter>
  <App />
  <ToastContainer position="top-center"/>
  </BrowserRouter>
  
  </Provider>
  </React.StrictMode>
);
