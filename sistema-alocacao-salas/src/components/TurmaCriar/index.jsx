import { useState, useEffect } from "react";
import { 
    Container, 
    TextField, 
    Button, 
    Typography, 
    Autocomplete 
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import TurmaService from "../../services/turmaService";
import DisciplinaService from "../../services/disciplinaService";

function CriarTurma() {
    const [semestre, setSemestre] = useState("");
    const [idProfessor, setIdProfessor] = useState("");
    const [disciplinaDTO, setDisciplinaDTO] = useState(null);
    const [disciplinas, setDisciplinas] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const carregarDadosIniciais = async () => {
            try {
                const usuario = JSON.parse(localStorage.getItem("usuario"));
                if (!usuario || usuario.roles.length !== 1 || usuario.roles[0].descricao !== "ROLE_PROFESSOR") {
                    toast.error("Apenas professores podem criar turmas!");
                    navigate("/");
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
        } catch (error) {
            toast.error("Erro ao criar turma!");
        }
    };

    const handleVoltar = () => {
        navigate("/turmas");
    };

    return (
        <Container>
            <Typography variant="h4">Criar Turma</Typography>
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

export default CriarTurma;