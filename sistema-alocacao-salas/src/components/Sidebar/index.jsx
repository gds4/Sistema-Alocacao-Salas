import { Drawer, List, ListItem, ListItemIcon, ListItemText } from "@mui/material";
import { Home, Class, School, MeetingRoom } from "@mui/icons-material";
import { Link } from "react-router-dom";

function Sidebar() {
  const isAuthenticated = !!localStorage.getItem("token");

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
        <ListItem button component={Link} to="/sala/listar">
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
      </List>
    </Drawer>
  );
}

export default Sidebar;
