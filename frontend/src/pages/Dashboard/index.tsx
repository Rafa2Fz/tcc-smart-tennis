import React, { useCallback, useEffect, useState } from "react";

import Grid from "@mui/material/Grid";

import { Box, Fab, Typography } from "@mui/material";

import { useUsuario } from "../../hooks/user";
import Cabecalho from "../../components/Cabecalho";
import AgendaAluno from "../../components/AgendaAluno";
import AgendaProfessor from "../../components/AgendaProfessor";

import relogioImage from "../../assets/bolaRelogio.png";
import { Outlet, useLocation, useNavigate } from "react-router-dom";

const Dashboard: React.FC = () => {
  let navigate = useNavigate();
  let { user } = useUsuario();
  const location = useLocation();
  const [showOutlet, setShowOutlet] = useState(false);
  const [title, setTitle] = useState<string>();

  let addTitulo = useCallback((titulo: string) => {
    setTitle(titulo);
  }, []);

  const handleFazerReserva = () => {
    navigate("/cadastroReserva");
  };

  useEffect(() => {
    if (location.pathname !== "/dashboard") {
      setShowOutlet(true);
      setTitle("Dashboard");
    } else {
      setShowOutlet(false);
    }
  }, [location.pathname]);

  return (
    <div>
      <Cabecalho titulo={title} />
      {showOutlet ? (
        <Outlet context={{ addTitulo }} />
      ) : (
        <Grid container direction="column" alignItems="center">
          {user.tipoUsuario.name === "client" && (
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
          )}
          <Grid item>
            <Box mt={5}>
              {user.tipoUsuario.name === "client" ? (
                <AgendaAluno />
              ) : (
                <AgendaProfessor />
              )}
            </Box>
          </Grid>
        </Grid>
      )}
    </div>
  );
};

export default Dashboard;
