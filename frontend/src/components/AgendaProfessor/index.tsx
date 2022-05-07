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
import AlunoCard from "./AlunoCard";
import { format } from "date-fns";
import { utcToZonedTime } from "date-fns-tz";

interface ReservaQudara {
  id: string;
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

const AgendaProfessor: React.FC = () => {
  const { logout } = useUsuario();
  const { addToast } = useToast();
  const [date, setDate] = useState<Date | null>(new Date());
  const expediente = [6, 7, 8, 9, 10, 11, 13, 14, 15, 16, 17];
  const [reservas, setReservas] = useState<ReservaQudara[]>([]);

  useEffect(() => {
    const buscarReservasAlunos = async () => {
      try {
        const response = await api.post("/reservas/buscarReservasAlunosDia", {
          date: {
            ano: date?.getFullYear(),
            mes: date?.getMonth(),
            dia: date?.getDate(),
          },
        });

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
    if (date) {
      buscarReservasAlunos();
    }
  }, [date, logout, addToast]);

  const verificaExpedienteHora = useCallback(
    (hora: number): boolean => {
      if (reservas.length > 0) {
        for (let i = 0; i < reservas.length; i++) {
          const timeZone = "America/Sao_Paulo";
          const zonedDate = new Date(reservas[i].horario);

          if (hora === zonedDate.getHours()) {
            return true;
          }
        }
      }
      return false;
    },
    [reservas]
  );

  const verificarHorasIguais = (hora: number) => {
    if (reservas.length > 0) {
      return reservas.map((reserva) => {
        const timeZone = "America/Sao_Paulo";
        const zonedDate = new Date(reserva.horario);
        console.log(reserva);
        console.log(hora);
        console.log(zonedDate, "zonedDate");

        if (hora === zonedDate.getHours()) {
          let nome = reserva.usuario.nome;
          let quadraId = reserva.quadra.id;
          return (
            <Box>
              <AlunoCard nome={nome} quadraId={quadraId} />
            </Box>
          );
        }
      });
    }
  };

  const element1 = (hora: number) => {
    return (
      <>
        <Grid item key={hora}>
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
        <Grid item>
          <Box ml={7} mt={1}>
            <Stack spacing={1}>{verificarHorasIguais(hora)}</Stack>
          </Box>
        </Grid>
      </>
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
          <Grid item>
            <DatePicker
              label="Selecionar Data Reserva"
              openTo="year"
              views={["year", "month", "day"]}
              value={date}
              onChange={(newDate) => {
                setDate(newDate);
              }}
              renderInput={(params) => <TextField {...params} />}
            />
          </Grid>
          <Grid item xs={12} width="300px">
            <Box mt={2}>
              <Divider>
                <Typography variant="h5">
                  {`${format(date as Date, "eeee", {
                    locale: ptLocale,
                  })} `}
                </Typography>
              </Divider>
            </Box>
          </Grid>
          <Grid item width={330}>
            <Grid container direction="column">
              {expediente.map((hora) => {
                return verificaExpedienteHora(hora) ? element1(hora) : "";
              })}
            </Grid>
          </Grid>
        </Grid>
      </LocalizationProvider>
    </div>
  );
};

export default AgendaProfessor;
