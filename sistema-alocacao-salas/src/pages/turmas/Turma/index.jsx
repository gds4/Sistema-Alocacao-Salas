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
import TurmaService from "../../../services/turmaService";

function Turmas() {
    const navigate = useNavigate();
    const [turmas, setTurmas] = useState([]);
    const [tituloPagina, setTituloPagina] = useState('Minhas Turmas')

    useEffect(() => {

        carregarTurmas();
    }, [navigate]);

    const carregarTurmas = async () => {
        try {
            const usuario = JSON.parse(localStorage.getItem("usuario"));
            let response = ''
            if (usuario.roles.some(role => role.descricao === "ROLE_ADMIN")) {
                response = await TurmaService.listarTurmas();
                setTituloPagina('Turmas Cadastradas')
            } else {
                response = await TurmaService.listarTurmasPorProfessor(usuario.id);
            }
            setTurmas(response);
        } catch (error) {
            console.error(error);
            toast.error("Erro ao carregar turmas!");
        }
    };

    const handleDelete = async (id) => {
        const usuario = JSON.parse(localStorage.getItem("usuario"));
        if (!usuario) {
            toast.error("Você precisa estar logado para excluir uma turma!");
            navigate("/login");
            return;
        }

        try {
            await TurmaService.excluirTurma(id);
            setTurmas((prev) => prev.filter((turma) => turma.id !== id));
            toast.success("Turma removida com sucesso!");
            // eslint-disable-next-line no-unused-vars
        } catch (error) {
            toast.error("Erro ao excluir turma!");
        }
    };

    return (
        <Container>
            <Card sx={{ marginBottom: 3, padding: 2 }}>
                <CardContent>
                    <Box display="flex" justifyContent="space-between" alignItems="center">
                        <Typography variant="h4">{tituloPagina}</Typography>
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={() => {

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

            {turmas.length > 0 ? <TableContainer component={Paper} sx={{ marginTop: 4, overflowX: 'auto' }}>
                <Table sx={{ '& td, & th': { textAlign: 'center' } }}>
                    <TableHead>
                        <TableRow>
                            <TableCell sx={{ fontWeight: 'bold', backgroundColor: '#f5f5f5', minWidth: '120px' }}>ID</TableCell>
                            <TableCell sx={{ fontWeight: 'bold', backgroundColor: '#f5f5f5', minWidth: '120px' }}>Disciplina</TableCell>
                            <TableCell sx={{ fontWeight: 'bold', backgroundColor: '#f5f5f5', minWidth: '120px' }}>Semestre</TableCell>
                            <TableCell sx={{ fontWeight: 'bold', backgroundColor: '#f5f5f5', minWidth: '120px' }}>ID do Professor</TableCell>
                            <TableCell sx={{ fontWeight: 'bold', backgroundColor: '#f5f5f5', minWidth: '120px' }}>Ações</TableCell>
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
                : <Box sx={{ width: '100%', boxShadow: 2, borderRadius: turmas.length > 0 ? 2 : 0, backgroundColor: '#fff' }}>
                    <Typography variant="body1" align="center">Nenhuma turma cadastrada.</Typography>
                </Box>
            }
        </Container>
    );
}

export default Turmas;