import React from "react";

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

const Cabecalho: React.FC = () => {
  const location = useLocation();
  return (
    <Box>
      <AppBar position="static">
        <Toolbar>
          <Hidden mdDown={true}>
            <Link href="/dashboard">
              <img src={logo} width="200" height="70" alt="" />
            </Link>
          </Hidden>
          <Box
            ml={2}
            sx={{ flexGrow: 1, fontSize: "20px", color: "secondary.main" }}
          >
            <Box m={0} sx={{ fontSize: "20px", color: "primary.contrastText" }}>
              <Box sx={{ fontSize: "15px", color: "primary.contrastText" }}>
                <strong>Bem vindo,</strong>
              </Box>
              <strong>Fulano</strong>
            </Box>
          </Box>
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
