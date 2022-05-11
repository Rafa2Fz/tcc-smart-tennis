import React from "react";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import Box from "@mui/material/Box";
import { Avatar, Grid } from "@mui/material";

import aulaImage from "../../../assets/aula.png";
import raqueteImage from "../../../assets/raquete.png";
import { MdOutlineDeleteForever } from "react-icons/md";
import quadraTennis from "../../../assets/quadraTennis.png";
import aula from "../../../assets/bolaTennis.png";

interface ReservaCardProps {
  nome: string;
  quadraId: number;
  codReserva: number;
}

const ReservaCard: React.FC<ReservaCardProps> = ({
  codReserva,
  nome,
  quadraId,
}) => {
  return (
    <Paper elevation={1} sx={{ width: "200px" }}>
      <Grid container alignContent="center" alignItems="center">
        <Grid item>
          <Box m={1}>
            <Grid container direction="column" alignItems="center">
              <Grid item>
                <Box>
                  <strong>Cod: </strong>
                </Box>
              </Grid>
              <Grid item>
                <Box>{codReserva}</Box>
              </Grid>
            </Grid>
          </Box>
        </Grid>
        <Grid item>
          <Box alignItems="center" alignContent="center">
            <Avatar
              src={quadraId === 1 ? aula : quadraTennis}
              sx={{ width: 30, height: 30 }}
              variant="square"
            />
          </Box>
        </Grid>
        <Grid item sx={{ flexGrow: 1 }}>
          <Grid container direction="row">
            <Grid item sx={{ flexGrow: 1 }}>
              <Box ml={3}>
                <Typography color="text.primary">
                  <strong>{nome}</strong>
                </Typography>
              </Box>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default ReservaCard;
