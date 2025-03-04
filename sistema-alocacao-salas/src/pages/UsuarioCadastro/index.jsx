import { useState, useEffect } from "react";
import {
    Container,
    TextField,
    Button,
    Typography,
    MenuItem,
    Box,
    Card,
    CardContent,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import UsuarioService from "../../services/usuarioService";

function CadastrarUsuario() {
    const navigate = useNavigate();
    const [nome, setNome] = useState("");
    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");
    const [role, setRole] = useState("ROLE_PROFESSOR");


    useEffect(() => {
        const usuario = JSON.parse(localStorage.getItem("usuario"));
        if (!usuario || !usuario.roles.some((r) => r.descricao === "ROLE_ADMIN")) {
            navigate("/");
        }
    }, [navigate]);


    const rolesMap = {
        ROLE_PROFESSOR: 1,
        ROLE_ALUNO: 2,
        ROLE_ADMIN: 3,
    };

    const handleSubmit = async (e) => {
        e.preventDefault();


        if (!nome || !email || !senha || !role) {
            toast.error("Preencha todos os campos!");
            return;
        }


        const roles = [
            {
                id: rolesMap[role],
                descricao: role,
            },
        ];

        try {
            const novoUsuario = { nome, email, senha, roles };
            await UsuarioService.cadastrarUsuario(novoUsuario);
            toast.success("Usuário cadastrado com sucesso!");
            navigate("/");
        } catch (error) {
            console.error("Erro ao cadastrar usuário:", error);
            toast.error("Erro ao cadastrar usuário!");
        }
    };

    const handleVoltar = () => {
        navigate("/");
    };

    return (
        <Container>
            <Card sx={{ marginBottom: 3, padding: 2 }}>
                <CardContent>
                    <Box display="flex" justifyContent="space-between" alignItems="center">
                        <Typography variant="h4">Cadastrar Usuário</Typography>
                        <Button
                            variant="contained"
                            color="secondary"
                            onClick={handleVoltar}
                        >
                            Voltar
                        </Button>
                    </Box>
                </CardContent>
            </Card>

            <Card sx={{ padding: 3 }}>
                <CardContent>
                    <form onSubmit={handleSubmit}>
                        <TextField
                            fullWidth
                            label="Nome"
                            value={nome}
                            onChange={(e) => setNome(e.target.value)}
                            margin="normal"
                            required
                        />

                        <TextField
                            fullWidth
                            label="E-mail"
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            margin="normal"
                            required
                        />

                        <TextField
                            fullWidth
                            label="Senha"
                            type="password"
                            value={senha}
                            onChange={(e) => setSenha(e.target.value)}
                            margin="normal"
                            required
                        />

                        <TextField
                            fullWidth
                            select
                            label="Papel"
                            value={role}
                            onChange={(e) => setRole(e.target.value)}
                            margin="normal"
                            required
                        >
                            <MenuItem value="ROLE_PROFESSOR">Professor</MenuItem>
                            <MenuItem value="ROLE_ALUNO">Aluno</MenuItem>
                            <MenuItem value="ROLE_ADMIN">Admin</MenuItem>
                        </TextField>

                        <Box display="flex" justifyContent="flex-end" marginTop={3}>
                            <Button
                                variant="contained"
                                color="secondary"
                                onClick={handleVoltar}
                                style={{ marginRight: "8px" }}
                            >
                                Cancelar
                            </Button>
                            <Button
                                type="submit"
                                variant="contained"
                                color="primary"
                            >
                                Salvar
                            </Button>
                        </Box>
                    </form>
                </CardContent>
            </Card>
        </Container>
    );
}

export default CadastrarUsuario;