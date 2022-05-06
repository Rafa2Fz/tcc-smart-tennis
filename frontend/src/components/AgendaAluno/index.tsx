import React, { useEffect, useState } from "react";
import QuadroReserva from "../QuadroReserva";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import ptLocale from "date-fns/locale/pt";

import Stack from "@mui/material/Stack";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import { Box } from "@mui/material";

import { AxiosError } from "axios";
import { useUsuario } from "../../hooks/user";
import { useToast } from "../../hooks/toast";
import api from "../../config/connection";

const AgendaAluno: React.FC = () => {
  const { logout } = useUsuario();
  const { addToast } = useToast();
  const [date, setDate] = useState<Date | null>(new Date());
  const [diasIndisponiveis, setDiasIndisponiveis] = useState<number[]>([]);

  useEffect(() => {
    const diasIndisponiveisF = async () => {
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
        logout();
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
      diasIndisponiveisF();
    }
  }, [date]);

  const disableDays = (day: Date) => {
    return diasIndisponiveis.includes(day.getDate()) ? true : false;
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
              shouldDisableDate={disableDays}
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
          <Grid item>
            <Stack spacing={3}>
              <QuadroReserva />
              <QuadroReserva />
              <QuadroReserva />
              <QuadroReserva />
              <QuadroReserva />
            </Stack>
          </Grid>
        </Grid>
      </LocalizationProvider>
    </div>
  );
};

export default AgendaAluno;
