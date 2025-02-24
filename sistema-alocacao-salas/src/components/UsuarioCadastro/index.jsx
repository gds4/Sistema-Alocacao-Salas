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
    const [role, setRole] = useState("ROLE_PROFESSOR"); // Valor padrão: ROLE_PROFESSOR

    // Verifica se o usuário logado é um admin (possui ROLE_ADMIN)
    useEffect(() => {
        const usuario = JSON.parse(localStorage.getItem("usuario"));
        if (!usuario || !usuario.roles.some((r) => r.descricao === "ROLE_ADMIN")) {
            toast.error("Apenas administradores podem cadastrar usuários!");
            navigate("/"); // Redireciona para a página inicial
        }
    }, [navigate]);

    // Mapeamento dos roles para seus respectivos IDs
    const rolesMap = {
        ROLE_PROFESSOR: 1,
        ROLE_ALUNO: 2,
        ROLE_ADMIN: 3,
    };

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
                id: rolesMap[role], // Usa o mapeamento para obter o ID correto
                descricao: role, // Descrição do papel
            },
        ];

        try {
            const novoUsuario = { nome, email, senha, roles };
            await UsuarioService.cadastrarUsuario(novoUsuario); // Usa o método do service
            toast.success("Usuário cadastrado com sucesso!");
            navigate("/usuarios"); // Redireciona para a lista de usuários após o cadastro
        } catch (error) {
            console.error("Erro ao cadastrar usuário:", error);
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
                    <MenuItem value="ROLE_PROFESSOR">Professor</MenuItem>
                    <MenuItem value="ROLE_ALUNO">Aluno</MenuItem>
                    <MenuItem value="ROLE_ADMIN">Admin</MenuItem>
                </TextField>

                {/* Botões de ação */}
                <Box display="flex" justifyContent="flex-end" marginTop={3}>
                    <Button
                        variant="contained"
                        color="secondary"
                        onClick={handleVoltar}
                        style={{ marginRight: "8px" }} // Adiciona margem à direita
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
        </Container>
    );
}

export default CadastrarUsuario;