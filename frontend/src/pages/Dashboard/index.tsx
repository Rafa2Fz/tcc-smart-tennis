import React, { useEffect, useState } from "react";

import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import ptLocale from "date-fns/locale/pt";

import Stack from "@mui/material/Stack";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import { Box, Fab, Typography } from "@mui/material";

import { AxiosError } from "axios";
import api from "../../config/connection";

import QuadroReserva from "../../components/QuadroReserva";
import { useToast } from "../../hooks/toast";
import { useUsuario } from "../../hooks/user";
import Cabecalho from "../../components/Cabecalho";
import AgendaAluno from "../../components/AgendaAluno";
import AgendaProfessor from "../../components/AgendaProfessor";
import { IoMdAddCircle } from "react-icons/io";

import relogioImage from "../../assets/bolaRelogio.png";
import { useNavigate } from "react-router-dom";

const Dashboard: React.FC = () => {
  const { logout, user } = useUsuario();
  const { addToast } = useToast();

  let navigate = useNavigate();

  const handleFazerReserva = () => {
    navigate("/cadastroReserva");
  };

  return (
    <div>
      <Cabecalho />
      <Grid container direction="column" alignItems="center">
        <Grid item>
          <Box mt={1}>
            <Fab
              color="primary"
              variant="extended"
              aria-label="add"
              sx={{ height: "60px" }}
              onClick={handleFazerReserva}
            >
              <Grid container alignItems="center">
                <Grid item>
                  <img
                    src={relogioImage}
                    alt="Fazer Reserva"
                    width="50px"
                    height="50px"
                  />
                </Grid>
                <Grid item>
                  <Typography>
                    <strong>Fazer Reserva</strong>
                  </Typography>
                </Grid>
              </Grid>
            </Fab>
          </Box>
        </Grid>
        <Grid item>
          <Box mt={5}>
            <AgendaProfessor />
          </Box>
        </Grid>
      </Grid>
    </div>
  );
};

export default Dashboard;
