import React, { useCallback, useEffect, useState } from "react";

import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import ptLocale from "date-fns/locale/pt";

import Stack from "@mui/material/Stack";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import { Box, Divider, Typography } from "@mui/material";

import { AxiosError } from "axios";
import { useUsuario } from "../../hooks/user";
import { useToast } from "../../hooks/toast";
import api from "../../config/connection";

import { format, isFuture, isToday } from "date-fns";

import ReservaCard from "./ReservaCard";
import { FaRegCalendarAlt } from "react-icons/fa";
import CircularProgress from "@mui/material/CircularProgress";

interface ReservaQudara {
  id: number;
  horario: Date;
  quadra: {
    id: number;
    tipo: string;
  };
  personal: boolean;
  usuario: {
    nome: string;
  };
}

const AgendaAluno: React.FC = () => {
  const { logout, user } = useUsuario();
  const { addToast } = useToast();
  const [date, setDate] = useState<Date | null>(new Date());
  const expediente = [6, 7, 8, 9, 10, 11, 13, 14, 15, 16, 17];
  const [dataReserva, setDataReserva] = useState<number[]>([]);
  const [firstLoad, setFirstLoad] = useState<boolean>(true);
  const [reservas, setReservas] = useState<ReservaQudara[] | null>(null);

  const adicionaData = useCallback(() => {
    if (!!reservas) {
      if (reservas.length > 0) {
        for (let i = 0; i < reservas.length; i++) {
          let data = new Date(reservas[i].horario);
          let ano = data.getFullYear();
          let mes = data.getMonth();
          let dia = data.getDate();

          let novaData = new Date(ano, mes, dia, 0, 0, 0, 0);
          const st = novaData.valueOf();

          if (isFuture(data)) {
            if (!dataReserva.includes(st)) {
              setDataReserva([...dataReserva, st]);
            }
          }
        }
      }
    }
  }, [reservas, dataReserva]);

  const buscarReservasAlunos = async () => {
    try {
      const response = await api.post("/reservas/buscarReservasAluno");

      setReservas(response.data);
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

  useEffect(() => {
    adicionaData();
    if (firstLoad) {
      buscarReservasAlunos();
      setFirstLoad(false);
    }
  }, [firstLoad, adicionaData, addToast, logout]);

  const verificaExpedienteHora = useCallback(
    (hora: number, data: number): boolean => {
      if (!!reservas) {
        if (reservas.length > 0) {
          for (let i = 0; i < reservas.length; i++) {
            let dataReserva = new Date(reservas[i].horario);
            let ano = dataReserva.getFullYear();
            let mes = dataReserva.getMonth();
            let dia = dataReserva.getDate();
            let dataSemHora = new Date(ano, mes, dia, 0, 0, 0, 0);
            let horaReserva = 0;
            process.env.NODE_ENV === "development"
              ? (horaReserva = dataReserva.getHours())
              : (horaReserva = dataReserva.getUTCHours());
            if (isFuture(dataReserva)) {
              if (dataSemHora.valueOf() === data) {
                if (hora === horaReserva) {
                  return true;
                }
              }
            }
          }
        }
      }
      return false;
    },
    [reservas]
  );

  const verificarHorasIguais = (hora: number, data: number) => {
    if (!!reservas) {
      if (reservas.length > 0) {
        return reservas.map((reserva) => {
          let dataReserva = new Date(reserva.horario);
          let horaReserva = 0;
          let ano = dataReserva.getFullYear();
          let mes = dataReserva.getMonth();
          let dia = dataReserva.getDate();
          const dataSemHorario = new Date(ano, mes, dia, 0, 0, 0, 0);
          process.env.NODE_ENV === "development"
            ? (horaReserva = dataReserva.getHours())
            : (horaReserva = dataReserva.getUTCHours());

          if (dataSemHorario.valueOf() === data) {
            if (hora === horaReserva) {
              let nome = reserva.usuario.nome;
              let quadraId = reserva.quadra.id;
              return (
                <Box key={hora + "b"}>
                  <ReservaCard
                    codReserva={reserva.id}
                    quadraId={reserva.quadra.id}
                    nome={reserva.quadra.tipo}
                  />
                </Box>
              );
            }
          }
        });
      }
    }
  };

  const horasAgendadas = (hora: number, data: number) => {
    return (
      <Grid container direction="column" item key={hora + "a"}>
        <Grid item>
          <Box
            sx={{
              width: "70px",
              backgroundColor: "secondary.main",
              border: "1px transparent",
              borderRadius: "15px",
            }}
          >
            <Typography m={1} color="primary.contrastText" variant="h6">
              {format(new Date().setHours(hora), "HH:00")}
            </Typography>
          </Box>
        </Grid>
        <Grid>
          <Box ml={7} mt={1}>
            <Stack spacing={1}>{verificarHorasIguais(hora, data)}</Stack>
          </Box>
        </Grid>
      </Grid>
    );
  };

  const exibirStatusReservas = () => {
    if (!reservas) {
      return <CircularProgress />;
    }

    return reservas.length > 0 ? (
      <Typography variant="h4">Suas Reservas 🤗</Typography>
    ) : (
      <Typography variant="h5">Você não possui reservas 😞</Typography>
    );
  };
  return (
    <div>
      <LocalizationProvider dateAdapter={AdapterDateFns} locale={ptLocale}>
        <Grid
          container
          direction="column"
          alignContent="center"
          alignItems="center"
        >
          <Grid item>{exibirStatusReservas()}</Grid>
          {dataReserva.length > 0 &&
            dataReserva.map((data, index) => (
              <Grid item xs={12} width="300px" key={`${data} ${index}`}>
                <Box
                  m={3}
                  sx={{
                    backgroundColor: "#f1e2e2",
                    borderTop: "1px solid black",
                    borderBottom: "1px solid black",
                  }}
                >
                  <Grid container direction="column" alignItems="center">
                    <Grid item>
                      <Grid container direction="row" alignItems="center">
                        <Box mr={1}>
                          <Grid item>
                            <FaRegCalendarAlt size={25} />
                          </Grid>
                        </Box>
                        <Grid item>
                          <Typography variant="h5">
                            {`${format(new Date(data) as Date, "dd", {
                              locale: ptLocale,
                            })} de ${format(new Date(data), "MMMM", {
                              locale: ptLocale,
                            })}`}
                          </Typography>
                        </Grid>
                      </Grid>
                    </Grid>
                  </Grid>
                </Box>
                {expediente.map((hora) => {
                  return (
                    verificaExpedienteHora(hora, data) &&
                    horasAgendadas(hora, data)
                  );
                })}
              </Grid>
            ))}
        </Grid>
      </LocalizationProvider>
    </div>
  );
};

export default AgendaAluno;
