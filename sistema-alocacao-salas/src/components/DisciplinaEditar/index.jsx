import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import { 
    Container, 
    Paper, 
    TextField, 
    Button, 
    Typography, 
    Box 
} from "@mui/material";
import DisciplinaService from "../../services/disciplinaService";

function EditarDisciplina() {
    const navigate = useNavigate();
    const location = useLocation();
    const { disciplina } = location.state || {};

    const [codigo, setCodigo] = useState(disciplina?.codigo || "");
    const [nome, setNome] = useState(disciplina?.nome || "");

    useEffect(() => {
        if (!disciplina) {
            toast.error("Disciplina não encontrada!");
            navigate("/disciplinas");
        }
    }, [disciplina, navigate]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await DisciplinaService.atualizarDisciplina(disciplina.id, { codigo, nome });
            toast.success("Disciplina atualizada com sucesso!");
            navigate("/disciplinas");
        } catch (error) {
            toast.error("Erro ao atualizar disciplina!");
        }
    };

    return (
        <Container>
            <Paper sx={{ padding: 2, marginTop: 3 }}>
                <Typography variant="h4" gutterBottom>
                    Editar Disciplina
                </Typography>
                <Box component="form" onSubmit={handleSubmit}>
                    <TextField
                        label="Código"
                        value={codigo}
                        onChange={(e) => setCodigo(e.target.value)}
                        fullWidth
                        margin="normal"
                        required
                    />
                    <TextField
                        label="Nome"
                        value={nome}
                        onChange={(e) => setNome(e.target.value)}
                        fullWidth
                        margin="normal"
                        required
                    />
                    <Box sx={{ marginTop: 2 }}>
                        <Button 
                            variant="contained" 
                            color="primary" 
                            type="submit"
                            sx={{ marginRight: 1 }}
                        >
                            Salvar
                        </Button>
                        <Button 
                            variant="contained" 
                            color="secondary" 
                            onClick={() => navigate("/disciplinas")}
                        >
                            Cancelar
                        </Button>
                    </Box>
                </Box>
            </Paper>
        </Container>
    );
}

export default EditarDisciplina;