import React from "react";
import Paper from "@mui/material/Paper";

import Box from "@mui/material/Box";
import { Avatar, Grid } from "@mui/material";
import Typography from "@mui/material/Typography";

import quadraTennis from "../../../assets/quadraTennis.png";
import aula from "../../../assets/bolaTennis.png";

import api from "../../../config/connection";

interface AlunoCardProps {
  nome: string;
  quadraId: number;
  avatar_url: string | null;
}

const AlunoCard: React.FC<AlunoCardProps> = ({
  avatar_url,
  nome,
  quadraId,
}) => {
  return (
    <Paper elevation={1} sx={{ width: "250px" }}>
      <Grid container alignContent="center" alignItems="center">
        <Grid item>
          <Box ml={1} alignItems="center" alignContent="center">
            <Avatar
              variant="circular"
              src={`${api.defaults.baseURL}${avatar_url}`}
            >
              {nome.charAt(0)}
            </Avatar>
          </Box>
        </Grid>
        <Grid item sx={{ flexGrow: 1 }}>
          <Grid container direction="column">
            <Grid item>
              <Box ml={1}>
                <Typography variant="body1" color="text.primary">
                  <strong>
                    {`${nome.split(" ")[0]} ${nome.split(" ")[1]}`}
                  </strong>
                </Typography>
              </Box>
            </Grid>
          </Grid>
        </Grid>
        <Grid item>
          <Box m={1}>
            <Avatar
              src={quadraId === 1 ? aula : quadraTennis}
              sx={{ width: 30, height: 30 }}
              variant="square"
            />
          </Box>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default AlunoCard;
