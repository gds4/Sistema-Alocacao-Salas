import { useState, useEffect } from "react";
import {
    Container,
    TextField,
    Button,
    Typography,
    Autocomplete,
    Card,
    Box
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import TurmaService from "../../../services/turmaService";
import DisciplinaService from "../../../services/disciplinaService";
import { SemestreService } from "../../../services/semestreService";

function CriarTurma() {
    const [semestre] = useState(SemestreService.semestreAtual);
    const [idProfessor, setIdProfessor] = useState("");
    const [disciplinaDTO, setDisciplinaDTO] = useState(null);
    const [disciplinas, setDisciplinas] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const carregarDadosIniciais = async () => {
            try {
                const usuario = JSON.parse(localStorage.getItem("usuario"));

                setIdProfessor(usuario.id);

                const response = await DisciplinaService.listarDisciplinas();
                setDisciplinas(response);
            } catch (error) {
                console.error(error);
                toast.error("Erro ao carregar dados iniciais!");
            }
        };
        carregarDadosIniciais();
    }, [navigate]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!disciplinaDTO) {
            toast.error("Selecione uma disciplina!");
            return;
        }
        try {
            const turmaDTO = { semestre, idProfessor, disciplinaDTO };
            await TurmaService.cadastrarTurma(turmaDTO);
            toast.success("Turma criada com sucesso!");
            navigate("/turmas");
            // eslint-disable-next-line no-unused-vars
        } catch (error) {
            toast.error("Erro ao criar turma!");
        }
    };

    const handleVoltar = () => {
        navigate("/turmas");
    };

    return (
        <Container>
            <Card sx={{ padding: 2, marginBottom: 2 }}>
                <Typography variant="h4">Criar Turma</Typography>
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

export default CriarTurma;