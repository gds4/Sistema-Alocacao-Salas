import { Card, CardContent, Container, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import AulaService from "../../../services/aulaService";
import AulaForm from "../AulaForm";
import { useEffect, useState } from "react";
import TurmaService from "../../../services/turmaService";
import SalaService from "../../../services/salaService";
import { SemestreService } from "../../../services/semestreService";

function AulaCadastrar() {
  const navigate = useNavigate();

  const [turmas, setTurmas] = useState([])
  const [salas, setSalas] = useState([])

  useEffect(() => {

    async function fetchTurmas() {
      try {
        const response = await TurmaService.listarTurmas();
        setTurmas(response);
        // eslint-disable-next-line no-unused-vars
      } catch (error) {
        toast.error('Erro ao carregar turmas')
      }
    } fetchTurmas();

  }, [])


  useEffect(() => {

    async function fetchSalas() {
      try {
        const response = await SalaService.listarSalas();
        setSalas(response);
        // eslint-disable-next-line no-unused-vars
      } catch (error) {
        toast.error('Erro ao carregar salas')
      }
    } fetchSalas();

  }, [])



  const handleSubmit = async (data) => {
    try {

      const usuario = JSON.parse(localStorage.getItem('usuario'));
      if (!usuario || !usuario.id) {
        toast.error('Usuário não autenticado!');
        return;
      }

      const payload = {
        ...data,
        duracao: data.duracao,
        professorId: usuario.id,
        semestre: SemestreService.semestreAtual
      };

      await AulaService.agendarAula(payload);
      toast.success('Aula cadastrada com sucesso!');
      navigate("/aulas");
    } catch (error) {
      if (error.response) {
        if (error.response.status === 409) {
          toast.error("Já existe uma aula cadastrada nessa sala nesse horário!");
        } else {
          toast.error(error.response.data?.message || "Erro ao cadastrar a aula");
        }
      }
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
      <AulaForm initialData={{}} onSubmit={handleSubmit} turmas={turmas} salas={salas} />
    </Container>
  );
};

export default AulaCadastrar;