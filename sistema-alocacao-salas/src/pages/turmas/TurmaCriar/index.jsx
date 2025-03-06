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
import UsuarioService from "../../../services/usuarioService";

function CriarTurma() {
    const [semestre] = useState(SemestreService.semestreAtual);
    const [idProfessor, setIdProfessor] = useState("");
    const [disciplinaDTO, setDisciplinaDTO] = useState(null);
    const [disciplinas, setDisciplinas] = useState([]);
    const [professores, setProfessores] = useState([]);
    const [isAdmin, setIsAdmin] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const carregarDadosIniciais = async () => {
            try {
                const usuario = JSON.parse(localStorage.getItem("usuario"));
                setIdProfessor(usuario.id);
                setIsAdmin(usuario.roles.some(role => role.descricao === "ROLE_ADMIN"));
                
                if (usuario.roles.some(role => role.descricao === "ROLE_ADMIN")) {
                    const responseProfessores = await UsuarioService.listarUsuariosComRoleProfessor();
                    setProfessores(responseProfessores);
                }
                
                const responseDisciplinas = await DisciplinaService.listarDisciplinas();
                setDisciplinas(responseDisciplinas);
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

                    {isAdmin && (
                        <Autocomplete
                            options={professores}
                            getOptionLabel={(option) => `${option.nome} (ID: ${option.id})`}
                            value={professores.find(prof => prof.id === idProfessor) || null}
                            onChange={(_, newValue) => setIdProfessor(newValue ? newValue.id : "")}
                            renderInput={(params) => (
                                <TextField
                                    {...params}
                                    label="Selecione o Professor"
                                    margin="normal"
                                    fullWidth
                                    required
                                />
                            )}
                        />
                    )}

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
