import { Container, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import AulaService from "../../services/aulaService";
import AulaForm from "../AulaForm";

const AulaCadastrar = () => {
  const navigate = useNavigate();

  const handleSubmit = async (data) => {
    try {
      await AulaService.agendarAula(data);
      toast.success('Aula cadastrada com sucesso!');
      navigate("/aulas");
    // eslint-disable-next-line no-unused-vars
    } catch (error) {
      toast.error("Erro ao cadastrar a aula:");
    }
  };

  return (
    <Container sx={{ mt: 4 }}>
      <Typography variant="h5" gutterBottom>
        Agendar Aula
      </Typography>
      <AulaForm initialData={{}} onSubmit={handleSubmit} />
    </Container>
  );
};

export default AulaCadastrar;