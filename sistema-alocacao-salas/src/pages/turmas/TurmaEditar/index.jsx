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
import UsuarioService from "../../../services/usuarioService";

function EditarTurma() {
    const navigate = useNavigate();
    const location = useLocation();
    const { turma } = location.state || {};

    const [semestre] = useState(turma?.semestre || "");
    const [idProfessor, setIdProfessor] = useState(turma?.idProfessor || "");
    const [disciplinaDTO, setDisciplinaDTO] = useState(turma?.disciplinaDTO || null);
    const [disciplinas, setDisciplinas] = useState([]);
    const [professores, setProfessores] = useState([]);
    const [isAdmin, setIsAdmin] = useState(false);

    useEffect(() => {
        const carregarDadosIniciais = async () => {
            try {
                const usuario = JSON.parse(localStorage.getItem("usuario"));
                const admin = usuario.roles.some(role => role.descricao === "ROLE_ADMIN");
                setIsAdmin(admin);
                
                if (turma && turma.idProfessor !== usuario.id && !admin) {
                    toast.error("Você não tem permissão para editar esta turma!");
                    navigate("/turmas");
                    return;
                }
                
                if (admin) {
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
    }, [navigate, turma]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!disciplinaDTO) {
            toast.error("Selecione uma disciplina!");
            return;
        }
        try {
            const turmaDTO = { id: turma.id, semestre, idProfessor, disciplinaDTO };
            console.log(turmaDTO)
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

export default EditarTurma;
