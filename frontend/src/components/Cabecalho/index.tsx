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
import { useLocation } from "react-router-dom";
import { useUsuario } from "../../hooks/user";
import { GoChevronLeft } from "react-icons/go";

const Cabecalho: React.FC = () => {
  const location = useLocation();
  const { user } = useUsuario();
  const [dashboard, setDashboard] = useState(false);

  useEffect(() => {
    if (location.pathname === "/dashboard") {
      setDashboard(true);
    }
  }, [location.pathname]);
  return (
    <Box>
      <AppBar position="static">
        <Toolbar>
          {dashboard && (
            <Grid
              container
              direction="row"
              alignItems="center"
              sx={{ flexGrow: 1 }}
            >
              <Grid item>
                <Hidden mdDown={true}>
                  <Link href="/dashboard">
                    <img src={logo} width="200" height="70" alt="" />
                  </Link>
                </Hidden>
              </Grid>
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
            </Grid>
          )}
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
          <Box mr={2}>
            <Grid container direction="column" alignItems="center">
              <Grid item>
                <BsCoin size={30} />
              </Grid>
              <Grid item>
                <Box sx={{ fontSize: "15px", color: "primary.contrastText" }}>
                  <strong>100</strong>
                </Box>
              </Grid>
            </Grid>
          </Box>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <Avatar sx={{ bgcolor: "secondary.main" }}>N</Avatar>
          </IconButton>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default Cabecalho;
