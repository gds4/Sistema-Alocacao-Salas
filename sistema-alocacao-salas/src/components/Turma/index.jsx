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
            // Obtém o usuário logado do localStorage
            const usuario = JSON.parse(localStorage.getItem("usuario"));
            if (!usuario) {
                toast.error("Você precisa estar logado para visualizar as turmas!");
                navigate("/login"); // Redireciona para a tela de login
                return;
            }


            // Busca as turmas do professor logado
            const response = await TurmaService.listarTurmasPorProfessor(usuario.id);
            setTurmas(response);
        } catch (error) {
            console.error(error);
            toast.error("Erro ao carregar turmas!");
        }
    };

    const handleDelete = async (id) => {
        // Verifica se o usuário está logado
        const usuario = JSON.parse(localStorage.getItem("usuario"));
        if (!usuario) {
            toast.error("Você precisa estar logado para excluir uma turma!");
            navigate("/login"); // Redireciona para a tela de login
            return;
        }

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
                        <Typography variant="h4">Minhas Turmas</Typography>
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={() => {
                                // Verifica se o usuário está logado antes de redirecionar para a tela de cadastro
                                const usuario = JSON.parse(localStorage.getItem("usuario"));
                                if (!usuario) {
                                    toast.error("Você precisa estar logado para cadastrar uma turma!");
                                    navigate("/login");
                                } else {
                                    navigate("/turmas/cadastrar");
                                }
                            }}
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
                                        onClick={() => {
                                            // Verifica se o usuário está logado antes de redirecionar para a tela de edição
                                            const usuario = JSON.parse(localStorage.getItem("usuario"));
                                            if (!usuario) {
                                                toast.error("Você precisa estar logado para editar uma turma!");
                                                navigate("/login");
                                            } else {
                                                navigate(`/turmas/editar/${turma.id}`, { state: { turma } });
                                            }
                                        }}
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