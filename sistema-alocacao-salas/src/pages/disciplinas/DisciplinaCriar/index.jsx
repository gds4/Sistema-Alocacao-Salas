import { useEffect, useState } from "react";
import { Container, TextField, Button, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import DisciplinaService from "../../../services/disciplinaService";

function CriarDisciplina() {
    const [codigo, setCodigo] = useState("");
    const [nome, setNome] = useState("");
    const navigate = useNavigate();

    useEffect(()=>{
        const usuario = JSON.parse(localStorage.getItem("usuario"));
        if (!usuario || !usuario.roles.some(role => role.descricao === "ROLE_ADMIN")) {
            navigate("/");
            return;
        }
    },[navigate])

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const disciplina = {codigo, nome};
            await DisciplinaService.cadastrarDisciplina(disciplina);
            toast.success("Disciplina criada com sucesso!");
            navigate("/disciplinas");
        // eslint-disable-next-line no-unused-vars
        } catch (error) {
            toast.error("Erro ao criar disciplina!");
        }
    };

    const handleVoltar = () => {
        navigate("/disciplinas");
    };

    return (
        <Container>
            <Typography variant="h4">Criar Disciplina</Typography>
            <form onSubmit={handleSubmit}>
                <TextField fullWidth label="Código" value={codigo} onChange={(e) => setCodigo(e.target.value)} margin="normal" />
                <TextField fullWidth label="Nome" value={nome} onChange={(e) => setNome(e.target.value)} margin="normal" />
                <div style={{ marginTop: '16px' }}>
                    <Button type="submit" variant="contained" color="primary" style={{ marginRight: '8px' }}>Salvar</Button>
                    <Button variant="contained" color="secondary" onClick={handleVoltar}>Voltar</Button>
                </div>
            </form>
        </Container>
    );
}

export default CriarDisciplina;