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
import SalaCadastrar from './components/SalaCadastrar'
import SalaListar from './components/SalaListar'
import Aula from './components/Aula'
import Disciplinas from './components/Disciplina'
import CriarDisciplina from './components/DisciplinaCriar'
import EditarDisciplina from './components/DisciplinaEditar'

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
          <Route path="/sala/cadastrar" element={<SalaCadastrar/>} />
          <Route path="/sala/listar" element={<SalaListar/>}/>
          <Route path="/login" element={<Login/>} />
          <Route path="/disciplinas" element={<Disciplinas/>} />
          <Route path="/disciplinas/cadastrar" element={<CriarDisciplina/>} />
          <Route path="/disciplinas/editar/:id" element={<EditarDisciplina/>} />
        </Routes>
      </Box>
    </BrowserRouter>
    <ToastContainer/>

    
  </StrictMode>,
)
