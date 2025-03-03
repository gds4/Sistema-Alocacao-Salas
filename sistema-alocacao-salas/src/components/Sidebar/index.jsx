import { Drawer, List, ListItem, ListItemIcon, ListItemText, Divider } from "@mui/material";
import { Home, Class, School, MeetingRoom, Group, PersonAdd, Login, Logout } from "@mui/icons-material";
import { Link, useLocation, useNavigate } from "react-router-dom";

function Sidebar() {
  const location = useLocation();
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const usuario = JSON.parse(localStorage.getItem("usuario"));
  const roles = usuario?.roles.map(role => role.descricao) || [];
  const isAuthenticated = !!token;
  const isAdmin = roles.includes("ROLE_ADMIN");
  const isProfessor = roles.includes("ROLE_PROFESSOR");

  if (location.pathname === "/login") return null;
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("usuario");
    navigate("/login");
  };

  const handleLogin = () => {
    navigate("/login");
  };

  return (
    <Drawer
    
      variant="permanent"
      anchor="left"
      sx={{
        width: 240,
        flexShrink: 0,
        [`& .MuiDrawer-paper`]: { width: 240, boxSizing: "border-box" },
      }}
    >
      <List>
        <ListItem button component={Link} to="/">
          <ListItemIcon><Home /></ListItemIcon>
          <ListItemText primary="Home" />
        </ListItem>

        {isAdmin && (
          <>
            <ListItem button component={Link} to="/salas">
              <ListItemIcon><MeetingRoom /></ListItemIcon>
              <ListItemText primary="Salas" />
            </ListItem>
            <ListItem button component={Link} to="/aulas">
              <ListItemIcon><Class /></ListItemIcon>
              <ListItemText primary="Aulas" />
            </ListItem>
            <ListItem button component={Link} to="/disciplinas">
              <ListItemIcon><School /></ListItemIcon>
              <ListItemText primary="Disciplinas" />
            </ListItem>
            <ListItem button component={Link} to="/turmas">
              <ListItemIcon><Group /></ListItemIcon>
              <ListItemText primary="Turmas" />
            </ListItem>
            <ListItem button component={Link} to="/usuario/cadastrar">
              <ListItemIcon><PersonAdd /></ListItemIcon>
              <ListItemText primary="Cadastrar Usuário" />
            </ListItem>
          </>
        )}

        {isProfessor && !isAdmin && (
          <>
            <ListItem button component={Link} to="/aulas">
              <ListItemIcon><Class /></ListItemIcon>
              <ListItemText primary="Aulas" />
            </ListItem>
            <ListItem button component={Link} to="/turmas">
              <ListItemIcon><Group /></ListItemIcon>
              <ListItemText primary="Turmas" />
            </ListItem>
          </>
        )}
      </List>
      
      <Divider />
      
      <List>
        {!isAuthenticated ? (
          <ListItem button onClick={handleLogin} sx={{ cursor: 'pointer' }}>
            <ListItemIcon><Login /></ListItemIcon>
            <ListItemText primary="Login" />
          </ListItem>
        ) : (
          <ListItem button onClick={handleLogout} sx={{ cursor: 'pointer' }}>
            <ListItemIcon><Logout /></ListItemIcon>
            <ListItemText primary="Logout" />
          </ListItem>
        )}
      </List>
    </Drawer>
  );
}

export default Sidebar;