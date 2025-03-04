import { useState, useEffect } from "react";
import { 
    Container, 
    TextField, 
    Button, 
    Typography, 
    Autocomplete, 
    Box,
    Card
} from "@mui/material";
import { useNavigate, useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import TurmaService from "../../../services/turmaService";
import DisciplinaService from "../../../services/disciplinaService";

function EditarTurma() {
    const navigate = useNavigate();
    const location = useLocation();
    const { turma } = location.state || {};

    const [semestre] = useState(turma?.semestre || "");
    const [idProfessor, setIdProfessor] = useState("");
    const [disciplinaDTO, setDisciplinaDTO] = useState(turma?.disciplinaDTO || null);
    const [disciplinas, setDisciplinas] = useState([]);

    useEffect(() => {
        const carregarDadosIniciais = async () => {
            try {
                const usuario = JSON.parse(localStorage.getItem("usuario"));

                const isAdmin = usuario.roles.find(role => role.descricao === 'ROLE_ADMIN');

                if (turma && turma.idProfessor !== usuario.id && !isAdmin) {
                    toast.error("Você não tem permissão para editar esta turma!");
                    navigate("/turmas");
                    return;
                }

                setIdProfessor(usuario.id);

                const response = await DisciplinaService.listarDisciplinas();
                setDisciplinas(response);
            } catch (error) {
                console.error(error);
                toast.error("Erro ao carregar dados iniciais!");
            }
        };
        carregarDadosIniciais();
    }, [navigate, turma]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!disciplinaDTO) {
            toast.error("Selecione uma disciplina!");
            return;
        }
        try {
            const turmaDTO = { id: turma.id, semestre, idProfessor, disciplinaDTO };
            await TurmaService.editarTurma(turma.id, turmaDTO);
            toast.success("Turma atualizada com sucesso!");
            navigate("/turmas");
        // eslint-disable-next-line no-unused-vars
        } catch (error) {
            toast.error("Erro ao atualizar turma!");
        }
    };

    const handleVoltar = () => {
        navigate("/turmas");
    };

    return (
        <Container>
            <Card sx={{ padding: 2, marginBottom: 2 }}>
                <Typography variant="h4">Editar Turma</Typography>
            </Card>
            <Card sx={{ padding: 2 }}>
                <form onSubmit={handleSubmit}>
                    <TextField
                        fullWidth
                        label="Semestre"
                        value={semestre}
                        margin="normal"
                        slotProps={{ input: { readOnly: true } }}
                    />

                    <Autocomplete
                        options={disciplinas}
                        getOptionLabel={(option) => `${option.nome} (ID: ${option.id})`}
                        value={disciplinaDTO}
                        onChange={(_, newValue) => setDisciplinaDTO(newValue)}
                        renderInput={(params) => (
                            <TextField
                                {...params}
                                label="Selecione a Disciplina"
                                margin="normal"
                                fullWidth
                                required
                            />
                        )}
                    />

                    <Box display="flex" justifyContent="flex-end" marginTop={3}>
                        <Button type="submit" variant="contained" color="primary" style={{ marginRight: '8px' }}>Salvar</Button>
                        <Button variant="contained" color="secondary" onClick={handleVoltar}>Voltar</Button>
                    </Box>
                </form>
            </Card>
        </Container>
    );
}

export default EditarTurma;