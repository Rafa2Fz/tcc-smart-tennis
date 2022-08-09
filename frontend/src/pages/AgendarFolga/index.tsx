import React, { useCallback, useEffect, useState } from "react";

import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import ptLocale from "date-fns/locale/pt";

import api from "../../config/connection";
import { AxiosError } from "axios";

import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import { Box, Typography } from "@mui/material";
import { Container } from "@mui/material";

import { useToast } from "../../hooks/toast";
import { useUsuario } from "../../hooks/user";
import { useDashboard } from "../../hooks/dashboard";

const AgendarFolga: React.FC = () => {
  const titulo = "Agendar Folga";
  const { logout, user } = useUsuario();
  const { addToast } = useToast();
  const [date, setDate] = useState<Date | null>();
  const [diasIndisponiveis, setDiasIndisponiveis] = useState<number[]>([]);
  const [horasIndisponiveis, setHorasIndisponiveis] = useState<number[]>([]);
  const [quadraId, setQuadraId] = useState<number>();
  const [showAluguel, setShowAluguel] = useState<boolean>(true);
  const [showAula, setShowAula] = useState<boolean>(true);
  const [showOpcoes, setShowOpcoes] = useState<boolean>(false);
  const [showHoras, setShowHoras] = useState<boolean>(false);
  const [abrir, setAbrir] = React.useState(false);
  const [horaReserva, setHoraReserva] = useState<number | null>();
  const { addTitulo } = useDashboard();

  useEffect(() => {
    addTitulo("Agendar Folga");
  });
  const verificarDiasIndisponiveis = useCallback(async () => {
    if (date) {
      setDiasIndisponiveis([]);
      try {
        const resposta = await api.get(
          "/reservas/verificarDiasIndisponiveisMes",
          {
            params: {
              ano: date?.getFullYear(),
              mes: date?.getMonth(),
              dia: date?.getDate(),
              quadraId: quadraId,
            },
          }
        );

        setDiasIndisponiveis(resposta.data);
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
    }
  }, [date, quadraId, addToast, logout]);
  useEffect(() => {
    if (date) {
      verificarDiasIndisponiveis();
    }
  }, [date, verificarDiasIndisponiveis]);

  const disableDays = useCallback(
    (day: Date) => {
      return diasIndisponiveis.includes(day.getDate()) ? true : false;
    },
    [diasIndisponiveis]
  );

  const onSubmit = async () => {
    try {
      const resposta = await api.post("/folga", {
        data: {
          ano: date?.getFullYear(),
          mes: date?.getMonth(),
          dia: date?.getDate(),
        },
      });
      console.log(resposta);
      addToast({ text: "Folga agendada com sucesso!", type: "success" });
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

  return (
    <>
      <Container maxWidth="xs">
        <Grid
          container
          direction="column"
          alignItems="center"
          alignContent="center"
        >
          <Grid item>
            <Box m={2}>
              <Typography variant="h5">Agendar Dia de Folga</Typography>
            </Box>
          </Grid>
          <Grid item>
            <Box mt={2}>
              <LocalizationProvider
                dateAdapter={AdapterDateFns}
                locale={ptLocale}
              >
                <DatePicker
                  shouldDisableDate={disableDays}
                  label={`Selecionar Data Folga`}
                  openTo="year"
                  views={["year", "month", "day"]}
                  value={date ? date : null}
                  disablePast
                  onMonthChange={(newDate) => {
                    setDate(newDate);
                  }}
                  onYearChange={(newDate) => {
                    setDate(newDate);
                  }}
                  onChange={(newDate) => {
                    setDate(newDate);
                  }}
                  renderInput={(params) => <TextField {...params} />}
                />
              </LocalizationProvider>
            </Box>
          </Grid>
          <Grid item>
            <Box mt={1}>
              <Button fullWidth={true} variant="contained" onClick={onSubmit}>
                Confirmar
              </Button>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </>
  );
};

export default AgendarFolga;
