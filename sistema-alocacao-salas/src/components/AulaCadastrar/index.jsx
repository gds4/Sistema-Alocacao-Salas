import { Container, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import AulaService from "../../services/aulaService";
import AulaForm from "../AulaForm";

const AulaCadastrar = () => {
  const navigate = useNavigate();

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
        professorId: usuario.id
      };
      console.log(payload)

      await AulaService.agendarAula(payload);
      toast.success('Aula cadastrada com sucesso!');
      navigate("/aulas");
    } catch (error) {
      toast.error(error.response?.data?.message || "Erro ao cadastrar a aula");
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