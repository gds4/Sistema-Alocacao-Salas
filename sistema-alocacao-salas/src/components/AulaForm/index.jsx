import PropTypes from "prop-types";
import { FormControl, InputLabel, Select, MenuItem, Button, Box, Paper } from "@mui/material";
import { useEffect, useState } from "react";

const defaultFormData = {
  diaSemana: "",
  horario: "",
  disciplina: "",
  sala: "",
  duracao: "",
};

const AulaForm = ({ initialData = defaultFormData, onSubmit }) => {
  const [formData, setFormData] = useState(initialData);

  useEffect(() => {
    setFormData(initialData);
  }, [initialData]);

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

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    onSubmit(formData);
  };

  return (
    <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", minHeight: "100vh", padding: 2 }}>
      <Paper elevation={3} sx={{ padding: 4, width: 400 }}>
        <form onSubmit={handleSubmit}>
          <FormControl fullWidth margin="normal">
            <InputLabel shrink>Dia da Semana</InputLabel>
            <Select
              name="diaSemana"
              value={formData.diaSemana}
              onChange={handleChange}
              required
            >
              <MenuItem value="SEGUNDA">SEGUNDA</MenuItem>
              <MenuItem value="TERCA">TERÇA</MenuItem>
              <MenuItem value="QUARTA">QUARTA</MenuItem>
              <MenuItem value="QUINTA">QUINTA</MenuItem>
              <MenuItem value="SEXTA">SEXTA</MenuItem>
              <MenuItem value="SABADO">SÁBADO</MenuItem>
            </Select>
          </FormControl>

          <FormControl fullWidth margin="normal">
            <InputLabel shrink>Horário de Início</InputLabel>
            <Select
              name="horario"
              value={formData.horario}
              onChange={handleChange}
              required
            >
              {horarios.map((horario, index) => (
                <MenuItem key={index} value={horario}>
                  {horario}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <FormControl fullWidth margin="normal">
            <InputLabel shrink>Disciplinas</InputLabel>
            <Select
              name="disciplina"
              value={formData.disciplina}
              onChange={handleChange}
              required
            >
              {disciplinas.map((disc, index) => (
                <MenuItem key={index} value={disc.disciplina}>
                  {disc.disciplina}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <FormControl fullWidth margin="normal">
            <InputLabel shrink>Salas</InputLabel>
            <Select
              name="sala"
              value={formData.sala}
              onChange={handleChange}
              required
            >
              {salas.map((sala, index) => (
                <MenuItem key={index} value={sala.id}>
                  {sala.descricao}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <FormControl fullWidth margin="normal">
            <InputLabel shrink>Duração</InputLabel>
            <Select
              name="duracao"
              value={formData.duracao}
              onChange={handleChange}
              required
            >
              <MenuItem value="50">50 min</MenuItem>
              <MenuItem value="100">100 min</MenuItem>
              <MenuItem value="150">150 min</MenuItem>
              <MenuItem value="200">200 min</MenuItem>
            </Select>
          </FormControl>

          <Button type="submit" variant="contained" color="primary" sx={{ mt: 2, width: "100%" }}>
            Enviar
          </Button>
        </form>
      </Paper>
    </Box>
  );
};

AulaForm.propTypes = {
  initialData: PropTypes.shape({
    diaSemana: PropTypes.string,
    horario: PropTypes.string,
    disciplina: PropTypes.string,
    sala: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    duracao: PropTypes.string,
  }),
  onSubmit: PropTypes.func.isRequired,
};

export default AulaForm;
