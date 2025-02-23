import { useEffect, useState } from "react";
import { Container, TextField, Button, Typography } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import DisciplinaService from "../../services/disciplinaService";

function EditarDisciplina() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [codigo, setCodigo] = useState("");
    const [nome, setNome] = useState("");

    useEffect(() => {
        async function fetchData() {
            const response = await DisciplinaService.buscarDisciplinaPorId(id);
            setCodigo(response.codigo);
            setNome(response.nome);
        }
        fetchData();
    }, [id]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await DisciplinaService.editarDisciplina(id, { codigo, nome });
            toast.success("Disciplina atualizada!");
            navigate("/disciplinas");
        } catch (error) {
            toast.error("Erro ao atualizar disciplina!");
        }
    };

    return (
        <Container>
            <Typography variant="h4">Editar Disciplina</Typography>
            <form onSubmit={handleSubmit}>
                <TextField fullWidth label="Código" value={codigo} onChange={(e) => setCodigo(e.target.value)} margin="normal" />
                <TextField fullWidth label="Nome" value={nome} onChange={(e) => setNome(e.target.value)} margin="normal" />
                <Button type="submit" variant="contained" color="primary">Salvar</Button>
            </form>
        </Container>
    );
}

export default EditarDisciplina;
