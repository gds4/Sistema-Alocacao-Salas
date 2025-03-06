import { Card, CardContent, Container, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import AulaService from "../../../services/aulaService";
import AulaForm from "../AulaForm";
import { useEffect, useState } from "react";
import TurmaService from "../../../services/turmaService";
import SalaService from "../../../services/salaService";
import { SemestreService } from "../../../services/semestreService";
import UsuarioService from "../../../services/usuarioService";

function AulaCadastrar() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    diaSemana: "",
    horarioInicio: "",
    turmaId: "",
    salaId: "",
    duracao: 50,
    professorId: "",
  });
  const [todasTurmas, setTodasTurmas] = useState([]);
  const [turmasFiltradas, setTurmasFiltradas] = useState([]);
  const [salas, setSalas] = useState([]);
  const [isAdmin, setIsAdmin] = useState(false);
  const [professores, setProfessores] = useState([]);
  const [usuario, setUsuario] = useState(null);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("usuario"));
    if (user) {
      setUsuario(user);
      const admin = !!user.roles?.some(role => role.descricao === "ROLE_ADMIN");
      setIsAdmin(admin);
      
      // Se não for admin, setar professorId automaticamente
      if (!admin) {
        setFormData(prev => ({
          ...prev,
          professorId: user.id
        }));
      }
    }
  }, []);

  useEffect(() => {
    async function fetchTurmas() {
      try {
        const response = await TurmaService.listarTurmas();
        setTodasTurmas(response);
        
        // Filtrar turmas para não-admins
        if (!isAdmin && usuario?.id) {
          const turmasDoUsuario = response.filter(
            t => Number(t.idProfessor) === usuario.id
          );
          setTurmasFiltradas(turmasDoUsuario);
        } else {
          setTurmasFiltradas(response);
        }
      // eslint-disable-next-line no-unused-vars
      } catch (error) {
        toast.error('Erro ao carregar turmas');
      }
    }
    fetchTurmas();
  }, [isAdmin, usuario]);

  useEffect(() => {
    async function fetchSalas() {
      try {
        const response = await SalaService.listarSalas();
        setSalas(response);
      // eslint-disable-next-line no-unused-vars
      } catch (error) {
        toast.error('Erro ao carregar salas');
      }
    }
    fetchSalas();
  }, []);

  useEffect(() => {
    if (isAdmin) {
      async function fetchProfessores() {
        try {
          const response = await UsuarioService.listarUsuariosComRoleProfessor();
          setProfessores(response);
        // eslint-disable-next-line no-unused-vars
        } catch (error) {
          toast.error("Erro ao carregar professores");
        }
      }
      fetchProfessores();
    }
  }, [isAdmin]);

  useEffect(() => {
    if (isAdmin && formData.professorId) {
      const turmasDoProfessor = todasTurmas.filter(
        t => Number(t.idProfessor) === Number(formData.professorId)
      );
      setTurmasFiltradas(turmasDoProfessor);
    }
  }, [formData.professorId, todasTurmas, isAdmin]);

  const handleFormChange = (name, value) => {
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async () => {
    try {
      if (!usuario?.id) {
        toast.error("Usuário não autenticado!");
        return;
      }

      const payload = {
        ...formData,
        semestre: SemestreService.semestreAtual,
        professorId: isAdmin ? formData.professorId : usuario.id
      };

      await AulaService.agendarAula(payload);
      toast.success("Aula cadastrada com sucesso!");
      navigate("/aulas");
    } catch (error) {
      toast.error(error.response?.data?.message || "Erro ao cadastrar a aula");
    }
  };

  return (
    <Container sx={{ mt: 4 }}>
      <Card sx={{ marginBottom: 3, padding: 2 }}>
        <CardContent>
          <Typography variant="h4" gutterBottom>
            Agendar Aula
          </Typography>
        </CardContent>
      </Card>
      <AulaForm
        formData={formData}
        onChange={handleFormChange}
        onSubmit={handleSubmit}
        turmas={turmasFiltradas}
        salas={salas}
        professores={professores}
        isAdmin={isAdmin}
      />
    </Container>
  );
}

export default AulaCadastrar;