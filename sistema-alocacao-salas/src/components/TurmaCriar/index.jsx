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
import DisciplinaService from "../../services/disciplinaService"; // Serviço para buscar disciplinas

function CriarTurma() {
    const [semestre, setSemestre] = useState("");
    const [idProfessor, setIdProfessor] = useState("");
    const [disciplinaDTO, setDisciplinaDTO] = useState(null); // Armazena a disciplina selecionada
    const [disciplinas, setDisciplinas] = useState([]); // Lista de disciplinas disponíveis
    const navigate = useNavigate();

    // Carrega a lista de disciplinas ao iniciar a tela
    useEffect(() => {
        const carregarDisciplinas = async () => {
            try {
                const response = await DisciplinaService.listarDisciplinas();
                setDisciplinas(response);
            } catch (error) {
                console.error(error);
                toast.error("Erro ao carregar disciplinas!");
            }
        };
        carregarDisciplinas();
    }, []);

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
                {/* Campo para o semestre */}
                <TextField
                    fullWidth
                    label="Semestre"
                    value={semestre}
                    onChange={(e) => setSemestre(e.target.value)}
                    margin="normal"
                    placeholder="Ex: 2024.2"
                    required
                />

                {/* Campo para o ID do professor */}
                <TextField
                    fullWidth
                    label="ID do Professor"
                    value={idProfessor}
                    onChange={(e) => setIdProfessor(e.target.value)}
                    margin="normal"
                    type="number"
                    required
                />

                {/* Campo para selecionar a disciplina */}
                <Autocomplete
                    options={disciplinas}
                    getOptionLabel={(option) => `${option.nome} (ID: ${option.id})`} // Exibe o nome e o ID da disciplina
                    value={disciplinaDTO}
                    onChange={(_, newValue) => setDisciplinaDTO(newValue)} // Atualiza a disciplina selecionada
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

                {/* Botões de ação */}
                <div style={{ marginTop: '16px' }}>
                    <Button type="submit" variant="contained" color="primary" style={{ marginRight: '8px' }}>Salvar</Button>
                    <Button variant="contained" color="secondary" onClick={handleVoltar}>Voltar</Button>
                </div>
            </form>
        </Container>
    );
}

export default CriarTurma;