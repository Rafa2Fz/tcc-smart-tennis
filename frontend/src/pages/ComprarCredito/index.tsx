import React, { useCallback, useEffect, useState } from "react";

import Grid from "@mui/material/Grid";

import { Box, Button, Container, Fab, Paper, Typography } from "@mui/material";

import { useToast } from "../../hooks/toast";
import { useUsuario } from "../../hooks/user";
import Cabecalho from "../../components/Cabecalho";

import { BsCoin } from "react-icons/bs";

import { useNavigate } from "react-router-dom";
import api from "../../config/connection";
import { AxiosError } from "axios";
import { Helmet } from "react-helmet";
import coin from "../../assets/coin.png";
import sacoCoin from "../../assets/sacoCoin.png";

const ComprarCredito: React.FC = () => {
  let navigate = useNavigate();
  let { user, logout, atualizarUsuario } = useUsuario();
  const { addToast } = useToast();

  const [preferenceId, setPreferenceId] = useState(null);

  const handleFazerReserva = () => {
    navigate("/cadastroReserva");
  };

  const handleComprarCredito = async (pacote: string) => {
    try {
      const response = await api.post("/pagamento", {
        pacote,
      });
      const { id } = response.data;

      setPreferenceId(id);
      await atualizarUsuario();
    } catch (error) {
      const err = error as AxiosError;

      if (err.response) {
        if (err.response.status === 401) {
          logout();
          let message = err.response.data;
          addToast({ text: message, type: "error" });
        }
        let message = err.response.data;
        addToast({ text: message, type: "error" });
      } else {
        let message = err.message;
        addToast({ text: message, type: "error" });
      }
    }
  };

  let scriptPagamento = useCallback(() => {
    return (
      <script type="text/javascript">
        {`for(let i=0; i<1; i++){
             let mp = new MercadoPago('TEST-00976a2a-2a34-4bbf-bd89-37b7256298ba', {
                locale: 'pt-BR'
              });
              
              // Inicialize o checkout
              mp.checkout({
              preference: {
                  id: '${preferenceId}',
                },
                autoOpen: true
                 
              })
              
        }`}
      </script>
    );
  }, [preferenceId]);

  return (
    <>
      <Cabecalho />
      <Helmet>
        <script src="https://sdk.mercadopago.com/js/v2"></script>
        {preferenceId && scriptPagamento()}
      </Helmet>

      <Container maxWidth="md">
        <Grid
          container
          direction="column"
          alignItems="center"
          alignContent="center"
        >
          <Grid item ml={{ xs: "25%" }}>
            <Grid
              container
              alignContent="center"
              alignItems="center"
              rowSpacing={15}
            >
              <Grid item xs={12} sm={6}>
                <Box width="200px" height="150px" m={1}>
                  <Paper elevation={4}>
                    <Grid
                      container
                      direction="column"
                      alignContent="center"
                      alignItems="center"
                    >
                      <Grid item>
                        <Box mt={1}>
                          <Typography variant="h6">
                            <strong>30 Créditos</strong>
                          </Typography>
                        </Box>
                      </Grid>
                      <Grid item>
                        <Box mt={1}>
                          <img src={coin} alt="" height="80px" width="80px" />
                        </Box>
                      </Grid>
                      <Grid item>
                        <Grid
                          container
                          direction="column"
                          alignItems="center"
                          alignContent="center"
                        >
                          <Box height="50px">
                            <Grid item xs={12}></Grid>
                            <Grid item>
                              <strong>R$30,00</strong>
                            </Grid>
                          </Box>
                        </Grid>
                      </Grid>
                      <Grid item>
                        <Box m={2}>
                          <Button
                            variant="contained"
                            onClick={() => {
                              handleComprarCredito("pacote30");
                            }}
                          >
                            Comprar
                          </Button>
                        </Box>
                      </Grid>
                    </Grid>
                  </Paper>
                </Box>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Box width="200px" height="150px" m={1}>
                  <Paper elevation={4}>
                    <Grid
                      container
                      direction="column"
                      alignContent="center"
                      alignItems="center"
                    >
                      <Grid item>
                        <Box mt={1}>
                          <Typography variant="h6">
                            <strong>100 Créditos</strong>
                          </Typography>
                        </Box>
                      </Grid>
                      <Grid item>
                        <Box mt={1}>
                          <img
                            src={sacoCoin}
                            alt=""
                            height="80px"
                            width="80px"
                          />
                        </Box>
                      </Grid>
                      <Grid item>
                        <Box height="50px">
                          <Grid
                            container
                            direction="column"
                            alignItems="center"
                            alignContent="center"
                          >
                            <Grid item xs={12}>
                              <strong>
                                <s>R$100,00</s>
                              </strong>
                            </Grid>
                            <Grid item>
                              <strong>
                                <text color="green">R$90,00</text>
                              </strong>
                            </Grid>
                          </Grid>
                        </Box>
                      </Grid>
                      <Grid item>
                        <Box m={2}>
                          <Button
                            variant="contained"
                            onClick={() => {
                              handleComprarCredito("pacote100");
                            }}
                          >
                            Comprar
                          </Button>
                        </Box>
                      </Grid>
                    </Grid>
                  </Paper>
                </Box>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Container>
    </>
  );
};
export default ComprarCredito;
