import React, { useState } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import { CardActionArea, Grid } from "@mui/material";
import quadraTennnis from "../../assets/quadraTennis.png";
import aulaImagem from "../../assets/bolaTennis.png";
import Typography from "@mui/material/Typography";

interface Props {
  quadraId: number;
  onClick?: React.MouseEventHandler<HTMLDivElement> | undefined;
}

const OpcaoQuadra: React.FC<Props> = ({ quadraId, onClick }) => {
  return (
    <Card sx={{ width: "110px", maxWidth: 345 }} square onClick={onClick}>
      <CardActionArea>
        <Grid container alignItems="center" direction="column">
          <Grid item>
            <CardMedia
              component="img"
              height="110px"
              width="80px"
              image={quadraId === 1 ? aulaImagem : quadraTennnis}
              sx={{}}
              alt="Opcao Quadra"
            />
          </Grid>
          <Grid item>
            <CardContent>
              <Typography variant="h5" component="div">
                {quadraId === 1 ? "Aula" : "Aluguel"}
              </Typography>
            </CardContent>
          </Grid>
        </Grid>
      </CardActionArea>
    </Card>
  );
};

export default OpcaoQuadra;
