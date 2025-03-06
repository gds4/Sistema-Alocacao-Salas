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
import DisciplinaService from "../../../services/disciplinaService";

function Disciplinas() {
    const navigate = useNavigate();
    const [disciplinas, setDisciplinas] = useState([]);

    useEffect(() => {
        const usuario = JSON.parse(localStorage.getItem("usuario"));
        if (!usuario || !usuario.roles.some(role => role.descricao === "ROLE_ADMIN")) {
            navigate("/");
            return;
        }
        carregarDisciplinas();
    }, [navigate]);

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
            // eslint-disable-next-line no-unused-vars
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

            {disciplinas.length > 0 ?<TableContainer component={Paper} sx={{ marginTop: 4, overflowX: 'auto' }}>
                <Table sx={{ '& td, & th': { textAlign: 'center' } }}>
                    <TableHead>
                        <TableRow>
                            <TableCell sx={{ fontWeight: 'bold', backgroundColor: '#f5f5f5', minWidth: '120px' }}>ID</TableCell>
                            <TableCell sx={{ fontWeight: 'bold', backgroundColor: '#f5f5f5', minWidth: '120px' }}>Código</TableCell>
                            <TableCell sx={{ fontWeight: 'bold', backgroundColor: '#f5f5f5', minWidth: '120px' }}>Nome</TableCell>
                            <TableCell sx={{ fontWeight: 'bold', backgroundColor: '#f5f5f5', minWidth: '120px' }}>Ações</TableCell>
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
                                        onClick={() => navigate(`/disciplinas/editar/${disciplina.id}`, { state: { disciplina } })}
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
            :<Box sx={{ width: '100%', boxShadow: 2, borderRadius: disciplinas.length > 0 ? 2 : 0, backgroundColor: '#fff' }}>
                <Typography variant="body1" align="center">Nenhuma disciplina cadastrada.</Typography>
            </Box>
            }
        </Container>
    );
}

export default Disciplinas;
