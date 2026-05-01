import './index.css'

import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import ReactDom from "react-dom/client"
import {Provider} from "react-redux"
import { BrowserRouter } from 'react-router'

import App from './App.jsx'
import { Toaster } from 'react-hot-toast'
import store from './Redux/store.js'

createRoot(document.getElementById('root')).render(
    <Provider store={store}>
    <BrowserRouter>
     <App />
     <Toaster/>
    </BrowserRouter>
   </Provider>
)
