import { Drawer, List, ListItem, ListItemIcon, ListItemText, Divider, IconButton, Box } from "@mui/material";
import { Home, Class, School, MeetingRoom, Group, PersonAdd, Login, Logout, ChevronLeft, Menu } from "@mui/icons-material";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";

function Sidebar() {
  const location = useLocation();
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const usuario = JSON.parse(localStorage.getItem("usuario"));
  const roles = usuario?.roles.map(role => role.descricao) || [];
  const isAuthenticated = !!token;
  const isAdmin = roles.includes("ROLE_ADMIN");
  const isProfessor = roles.includes("ROLE_PROFESSOR");

  const [open, setOpen] = useState(true);

  const listItemIconSX = {
    color: "#FFFFFF",
    minWidth: open ? 56 : "auto",
    display: "flex",
    justifyContent: open ? "flex-start" : "center",
  }

  const handleToggle = () => {
    setOpen(!open);
  };

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
    <>
      <Drawer
        variant="permanent"
        anchor="left"
        open={open}
        sx={{
          width: open ? 240 : 60,
          flexShrink: 0,
          transition: "width 0.3s ease",
          [`& .MuiDrawer-paper`]: {
            width: open ? 240 : 60,
            boxSizing: "border-box",
            backgroundColor: "#1E1E1E",
            color: "#FFFFFF",
            transition: "width 0.3s ease",
            overflowX: "hidden",
          },
        }}
      >
        <Box sx={{ display: "flex", justifyContent: open ? "flex-end" : "center", width: "100%", padding: "8px" }}>
          <IconButton onClick={handleToggle} sx={{ color: "#FFFFFF" }}>
            {open ? <ChevronLeft /> : <Menu />}
          </IconButton>
        </Box>

        <List>
          <ListItem button component={Link} to="/">
            <ListItemIcon
              sx={listItemIconSX}
            >
              <Home />
            </ListItemIcon>
            {open && <ListItemText primary="Home" sx={{ color: "#FFFFFF" }} />}
          </ListItem>

          {isAdmin && (
            <>
              <ListItem button component={Link} to="/salas">
                <ListItemIcon
                  sx={listItemIconSX}
                >
                  <MeetingRoom />
                </ListItemIcon>
                {open && <ListItemText primary="Salas" sx={{ color: "#FFFFFF" }} />}
              </ListItem>
              <ListItem button component={Link} to="/aulas">
                <ListItemIcon
                  sx={listItemIconSX}
                >
                  <Class />
                </ListItemIcon>
                {open && <ListItemText primary="Aulas" sx={{ color: "#FFFFFF" }} />}
              </ListItem>
              <ListItem button component={Link} to="/disciplinas">
                <ListItemIcon
                  sx={listItemIconSX}
                >
                  <School />
                </ListItemIcon>
                {open && <ListItemText primary="Disciplinas" sx={{ color: "#FFFFFF" }} />}
              </ListItem>
              <ListItem button component={Link} to="/turmas">
                <ListItemIcon
                  sx={listItemIconSX}
                >
                  <Group />
                </ListItemIcon>
                {open && <ListItemText primary="Turmas" sx={{ color: "#FFFFFF" }} />}
              </ListItem>
              <ListItem button component={Link} to="/usuario/cadastrar">
                <ListItemIcon
                  sx={listItemIconSX}
                >
                  <PersonAdd />
                </ListItemIcon>
                {open && <ListItemText primary="Cadastrar Usuário" sx={{ color: "#FFFFFF" }} />}
              </ListItem>
            </>
          )}

          {isProfessor && !isAdmin && (
            <>
              <ListItem button component={Link} to="/aulas">
                <ListItemIcon
                  sx={{
                    color: "#FFFFFF",
                    minWidth: open ? 56 : "auto",
                    display: "flex",
                    justifyContent: open ? "flex-start" : "center",
                  }}
                >
                  <Class />
                </ListItemIcon>
                {open && <ListItemText primary="Aulas" sx={{ color: "#FFFFFF" }} />}
              </ListItem>
              <ListItem button component={Link} to="/turmas">
                <ListItemIcon
                  sx={listItemIconSX}
                >
                  <Group />
                </ListItemIcon>
                {open && <ListItemText primary="Turmas" sx={{ color: "#FFFFFF" }} />}
              </ListItem>
            </>
          )}
        </List>

        <Divider sx={{ backgroundColor: "#FFFFFF" }} />

        <List>
          {!isAuthenticated ? (
            <ListItem button onClick={handleLogin} sx={{ cursor: 'pointer' }}>
              <ListItemIcon
                sx={listItemIconSX}
              >
                <Login />
              </ListItemIcon>
              {open && <ListItemText primary="Login" sx={{ color: "#FFFFFF" }} />}
            </ListItem>
          ) : (
            <ListItem button onClick={handleLogout} sx={{ cursor: 'pointer' }}>
              <ListItemIcon
                sx={listItemIconSX}
              >
                <Logout />
              </ListItemIcon>
              {open && <ListItemText primary="Logout" sx={{ color: "#FFFFFF" }} />}
            </ListItem>
          )}
        </List>
      </Drawer>
    </>
  );
}

export default Sidebar;