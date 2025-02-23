import { useState } from "react";
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
import UsuarioService from "../../services/usuarioService"; // Serviço para cadastrar usuários

function CadastrarUsuario() {
    const navigate = useNavigate();
    const [nome, setNome] = useState("");
    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");
    const [role, setRole] = useState("ROLE_USUARIO"); // Valor padrão: ROLE_USUARIO

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Validação básica dos campos
        if (!nome || !email || !senha || !role) {
            toast.error("Preencha todos os campos!");
            return;
        }

        // Mapeia o papel selecionado para o formato esperado pelo backend
        const roles = [
            {
                id: role === "ROLE_USUARIO" ? 1 : role === "ROLE_PROFESSOR" ? 2 : 3, // IDs mapeados
                descricao: role, // Descrição do papel
            },
        ];

        try {
            const novoUsuario = { nome, email, senha, roles };
            await UsuarioService.cadastrarUsuario(novoUsuario);
            toast.success("Usuário cadastrado com sucesso!");
            navigate("/usuarios"); // Redireciona para a lista de usuários após o cadastro
        } catch (error) {
            console.error(error);
            toast.error("Erro ao cadastrar usuário!");
        }
    };

    const handleVoltar = () => {
        navigate("/usuarios"); // Redireciona para a lista de usuários
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

            <form onSubmit={handleSubmit}>
                {/* Campo para o nome */}
                <TextField
                    fullWidth
                    label="Nome"
                    value={nome}
                    onChange={(e) => setNome(e.target.value)}
                    margin="normal"
                    required
                />

                {/* Campo para o e-mail */}
                <TextField
                    fullWidth
                    label="E-mail"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    margin="normal"
                    required
                />

                {/* Campo para a senha */}
                <TextField
                    fullWidth
                    label="Senha"
                    type="password"
                    value={senha}
                    onChange={(e) => setSenha(e.target.value)}
                    margin="normal"
                    required
                />

                {/* Campo para o role (papel do usuário) */}
                <TextField
                    fullWidth
                    select
                    label="Papel"
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                    margin="normal"
                    required
                >
                    <MenuItem value="ROLE_USUARIO">Usuário</MenuItem>
                    <MenuItem value="ROLE_PROFESSOR">Professor</MenuItem>
                    <MenuItem value="ROLE_ADMIN">Admin</MenuItem>
                </TextField>

                {/* Botões de ação */}
                <Box display="flex" justifyContent="flex-end" marginTop={3}>
                    <Button
                        type="submit"
                        variant="contained"
                        color="primary"
                        style={{ marginRight: "8px" }}
                    >
                        Salvar
                    </Button>
                    <Button
                        variant="contained"
                        color="secondary"
                        onClick={handleVoltar}
                    >
                        Cancelar
                    </Button>
                </Box>
            </form>
        </Container>
    );
}

export default CadastrarUsuario;