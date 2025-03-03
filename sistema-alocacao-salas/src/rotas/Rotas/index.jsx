import { Route, Routes } from "react-router-dom";
import CriarTurma from "../../pages/turmas/TurmaCriar";
import EditarTurma from "../../pages/turmas/TurmaEditar";
import CadastrarUsuario from "../../pages/UsuarioCadastro";
import Turmas from "../../pages/turmas/Turma";
import EditarDisciplina from "../../pages/disciplinas/DisciplinaEditar";
import CriarDisciplina from "../../pages/disciplinas/DisciplinaCriar";
import Disciplinas from "../../pages/disciplinas/Disciplina";
import SalasListar from "../../pages/salas/SalaListar";
import SalaCadastrar from "../../pages/salas/SalaCadastrar";
import AulaEditar from "../../pages/aulas/AulaEditar";
import AulaCadastrar from "../../pages/aulas/AulaCadastrar";
import Aula from "../../pages/aulas/Aula";
import PrivateRoute from "../PrivateRoute";
import Dashboard from "../../pages/dashboard/Dashboard";
import Login from "../../pages/Login";
import NotFound from "../../pages/NotFound";

function AppRoute() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/" element={<Dashboard />} />
      <Route path="/aulas" element={<PrivateRoute element={Aula} />} />
      <Route path="/aulas/cadastrar" element={<PrivateRoute element={AulaCadastrar} />} />
      <Route path="/aulas/editar/:id" element={<PrivateRoute element={AulaEditar} />} />
      <Route path="/salas/cadastrar" element={<PrivateRoute element={SalaCadastrar} />} />
      <Route path="/salas" element={<PrivateRoute element={SalasListar} />} />
      <Route path="/disciplinas" element={<PrivateRoute element={Disciplinas} />} />
      <Route path="/disciplinas/cadastrar" element={<PrivateRoute element={CriarDisciplina} />} />
      <Route path="/disciplinas/editar/:id" element={<PrivateRoute element={EditarDisciplina} />} />
      <Route path="/turmas" element={<PrivateRoute element={Turmas} />} />
      <Route path="/turmas/cadastrar" element={<PrivateRoute element={CriarTurma} />} />
      <Route path="/turmas/editar/:id" element={<PrivateRoute element={EditarTurma} />} />
      <Route path="/usuario/cadastrar" element={<PrivateRoute element={CadastrarUsuario} />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default AppRoute;