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
import { format } from "date-fns";
import OpcaoQuadra from "../../components/OpcaoQuadra";

import Chip from "@mui/material/Chip";
import { FiUserPlus } from "react-icons/fi";
import { FiUserCheck } from "react-icons/fi";
import { MdEdit } from "react-icons/md";
import ModalConfirmacao from "../../components/ModalConfirmacao";
import Cabecalho from "../../components/Cabecalho";

const CadastroReserva: React.FC = () => {
  const titulo = 'Cadastro Reserva';
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
  const [professor, setProfessor] = useState<Boolean>(false);

  const expediente = [6, 7, 8, 9, 10, 11, 13, 14, 15, 16, 17];

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
            }
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
  useEffect(() => {
    const verificaHorasIndisponiveis = async () => {
      try {
        const resposta = await api.get(
          "/reservas/verificaHorasIndisponiveis",
          {
            params: {
              ano: date?.getFullYear(),
              mes: date?.getMonth(),
              dia: date?.getDate(),
              quadraId: quadraId,
              personal: quadraId === 1 ? true : professor
            },
          }
        );
        setHorasIndisponiveis(resposta.data);
      } catch (error) {
        await logout();
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
  }, [date, addToast, logout, professor, quadraId]);

  const disableDays = useCallback(
    (day: Date) => {
      return diasIndisponiveis.includes(day.getDate()) ? true : false;
    },
    [diasIndisponiveis]
  );

  const onSubmit = async () => {
    try {
      const resposta = await api.post("/reservas", {
        horario: {
          ano: date?.getFullYear(),
          mes: date?.getMonth(),
          dia: date?.getDate(),
          hora: horaReserva,
        },
        quadraId: quadraId,
        personal: professor,
      });
      let descontar = creditoTotal();
      setAbrir(true);
      if (descontar) {
        user.credito = user.credito - descontar;
      }
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

  const opcaoQuadra = (id: number) => {
    if (id === 1) {
      setProfessor(true);
      setShowAluguel(false);
      setQuadraId(id);
    }
    if (id === 2) {
      setShowAula(false);
      setQuadraId(id);
    }
    setShowOpcoes(true);
  };

  const handleHoraReserva = (hora: number) => {
    setHoraReserva(hora);
    setShowHoras(false);
  };

  const handleProfessor = () => {
    setProfessor(!professor);
    setDate(null);
    setShowHoras(false);
    setHoraReserva(null);
  };

  const creditoTotal = () => {
    if (quadraId) {
      if (quadraId === 1) {
        return 20;
      }
      if (quadraId === 2) {
        if (professor) {
          return 30;
        } else {
          return 20;
        }
      }
    }
  };
  return (
    <>
      <Cabecalho  titulo={titulo}/>
      <ModalConfirmacao abrir={abrir} />
      <Container maxWidth="xs">
        <Box mt="15px">
          <Grid container direction="column" alignItems="center">
            <Grid item>
              <Box m={2}>
                <Grid container direction="row">
                  {showAula && (
                    <Grid item>
                      <OpcaoQuadra
                        onClick={() => opcaoQuadra(1)}
                        quadraId={1}
                      />
                    </Grid>
                  )}
                  <Box ml={2}>
                    {showAluguel && (
                      <Grid item>
                        <OpcaoQuadra
                          onClick={() => opcaoQuadra(2)}
                          quadraId={2}
                        />
                      </Grid>
                    )}
                  </Box>
                </Grid>
              </Box>
            </Grid>
            {quadraId === 2 && (
              <Grid item>
                <Box mb={2} ml={2}>
                  {professor ? (
                    <Chip
                      icon={<FiUserCheck size={20} />}
                      onClick={() => handleProfessor()}
                      color="success"
                      label="Professor"
                    />
                  ) : (
                    <Chip
                      icon={<FiUserPlus size={20} />}
                      onClick={() => handleProfessor()}
                      label="Professor"
                    />
                  )}
                </Box>
              </Grid>
            )}
            {showOpcoes && (
              <Grid item>
                <LocalizationProvider
                  dateAdapter={AdapterDateFns}
                  locale={ptLocale}
                >
                  <DatePicker
                    shouldDisableDate={disableDays}
                    label={`Selecionar Data ${showAula ? "Aula" : "Aluguel"}`}
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
                      setShowHoras(true);
                      setHoraReserva(null);
                    }}
                    renderInput={(params) => <TextField {...params} />}
                  />
                </LocalizationProvider>
              </Grid>
            )}
            {showHoras && date && (
              <Grid item>
                <Container maxWidth="xs">
                  <Grid container flexDirection="column">
                    <Grid item>
                      <Typography mt={2} variant="h5" component="div">
                        Manhã
                      </Typography>
                    </Grid>
                    <Grid
                      container
                      width="100%"
                      direction="row"
                      flexWrap="wrap"
                    >
                      {expediente.map((valor) => {
                        const dataHora = new Date();
                        dataHora.setHours(valor);
                        if (valor < 12) {
                          return horasIndisponiveis.includes(valor) ? (
                            <Box key={valor} m={1}>
                              <Button
                                sx={{ height: "25px" }}
                                size="small"
                                variant="contained"
                                disabled
                              >
                                {format(dataHora, "HH:00")}
                              </Button>
                            </Box>
                          ) : (
                            <Box key={valor} m={1}>
                              <Button
                                onClick={() => handleHoraReserva(valor)}
                                sx={{ height: "25px" }}
                                size="small"
                                variant="contained"
                              >
                                {format(dataHora, "HH:00")}
                              </Button>
                            </Box>
                          );
                        }
                      })}
                    </Grid>
                    <Grid item>
                      <Typography mt={2} variant="h5" component="div">
                        Tarde
                      </Typography>
                    </Grid>
                    <Grid
                      container
                      width="100%"
                      direction="row"
                      flexWrap="wrap"
                    >
                      {expediente.map((valor) => {
                        const dataHora = new Date();
                        dataHora.setHours(valor);
                        if (valor > 12 && valor <= 17) {
                          return horasIndisponiveis.includes(valor) ? (
                            <Box key={valor} m={1}>
                              <Button
                                sx={{ height: "25px" }}
                                variant="contained"
                                disabled
                              >
                                {format(dataHora, "HH:00")}
                              </Button>
                            </Box>
                          ) : (
                            <Box key={valor} m={1}>
                              <Button
                                onClick={() => handleHoraReserva(valor)}
                                sx={{ height: "25px" }}
                                variant="contained"
                              >
                                {format(dataHora, "HH:00")}
                              </Button>
                            </Box>
                          );
                        }
                      })}
                    </Grid>
                  </Grid>
                </Container>
              </Grid>
            )}

            {horaReserva && (
              <Grid item>
                <Box ml={2}>
                  <Grid container flexDirection="column" alignItems="center">
                    <Grid item>
                      <Typography mt={2} variant="h5" component="div">
                        Manhã
                      </Typography>
                    </Grid>
                    <Grid item>
                      <Button
                        sx={{ height: "25px" }}
                        variant="contained"
                        onClick={() => {
                          setShowHoras(true);
                          setHoraReserva(null);
                        }}
                        endIcon={<MdEdit />}
                      >
                        {format(new Date().setHours(horaReserva), "HH:00")}
                      </Button>
                    </Grid>
                    {quadraId && (
                      <Grid item>
                        <Box mt={1}>
                          <Typography variant="h6">
                            <strong>Créditos:</strong>
                            {`${creditoTotal()}`}
                          </Typography>
                        </Box>
                      </Grid>
                    )}
                    <Grid item>
                      <Box mt={1}>
                        <Button
                          fullWidth
                          onClick={onSubmit}
                          variant="contained"
                        >
                          Confirmar Reserva
                        </Button>
                      </Box>
                    </Grid>
                  </Grid>
                </Box>
              </Grid>
            )}
          </Grid>
        </Box>
      </Container>
    </>
  );
};

export default CadastroReserva;
