// import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import 'bootstrap-icons/font/bootstrap-icons.css';
import 'react-tooltip/dist/react-tooltip.css';
import { BrowserRouter } from 'react-router-dom'
import  AuthContext  from './context/authContext.jsx';

createRoot(document.getElementById('root')).render(

  <AuthContext>
    <BrowserRouter>
     <App />
    </BrowserRouter>
  </AuthContext>
 
)
