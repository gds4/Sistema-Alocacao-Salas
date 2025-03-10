import PropTypes from "prop-types";
import { TextField, MenuItem, Button, Box, Paper } from "@mui/material";
import { useState } from "react";

const defaultFormData = {
  diaSemana: "",
  horarioInicio: "",
  turmaId: "",
  salaId: "",
  duracao: 50,
  professorId: "",
};

const diasSemana = [
  { key: "SEGUNDA", label: "Segunda-feira" },
  { key: "TERCA", label: "Terça-feira" },
  { key: "QUARTA", label: "Quarta-feira" },
  { key: "QUINTA", label: "Quinta-feira" },
  { key: "SEXTA", label: "Sexta-feira" },
];

const duracoes = [50, 100, 150, 200];
const horarios = ["17:00", "17:50", "18:40", "19:30", "20:20", "21:10"];

function AulaForm({ formData = defaultFormData, onChange, turmas, salas, professores, isAdmin, onSubmit }) {

  const [errors, setErrors] = useState({});


  const handleChange = (event) => {
    const { name, value } = event.target;
    onChange(name, value);
    setErrors((prev) => ({ ...prev, [name]: undefined }));
  };

  const validate = () => {
    const newErrors = {};
    const inicioEmMinutos = formData.horarioInicio
      ? parseInt(formData.horarioInicio.split(":")[0]) * 60 + parseInt(formData.horarioInicio.split(":")[1])
      : null;
    const fimEmMinutos = inicioEmMinutos + formData.duracao;

    if (isAdmin && !formData.professorId) newErrors.professorId = "Campo obrigatório";
    if (!formData.diaSemana) newErrors.diaSemana = "Campo obrigatório";
    if (!formData.horarioInicio) newErrors.horarioInicio = "Campo obrigatório";
    if (!formData.turmaId) newErrors.turmaId = "Campo obrigatório";
    if (!formData.salaId) newErrors.salaId = "Campo obrigatório";

    if (formData.duracao % 50 !== 0) {
      newErrors.duracao = "A duração deve ser múltiplo de 50 minutos";
    }

    if (inicioEmMinutos < 1020 || inicioEmMinutos > 1270) {
      newErrors.horarioInicio = "O horário deve estar entre 17:00 e 21:10";
    }

    if (fimEmMinutos > 1320) {
      newErrors.horarioInicio = "O horário de término não pode ultrapassar 22:00";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };



  const handleSubmit = (event) => {
    event.preventDefault();
    if (validate()) {
      onSubmit(formData);
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
        padding: 2,
        width: "100%",
      }}
    >
      <Paper
        elevation={3}
        sx={{
          padding: 4,
          width: "100%",
          maxWidth: 800,
          boxSizing: "border-box",
        }}
      >


        <form onSubmit={handleSubmit}>

          {isAdmin && (
            <TextField
              select
              label="Professor"
              name="professorId"
              value={formData.professorId || ""}
              onChange={handleChange}
              fullWidth
              margin="normal"
              error={!!errors.professorId}
              helperText={errors.professorId}
            >
              {professores.map((professor) => (
                <MenuItem key={professor.id} value={professor.id}>
                  {professor.nome}
                </MenuItem>
              ))}
            </TextField>
          )}
          <TextField
            select
            label="Dia da Semana"
            name="diaSemana"
            value={formData.diaSemana}
            onChange={handleChange}
            fullWidth
            margin="normal"
            error={!!errors.diaSemana}
            helperText={errors.diaSemana}
          >
            {diasSemana.map((dia) => (
              <MenuItem key={dia.key} value={dia.key}>
                {dia.label}
              </MenuItem>
            ))}
          </TextField>

          <TextField
            select
            label="Horário de Início"
            name="horarioInicio"
            value={formData.horarioInicio}
            onChange={handleChange}
            fullWidth
            margin="normal"
            error={!!errors.horarioInicio}
            helperText={errors.horarioInicio}
          >
            {horarios.map((horario, index) => (
              <MenuItem key={index} value={horario}>
                {horario}
              </MenuItem>
            ))}
          </TextField>

          <TextField
            select
            label="Turmas"
            name="turmaId"
            value={formData.turmaId}
            onChange={handleChange}
            fullWidth
            margin="normal"
            error={!!errors.turmaId}
            helperText={errors.turmaId}
          >
            {turmas.map((turma) => (
              <MenuItem key={turma.id} value={turma.id}>
                {`T${turma.id} - ${turma.disciplinaDTO.codigo}`}
              </MenuItem>
            ))}
          </TextField>

          <TextField
            select
            label="Salas"
            name="salaId"
            value={formData.salaId}
            onChange={handleChange}
            fullWidth
            margin="normal"
            error={!!errors.salaId}
            helperText={errors.salaId}
          >
            {salas.map((sala) => (
              <MenuItem key={sala.id} value={sala.id}>
                {sala.nome}
              </MenuItem>
            ))}
          </TextField>

          <TextField
            select
            label="Duração (minutos)"
            name="duracao"
            value={formData.duracao}
            onChange={handleChange}
            fullWidth
            margin="normal"
            error={!!errors.duracao}
            helperText={errors.duracao}
          >
            {duracoes.map((duracao) => (
              <MenuItem key={duracao} value={duracao}>
                {duracao} min
              </MenuItem>
            ))}
          </TextField>

          <Button type="submit" variant="contained" color="primary" sx={{ mt: 2, width: "100%" }}>
            Enviar
          </Button>
        </form>
      </Paper>
    </Box>
  );
};
AulaForm.propTypes = {

  formData: PropTypes.shape({
    diaSemana: PropTypes.string,
    horarioInicio: PropTypes.string,
    turmaId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    salaId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    duracao: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    professorId: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
  }),
  onChange: PropTypes.func.isRequired,
  turmas: PropTypes.arrayOf(
    PropTypes.shape({
      turmaId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
      disciplina: PropTypes.string,
      semestre: PropTypes.string,
    })
  ).isRequired,
  salas: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
      descricao: PropTypes.string,
    })
  ).isRequired,
  onSubmit: PropTypes.func.isRequired,
  isAdmin: PropTypes.bool.isRequired,
  professores: PropTypes.arrayOf(PropTypes.shape({ id: PropTypes.number, nome: PropTypes.string })),
};

export default AulaForm;
