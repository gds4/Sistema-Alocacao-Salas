import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import Sidebar from './components/Sidebar'
import { Box } from '@mui/material'

import AppRoute from './rotas/Rotas'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter> 
      <Box sx={{ display: "flex" }}>
        <Sidebar />
        <AppRoute/>
      </Box>
    </BrowserRouter>
    <ToastContainer/>
  </StrictMode>,
)