import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './components/App'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import Dashboard from './components/Dashboard'
import Login from './components/Login'
import Sidebar from './components/Sidebar'
import AulaCadastrar from './components/AulaCadastrar'
import AulaEditar from './components/AulaEditar'
import { Box } from '@mui/material'
import Salas from './components/Salas'
import Aula from './components/Aula'

//<Route exact path="/filme/:id" element={<Filme/>}/>

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Box sx={{ display: "flex" }}>
        <Sidebar />
        <Routes>
          <Route path="/" element={<App/>} ></Route>
          <Route path="/dashboard" element={<Dashboard/>} />
          <Route exact path="/aulas" element={<Aula/>}/>
          <Route exact path="/aulas/cadastrar" element={<AulaCadastrar/>}/>
          <Route exact path="/aulas/editar/:id" element={<AulaEditar/>}/>
          <Route path="/salas" element={<Salas/>} />
          <Route path="/login" element={<Login/>} />
        </Routes>
      </Box>
    </BrowserRouter>
    <ToastContainer/>

    
  </StrictMode>,
)
