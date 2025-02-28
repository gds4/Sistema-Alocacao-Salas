import { useState, useEffect } from "react";
import { 
    Container, 
    TextField, 
    Button, 
    Typography, 
    Autocomplete 
} from "@mui/material";
import { useNavigate, useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import TurmaService from "../../services/turmaService";
import DisciplinaService from "../../services/disciplinaService";

function EditarTurma() {
    const navigate = useNavigate();
    const location = useLocation();
    const { turma } = location.state || {};

    const [semestre, setSemestre] = useState(turma?.semestre || "");
    const [idProfessor, setIdProfessor] = useState("");
    const [disciplinaDTO, setDisciplinaDTO] = useState(turma?.disciplinaDTO || null);
    const [disciplinas, setDisciplinas] = useState([]);

    useEffect(() => {
        const carregarDadosIniciais = async () => {
            try {
                const usuario = JSON.parse(localStorage.getItem("usuario"));
                if (!usuario || usuario.roles.length !== 1 || usuario.roles[0].descricao !== "ROLE_PROFESSOR") {
                    toast.error("Apenas professores podem editar turmas!");
                    navigate("/");
                    return;
                }

                if (turma && turma.idProfessor !== usuario.id) {
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
        } catch (error) {
            toast.error("Erro ao atualizar turma!");
        }
    };

    const handleVoltar = () => {
        navigate("/turmas");
    };

    return (
        <Container>
            <Typography variant="h4">Editar Turma</Typography>
            <form onSubmit={handleSubmit}>
                <TextField
                    fullWidth
                    label="Semestre"
                    value={semestre}
                    onChange={(e) => setSemestre(e.target.value)}
                    margin="normal"
                    placeholder="Ex: 2024.2"
                    required
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

                <div style={{ marginTop: '16px' }}>
                    <Button type="submit" variant="contained" color="primary" style={{ marginRight: '8px' }}>Salvar</Button>
                    <Button variant="contained" color="secondary" onClick={handleVoltar}>Voltar</Button>
                </div>
            </form>
        </Container>
    );
}

export default EditarTurma;