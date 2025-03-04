import { Card, CardContent, Container, Typography } from "@mui/material";
import { useParams, useNavigate } from "react-router-dom";

import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import AulaService from "../../../services/aulaService";
import AulaForm from "../AulaForm";
import TurmaService from "../../../services/turmaService";
import SalaService from "../../../services/salaService";


function AulaEditar() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [dadosIniciais, setDadosIniciais] = useState(null);
  const [turmas, setTurmas] = useState([])
  const [salas, setSalas] = useState([])

  useEffect(() => {
    AulaService.obterAula(id)
      .then((data) => {

        const adjustedData = {
          ...data,
          horarioInicio: data.horarioInicio.slice(0, 5)
        };
        setDadosIniciais(adjustedData);
      })
      .catch(() => {
        toast.error('Aula não encontrada');
        navigate(-1);
      });
  }, [id, navigate]);

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
      await AulaService.editarAula(id, data);
      toast.success('Aula editada com sucesso')
      navigate("/aulas");
      // eslint-disable-next-line no-unused-vars
    } catch (error) {

      toast.error("Ocorreu um erro ao editar");
    }
  };

  if (!dadosIniciais) {
    return <div>Carregando...</div>;
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
      <AulaForm initialData={dadosIniciais} onSubmit={handleSubmit} turmas={turmas} salas={salas} />
    </Container>
  );
};

export default AulaEditar;