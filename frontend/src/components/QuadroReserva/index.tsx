import React from "react";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import Box from "@mui/material/Box";
import { Avatar, Grid } from "@mui/material";

import aulaImage from "../../assets/aula.png";
import raqueteImage from "../../assets/raquete.png";
import { MdOutlineDeleteForever } from "react-icons/md";

const QuadroReserva: React.FC = () => {
  return (
    <Paper elevation={1} sx={{ width: "300px" }}>
      <Grid container alignContent="center" alignItems="center">
        <Grid item>
          <Box ml={1} alignItems="center" alignContent="center">
            <Avatar src={aulaImage} variant="square"></Avatar>
          </Box>
        </Grid>
        <Grid item>
          <Grid container direction="column" alignItems="center">
            <Grid item>
              <Box ml={3}>
                <Typography color="text.primary">Data Reserva:</Typography>
                <Typography color="text.secondary">
                  {new Date().toLocaleString()}
                </Typography>
              </Box>
            </Grid>
            <Grid item>
              <Box mb={1}>
                <Grid container>
                  {Array(4)
                    .fill(1)
                    .map(() => (
                      <Box>
                        <Avatar
                          src={raqueteImage}
                          sx={{ width: 30, height: 30 }}
                          variant="square"
                        ></Avatar>
                      </Box>
                    ))}
                </Grid>
              </Box>
            </Grid>
          </Grid>
        </Grid>
        <Grid item>
          <Box ml={2}>
            <IconButton aria-label="delete">
              <MdOutlineDeleteForever color="black" />
            </IconButton>
          </Box>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default QuadroReserva;
