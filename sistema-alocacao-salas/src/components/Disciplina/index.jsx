import { useEffect, useState } from "react";
import { 
    Container, 
    Paper, 
    Table, 
    TableBody, 
    TableCell, 
    TableContainer, 
    TableHead, 
    TableRow, 
    Typography, 
    Button, 
    Box,
    CardContent,
    Card
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import DisciplinaService from "../../services/disciplinaService";

function Disciplinas() {
    const navigate = useNavigate();
    const [disciplinas, setDisciplinas] = useState([]);

    useEffect(() => {
        carregarDisciplinas();
    }, []);

    const carregarDisciplinas = async () => {
        try {
            const response = await DisciplinaService.listarDisciplinas();
            setDisciplinas(response);
        } catch (error) {
            console.error(error)
            toast.error("Erro ao carregar disciplinas!");
        }
    };

    const handleDelete = async (id) => {
        try {
            await DisciplinaService.excluirDisciplina(id);
            setDisciplinas((prev) => prev.filter((disciplina) => disciplina.id !== id));
            toast.success("Disciplina removida com sucesso!");
        } catch (error) {
            toast.error("Erro ao excluir disciplina!");
        }
    };

    return (
        <Container>
            <Card sx={{ marginBottom: 3, padding: 2 }}>
                <CardContent>
                    <Box display="flex" justifyContent="space-between" alignItems="center">
                        <Typography variant="h4">Disciplinas</Typography>
                        <Button 
                            variant="contained" 
                            color="primary"
                            onClick={() => navigate("/disciplinas/cadastrar")}
                        >
                            Cadastrar Disciplina
                        </Button>
                    </Box>
                </CardContent>
            </Card>

            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>ID</TableCell>
                            <TableCell>Código</TableCell>
                            <TableCell>Nome</TableCell>
                            <TableCell>Ações</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {disciplinas.map((disciplina) => (
                            <TableRow key={disciplina.id}>
                                <TableCell>{disciplina.id}</TableCell>
                                <TableCell>{disciplina.codigo}</TableCell>
                                <TableCell>{disciplina.nome}</TableCell>
                                <TableCell>
                                    <Button 
                                        variant="contained" 
                                        color="primary" 
                                        onClick={() => navigate(`/disciplinas/editar/${disciplina.id}`)}
                                        sx={{ marginRight: 1 }}
                                    >
                                        Editar
                                    </Button>
                                    <Button 
                                        variant="contained" 
                                        color="secondary" 
                                        onClick={() => handleDelete(disciplina.id)}
                                    >
                                        Excluir
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Container>
    );
}

export default Disciplinas;
