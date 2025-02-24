import { Drawer, List, ListItem, ListItemIcon, ListItemText, Divider } from "@mui/material";
import { Home, Class, School, MeetingRoom, Group } from "@mui/icons-material";
import { Link, useNavigate } from "react-router-dom";

function Sidebar() {
  const isAuthenticated = !!localStorage.getItem("token");
  const navigate = useNavigate();

  const handleLogout = () => {
    // Remove token and user from localStorage
    localStorage.removeItem("token");
    localStorage.removeItem("usuario");

    // Redirect to login page
    navigate("/login");
  };

  if (!isAuthenticated) return null;

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
      </List>

      <Divider />

      <List>
        <ListItem 
          button 
          onClick={handleLogout} 
          sx={{ cursor: 'pointer' }} // Adicionando o cursor pointer
        >
          <ListItemIcon><MeetingRoom /></ListItemIcon>
          <ListItemText primary="Logout" />
        </ListItem>
      </List>
    </Drawer>
  );
}

export default Sidebar;
