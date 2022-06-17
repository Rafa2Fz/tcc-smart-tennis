import React, { useEffect, useState } from "react";

import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";

import logo from "../../assets/logo.png";

import { Avatar, Grid, Hidden, Link } from "@mui/material";
import { BsCoin } from "react-icons/bs";
import { useLocation, useNavigate } from "react-router-dom";
import { useUsuario } from "../../hooks/user";
import { GoChevronLeft } from "react-icons/go";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import { FiLogOut } from "react-icons/fi";

const Cabecalho: React.FC = () => {
  const location = useLocation();
  const { user, logout } = useUsuario();
  const [dashboard, setDashboard] = useState(false);
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  let navigate = useNavigate();

  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    logout();
  };

  useEffect(() => {
    if (location.pathname === "/dashboard") {
      setDashboard(true);
    }
  }, [location.pathname]);

  const handleAbrirCreditoForm = () => {
    navigate("/adicionaCredito");
  };
  const handleAbrirAgendarFolga = () => {
    navigate("/adicionaFolga");
  };
  const handleComprarCredito = () => {
    navigate("/comprarCredito");
  };
  return (
    <Box>
      <AppBar position="static">
        <Toolbar>
          <Grid
            container
            direction="row"
            alignItems="center"
            sx={{ flexGrow: 1 }}
          >
            <Grid item>
              <Hidden smDown={true}>
                <Link href="/dashboard">
                  <img src={logo} width="200" height="70" alt="" />
                </Link>
              </Hidden>
            </Grid>
            {dashboard === false && (
              <Box sx={{ flexGrow: 1 }}>
                <Hidden smUp={true}>
                  <IconButton
                    size="large"
                    edge="start"
                    color="inherit"
                    aria-label="menu"
                    sx={{ mr: 2 }}
                    href="/dashboard"
                  >
                    <GoChevronLeft />
                  </IconButton>
                </Hidden>
              </Box>
            )}
            {dashboard && (
              <Grid item>
                <Box
                  ml={2}
                  sx={{
                    flexGrow: 1,
                    fontSize: "20px",
                    color: "secondary.main",
                  }}
                >
                  <Box
                    m={0}
                    sx={{ fontSize: "20px", color: "primary.contrastText" }}
                  >
                    <Box
                      sx={{ fontSize: "15px", color: "primary.contrastText" }}
                    >
                      <strong>Bem vindo,</strong>
                    </Box>
                    <strong>{user.nome.split(" ")[0]}</strong>
                  </Box>
                </Box>
              </Grid>
            )}
          </Grid>

          {user.tipoUsuario.id === 2 && (
            <Box mr={2}>
              <Grid container direction="column" alignItems="center">
                <Grid item>
                  <BsCoin size={30} />
                </Grid>
                <Grid item>
                  <Box sx={{ fontSize: "15px", color: "primary.contrastText" }}>
                    <strong>{user.credito}</strong>
                  </Box>
                </Grid>
              </Grid>
            </Box>
          )}
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            onClick={handleClick}
          >
            <Avatar sx={{ bgcolor: "secondary.main" }}>
              {user.nome.charAt(0)}
            </Avatar>
          </IconButton>
        </Toolbar>
      </AppBar>
      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: "visible",
            filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",

            "& .MuiAvatar-root": {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
            },
            "&:before": {
              content: '""',
              display: "block",
              position: "absolute",
              top: 0,
              right: 25,
              width: 10,
              height: 10,
              bgcolor: "background.paper",
              transform: "translateY(-50%) rotate(45deg)",
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
      >
        {user.tipoUsuario.name === "admin" && (
          <MenuItem onClick={handleAbrirCreditoForm}>Adiciona Crédito</MenuItem>
        )}
        {user.tipoUsuario.name === "admin" && (
          <MenuItem onClick={handleAbrirAgendarFolga}>Agendar Folga</MenuItem>
        )}
        <MenuItem onClick={handleComprarCredito}>Comprar Crédito</MenuItem>

        <MenuItem onClick={handleLogout}>
          <ListItemIcon>
            <FiLogOut fontSize="small" />
          </ListItemIcon>
          Logout
        </MenuItem>
      </Menu>
    </Box>
  );
};

export default Cabecalho;
