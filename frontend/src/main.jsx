import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import {Provider} from "react-redux";
import {store} from "@/redux/Store.js";
import {BrowserRouter} from "react-router-dom";
import {CartProvider} from "@/components/Utils/CartProvider.jsx";

createRoot(document.getElementById('root')).render(
  <StrictMode>
      <BrowserRouter>
          <Provider store={store}>
              <CartProvider>
              <App />
              </CartProvider>
          </Provider>
      </BrowserRouter>
  </StrictMode>,
)
