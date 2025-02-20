import { Container, FormControl, InputLabel, Select, MenuItem, Button, Typography } from "@mui/material"

function Aula() {
    

    const disciplinas = [
        { turmaId: 1, disciplina: "INF008", semestre: "2025.1" },
        { turmaId: 2, disciplina: "INF012", semestre: "2025.1" },
        { turmaId: 3, disciplina: "INF022", semestre: "2025.1" },
        { turmaId: 4, disciplina: "INF019", semestre: "2025.1" },
    ];

    const horarios = ["17:00", "17:50", "18:40", "19:30", "20:20", "21:10"];

    const salas = [
        { id: 1, descricao: "Lab 03" },
        { id: 2, descricao: "Lab 02" },
        { id: 3, descricao: "Lab 45" },
    ];

    

    return (
        <Container sx={{ mt: 4 }}>
            <Typography variant="h5" gutterBottom>
                Agendar Aula
            </Typography>
            <form>
                <FormControl fullWidth margin="normal">
                    <InputLabel>Dia da Semana</InputLabel>
                    <Select required>
                        <MenuItem value="SEGUNDA">SEGUNDA</MenuItem>
                        <MenuItem value="TERCA">TERÇA</MenuItem>
                        <MenuItem value="QUARTA">QUARTA</MenuItem>
                        <MenuItem value="QUINTA">QUINTA</MenuItem>
                        <MenuItem value="SEXTA">SEXTA</MenuItem>
                        <MenuItem value="SABADO">SÁBADO</MenuItem>
                    </Select>
                </FormControl>

                <FormControl fullWidth margin="normal">
                    <InputLabel>Horário de Início</InputLabel>
                    <Select required>
                        {horarios.map((horario, index) => (
                            <MenuItem key={index} value={horario}>
                                {horario}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>

                <FormControl fullWidth margin="normal">
                    <InputLabel>Disciplinas</InputLabel>
                    <Select required>
                        {disciplinas.map((disc, index) => (
                            <MenuItem key={index} value={disc.disciplina}>
                                {disc.disciplina}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>

                <FormControl fullWidth margin="normal">
                    <InputLabel>Salas</InputLabel>
                    <Select required>
                        {salas.map((sala, index) => (
                            <MenuItem key={index} value={sala.id}>
                                {sala.descricao}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>

                <FormControl fullWidth margin="normal">
                    <InputLabel>Duração</InputLabel>
                    <Select required>
                        <MenuItem value="50">50 min</MenuItem>
                        <MenuItem value="100">100 min</MenuItem>
                        <MenuItem value="150">150 min</MenuItem>
                        <MenuItem value="200">200 min</MenuItem>
                    </Select>
                </FormControl>

                <Button type="submit" variant="contained" color="primary" sx={{ mt: 2 }}>
                    Enviar
                </Button>
            </form>
        </Container>
    );
}

export default Aula;