import { Container, Typography } from "@mui/material";
import { useParams, useNavigate } from "react-router-dom";

import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import AulaService from "../../services/aulaService";
import AulaForm from "../AulaForm";


const AulaEditar = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [dadosIniciais, setDadosIniciais] = useState(null);

  useEffect(() => {
    AulaService.obterAula(id)
      .then((data) => {
        // Ajustar o formato do horário
        const adjustedData = {
          ...data,
          horarioInicio: data.horarioInicio.slice(0, 5) // Remove os segundos
        };
        setDadosIniciais(adjustedData);
        console.log(adjustedData);
      })
      .catch(() => {
        toast.error('Aula não encontrada');
        navigate(-1);
      });
  }, [id, navigate]);
  
  const handleSubmit = async (data) => {
    try {
      await AulaService.editarAula(id, data);
      toast.success('Aula editada com sucesso')
      navigate("/aulas");
    // eslint-disable-next-line no-unused-vars
    } catch (error) {
      toast.error("Erro ao atualizar a aula:");
    }
  };

  if (!dadosIniciais) {
    return <div>Carregando...</div>;
  }

  return (
    <Container sx={{ mt: 4 }}>
      <Typography variant="h5" gutterBottom>
        Editar Aula
      </Typography>
      <AulaForm initialData={dadosIniciais} onSubmit={handleSubmit} />
    </Container>
  );
};

export default AulaEditar;