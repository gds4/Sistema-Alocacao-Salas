import { Button, Container, Typography } from "@mui/material";
import { Link } from "react-router-dom";

function NotFound() {
  return (
    <Container
      maxWidth="md"
      sx={{ textAlign: "center", mt: 10 }}
    >
      <Typography variant="h1" color="error" gutterBottom>
        404
      </Typography>
      <Typography variant="h5" gutterBottom>
        Página Não Encontrada
      </Typography>
      <Typography variant="body1" color="textSecondary" gutterBottom>
        A página que você está procurando não existe ou foi removida.
      </Typography>
      <Button
        variant="contained"
        color="primary"
        component={Link}
        to="/"
        sx={{ mt: 3 }}
      >
        Voltar para a Home
      </Button>
    </Container>
  );
}

export default NotFound;