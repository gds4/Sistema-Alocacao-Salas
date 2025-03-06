import { Card, CardContent, Container, Typography } from "@mui/material";
import { useParams, useNavigate } from "react-router-dom";

import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import AulaService from "../../../services/aulaService";
import AulaForm from "../AulaForm";
import TurmaService from "../../../services/turmaService";
import SalaService from "../../../services/salaService";
import UsuarioService from "../../../services/usuarioService";
import { SemestreService } from "../../../services/semestreService";


function AulaEditar() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [todasTurmas, setTodasTurmas] = useState([]);
  const [turmasFiltradas, setTurmasFiltradas] = useState([]);
  const [salas, setSalas] = useState([]);
  const [isAdmin, setIsAdmin] = useState(false);
  const [professores, setProfessores] = useState([]);
  const [usuario, setUsuario] = useState(null);
  const [formData, setFormData] = useState({
    diaSemana: "",
    horarioInicio: "",
    turmaId: "",
    salaId: "",
    duracao: 50,
    professorId: "",
  });

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("usuario"));
    if (user) {
      setUsuario(user);
      const admin = !!user.roles?.some((role) => role.descricao === "ROLE_ADMIN");
      setIsAdmin(admin);
      
      if (!admin) {
        setFormData(prev => ({
          ...prev,
          professorId: user.id
        }));
        const turmasDoUsuario = todasTurmas.filter(
          t => Number(t.idProfessor) === user.id
        );
        setTurmasFiltradas(turmasDoUsuario);
      }
    }
  }, [todasTurmas]);

  useEffect(() => {
    AulaService.obterAula(id)
      .then((data) => {
        const adjustedData = {
          ...data,
          horarioInicio: data.horarioInicio.slice(0, 5),
          professorId: data.professorId,
        };
        setFormData(adjustedData);
      })
      .catch(() => {
        toast.error("Aula não encontrada");
        navigate("/aulas");
      });
  }, [id, navigate]);

  const handleFormChange = (name, value) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  useEffect(() => {
    async function fetchTurmas() {
      try {
        const response = await TurmaService.listarTurmas();
        setTodasTurmas(response);
      // eslint-disable-next-line no-unused-vars
      } catch (error) {
        toast.error("Erro ao carregar turmas");
      }
    }
    fetchTurmas();
  }, []);

  useEffect(() => {
    async function fetchSalas() {
      try {
        const response = await SalaService.listarSalas();
        setSalas(response);
      // eslint-disable-next-line no-unused-vars
      } catch (error) {
        toast.error("Erro ao carregar salas");
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
    } else {
      setProfessores([]);
    }
  }, [isAdmin]);

  useEffect(() => {
    if (!formData) return;
    if (formData.professorId) {
      const turmasDoProfessor = todasTurmas.filter(
        (turma) => Number(turma.idProfessor) === Number(formData.professorId)
      );
      setTurmasFiltradas(turmasDoProfessor);
    } else {
      setTurmasFiltradas(todasTurmas);
    }
  }, [formData, todasTurmas]);

  useEffect(() => {
    if (formData.turmaId && turmasFiltradas.length > 0) {
      const turmaExists = turmasFiltradas.some((t) => t.id === formData.turmaId);
      if (!turmaExists) {
        setFormData((prev) => ({ ...prev, turmaId: "" }));
      }
    }
  }, [turmasFiltradas, formData.turmaId]);

  const handleSubmit = async () => { 
    try {
      const payload = {
        ...formData,
        semestre: SemestreService.semestreAtual,
        professorId: isAdmin ? formData.professorId : usuario.id
      };
  
      await AulaService.editarAula(id, payload);
      toast.success("Aula editada com sucesso!");
      navigate("/aulas");
    } catch (error) {
      toast.error(error.response?.data?.message || "Erro ao editar a aula");
    }
  };

  if (!formData || Object.keys(formData).length === 0) {
    return (
      <Container sx={{ mt: 4 }}>
        <Typography variant="h6">Carregando dados da aula...</Typography>
      </Container>
    );
  }

  return (
    <Container sx={{ mt: 4 }}>
      <Card sx={{ marginBottom: 3, padding: 2 }}>
        <CardContent>
          <Typography variant="h4" gutterBottom>
            Editar Aula
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

export default AulaEditar;