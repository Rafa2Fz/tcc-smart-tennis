import React, { ChangeEvent, ChangeEventHandler, useState } from "react";
import Box from "@mui/material/Box";
import Cabecalho from "../../components/Cabecalho";
import {
  Avatar,
  Button,
  Container,
  Grid,
  InputAdornment,
  Paper,
  TextField,
} from "@mui/material";

import { Typography } from "@mui/material";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { FaUserCircle } from "react-icons/fa";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import api from "../../config/connection";
import { AxiosError } from "axios";
import { useToast } from "../../hooks/toast";
import { useUsuario } from "../../hooks/user";
import { BsCoin } from "react-icons/bs";
import bolaImage from "../../assets/bolaTennis.png";

interface IFormInputs {
  quantidade: number;
}

interface IUser {
  credito: number;
  email: string;
  nome: string;
}

const schemaEmail = yup.object({ email: yup.string().email().required() });
const schema = yup
  .object({
    quantidade: yup.number().required("Campo obrigatório"),
  })
  .required();

const AdicionaCreditoForm: React.FC = () => {
  const { addToast } = useToast();
  const { logout, user } = useUsuario();
  const [invalidUser, setInvalidUser] = useState(false);
  const { handleSubmit, control } = useForm<IFormInputs>({
    resolver: yupResolver(schema),
  });
  const [userResponseData, setUserResponseData] = useState<IUser | null>(null);
  const handleChange = async (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement> | undefined
  ) => {
    const email = event?.target.value;
    const emailValido = await schemaEmail.isValid({ email });

    if (emailValido) {
      setUserResponseData(null);
      try {
        const resposta = await api.post("/usuario/buscar", {
          email,
        });
        setInvalidUser(false);
        setUserResponseData(resposta.data);
        console.log(resposta.data);
      } catch (error) {
        const err = error as AxiosError;

        if (err.response) {
          if (err.response.status === 401) {
            logout();
            let message = err.response.data;
            addToast({ text: message, type: "error" });
          }
          let message = err.response.data;
          setInvalidUser(true);
        } else {
          let message = err.message;
          addToast({ text: message, type: "error" });
        }
      }
    }
  };

  const onSubmit: SubmitHandler<IFormInputs> = async (data) => {
    const { quantidade } = data;

    if (userResponseData) {
      try {
        const { email } = userResponseData;
        const resposta = await api.post("/usuario/adicionarCredito", {
          email,
          quantidade,
        });

        const { msg, usuario } = resposta.data;
        addToast({ text: msg, type: "success" });
        setUserResponseData(usuario);
      } catch (error) {
        const err = error as AxiosError;

        if (err.response) {
          if (err.response.status === 401) {
            logout();
            let message = err.response.data;
            addToast({ text: message, type: "error" });
          }
          let message = err.response.data;
          setInvalidUser(true);
        } else {
          let message = err.message;
          addToast({ text: message, type: "error" });
        }
      }
    }
  };
  return (
    <>
      <Cabecalho />
      <Container maxWidth="sm">
        <Grid container direction="column" alignItems="center">
          <Grid item>
            <Box m={2}>
              <Typography variant="h6">
                Adicionar Crédito para o Aluno
              </Typography>
            </Box>
          </Grid>
          <Grid item>
            <Box mr={1}>
              <TextField
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <FaUserCircle size={20} />
                    </InputAdornment>
                  ),
                }}
                error={invalidUser}
                variant="standard"
                placeholder="Digite o e-mail do aluno"
                onChange={handleChange}
              />
            </Box>
          </Grid>
          {userResponseData && (
            <Grid item>
              <Box mt={2}>
                <Paper elevation={1} sx={{ width: "250px" }}>
                  <Grid container alignContent="center" alignItems="center">
                    <Grid item>
                      <Box
                        alignItems="center"
                        alignContent="center"
                        ml={1}
                        mt={1}
                        mb={1}
                      >
                        <Avatar
                          src={bolaImage}
                          sx={{ width: 30, height: 30 }}
                          variant="square"
                        />
                      </Box>
                    </Grid>
                    <Grid item sx={{ flexGrow: 1 }}>
                      <Grid container direction="column">
                        <Grid item>
                          <Box ml={3}>
                            <Typography color="text.primary">
                              <strong>{userResponseData.nome}</strong>
                            </Typography>
                          </Box>
                        </Grid>
                        <Grid item>
                          <Box ml={3}>
                            <Typography color="text.primary">
                              <strong>{`Créditos: `}</strong>
                              {` ${userResponseData.credito}`}
                            </Typography>
                          </Box>
                        </Grid>
                      </Grid>
                    </Grid>
                  </Grid>
                </Paper>
              </Box>
            </Grid>
          )}
          {userResponseData && (
            <Grid item>
              <Box mt={5}>
                <form onSubmit={handleSubmit(onSubmit)}>
                  <Grid
                    container
                    direction="column"
                    alignItems="center"
                    alignContent="cneter"
                  >
                    <Grid item>
                      <Controller
                        name="quantidade"
                        control={control}
                        rules={{ required: true }}
                        render={({ field, fieldState: { error, invalid } }) => (
                          <TextField
                            variant="standard"
                            InputProps={{
                              startAdornment: (
                                <InputAdornment position="start">
                                  <BsCoin size={20} />
                                </InputAdornment>
                              ),
                            }}
                            placeholder="Quantidade"
                            {...field}
                            error={invalid}
                            helperText={invalid && error?.message}
                          />
                        )}
                      />
                    </Grid>
                    <Grid item>
                      <Box mt={2}>
                        <Button type="submit" variant="contained">
                          Confirmar
                        </Button>
                      </Box>
                    </Grid>
                  </Grid>
                </form>
              </Box>
            </Grid>
          )}
        </Grid>
      </Container>
    </>
  );
};

export default AdicionaCreditoForm;
