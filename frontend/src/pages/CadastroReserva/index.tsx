import React, { useEffect, useState } from "react";

import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import ptLocale from "date-fns/locale/pt";

import api from "../../config/connection";
import { AxiosError } from "axios";

import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import { Box, Stack, Typography } from "@mui/material";
import { Container } from "@mui/material";

import { useToast } from "../../hooks/toast";

const CadastroReserva: React.FC = () => {
  const { addToast } = useToast();
  const [date, setDate] = useState<Date | null>(new Date());
  const [diasIndisponiveis, setDiasIndisponiveis] = useState<number[]>([]);
  const [horasIndisponiveis, setHorasIndisponiveis] = useState<number[]>([]);
  const expediente = [6, 7, 8, 9, 10, 11, 13, 14, 15, 16, 17];
  const expedienteInicio = 6;
  const expedienteFim = 17;

  useEffect(() => {
    const verificarDiasIndisponiveis = async () => {
      try {
        const resposta = await api.post(
          "/reservas/verificarDiasIndisponiveisMes",
          {
            date: {
              ano: date?.getFullYear(),
              mes: date?.getMonth(),
              dia: date?.getDate(),
            },
            quadraId: 1,
          }
        );
        setDiasIndisponiveis(resposta.data);
      } catch (error) {
        const err = error as AxiosError;
        if (err.response) {
          let message = err.response.data;
          addToast({ text: message, type: "error" });
        } else {
          let message = err.message;
          addToast({ text: message, type: "error" });
        }
      }
    };
    if (date) {
      verificarDiasIndisponiveis();
    }
  }, [date, addToast]);

  useEffect(() => {
    const verificaHorasIndisponiveis = async () => {
      try {
        const resposta = await api.post(
          "/reservas/verificaHorasIndisponiveis",
          {
            date: {
              ano: date?.getFullYear(),
              mes: date?.getMonth(),
              dia: date?.getDate(),
            },
            quadraId: 1,
          }
        );
        setHorasIndisponiveis(resposta.data);
      } catch (error) {
        const err = error as AxiosError;
        if (err.response) {
          let message = err.response.data;
          addToast({ text: message, type: "error" });
        } else {
          let message = err.message;
          addToast({ text: message, type: "error" });
        }
      }
    };
    if (date) {
      verificaHorasIndisponiveis();
    }
  }, [date, addToast]);

  const disableDays = (day: Date) => {
    return diasIndisponiveis.includes(day.getDate()) ? true : false;
  };
  const onSubmit = async () => {
    console.log("Bu");
  };
  return (
    <Container maxWidth="xs">
      <Box mt="15px">
        <Grid
          container
          direction="column"
          alignContent="center"
          alignItems="center"
        >
          <Grid item>
            <LocalizationProvider
              dateAdapter={AdapterDateFns}
              locale={ptLocale}
            >
              <DatePicker
                shouldDisableDate={disableDays}
                label="Selecionar Data Reserva"
                openTo="year"
                views={["year", "month", "day"]}
                value={date}
                onMonthChange={(newDate) => {
                  setDate(newDate);
                }}
                onYearChange={(newDate) => {
                  setDate(newDate);
                }}
                disablePast
                onChange={(newDate) => {
                  setDate(newDate);
                }}
                renderInput={(params) => <TextField {...params} />}
              />
            </LocalizationProvider>
          </Grid>
          <Grid item>
            <Grid container flexDirection="column">
              <Grid item>
                <Typography mt={2} variant="h5" component="div">
                  Manhã
                </Typography>
              </Grid>
              <Grid item>
                <Stack spacing={1} direction="row">
                  {expediente.map((valor) => {
                    if (valor < 12) {
                      return horasIndisponiveis.includes(valor) ? (
                        <Button variant="contained" disabled>
                          {valor}
                        </Button>
                      ) : (
                        <Button variant="contained">{valor}</Button>
                      );
                    }
                  })}
                </Stack>
              </Grid>
              <Grid item>
                <Typography mt={2} variant="h5" component="div">
                  Tarde
                </Typography>
              </Grid>
              <Grid item>
                <Stack spacing={1} direction="row">
                  {expediente.map((valor) => {
                    if (valor > 12 && valor <= 17) {
                      return horasIndisponiveis.includes(valor) ? (
                        <Button variant="contained" disabled>
                          {valor}
                        </Button>
                      ) : (
                        <Button variant="contained">{valor}</Button>
                      );
                    }
                  })}
                </Stack>
              </Grid>
            </Grid>
          </Grid>

          <Grid item>
            <Button fullWidth onClick={onSubmit}>
              Enviar
            </Button>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
};

export default CadastroReserva;
