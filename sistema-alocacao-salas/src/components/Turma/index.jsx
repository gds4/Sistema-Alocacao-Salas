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
    Card,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import TurmaService from "../../services/turmaService";

function Turmas() {
    const navigate = useNavigate();
    const [turmas, setTurmas] = useState([]);

    useEffect(() => {
        carregarTurmas();
    }, []);

    const carregarTurmas = async () => {
        try {
            const response = await TurmaService.listarTurmas();
            setTurmas(response);
        } catch (error) {
            console.error(error);
            toast.error("Erro ao carregar turmas!");
        }
    };

    const handleDelete = async (id) => {
        try {
            await TurmaService.excluirTurma(id);
            setTurmas((prev) => prev.filter((turma) => turma.id !== id));
            toast.success("Turma removida com sucesso!");
        } catch (error) {
            toast.error("Erro ao excluir turma!");
        }
    };

    return (
        <Container>
            <Card sx={{ marginBottom: 3, padding: 2 }}>
                <CardContent>
                    <Box display="flex" justifyContent="space-between" alignItems="center">
                        <Typography variant="h4">Turmas</Typography>
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={() => navigate("/turmas/cadastrar")}
                        >
                            Cadastrar Turma
                        </Button> 
                    </Box>
                </CardContent>
            </Card>

            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>ID</TableCell>
                            <TableCell>Disciplina</TableCell>
                            <TableCell>Semestre</TableCell>
                            <TableCell>ID do Professor</TableCell>
                            <TableCell>Ações</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {turmas.map((turma) => (
                            <TableRow key={turma.id}>
                                <TableCell>{turma.id}</TableCell>
                                <TableCell>{turma.disciplinaDTO.nome}</TableCell>
                                <TableCell>{turma.semestre}</TableCell>
                                <TableCell>{turma.idProfessor}</TableCell>
                                <TableCell>
                                    <Button
                                        variant="contained"
                                        color="primary"
                                        onClick={() => navigate(`/turmas/editar/${turma.id}`, { state: { turma } })}
                                        sx={{ marginRight: 1 }}
                                    >
                                        Editar
                                    </Button>
                                    <Button
                                        variant="contained"
                                        color="secondary"
                                        onClick={() => handleDelete(turma.id)}
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

export default Turmas;