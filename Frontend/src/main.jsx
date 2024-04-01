import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import {BrowserRouter} from "react-router-dom"
import {Toaster} from "react-hot-toast"
import {Provider} from "react-redux"
import {configureStore} from "@reduxjs/toolkit"
import './index.css'
import rootReducer from './reducer/index.js'

const store=configureStore({
  reducer:rootReducer
})

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
      <BrowserRouter>
        <App />
        <Toaster/>
    </BrowserRouter>
  </Provider>
)
