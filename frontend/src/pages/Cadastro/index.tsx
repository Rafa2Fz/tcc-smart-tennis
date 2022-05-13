import React from "react";

import { useForm, Controller, SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import { Container, Link, Paper, Stack, Typography } from "@mui/material";
import { TextField } from "@mui/material";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import InputAdornment from "@mui/material/InputAdornment";

import { FaSignInAlt, FaUserCircle } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { RiLockPasswordFill } from "react-icons/ri";

import { useUsuario } from "../../hooks/user";

import logo from "../../assets/logo.png";
import { useToast } from "../../hooks/toast";
import { AxiosError } from "axios";
import api from "../../config/connection";

interface IFormInputs {
  email: string;
  nome: string;
  password: string;
  sobrenome: string;
}

const schema = yup
  .object({
    email: yup.string().required(),
    password: yup.string().required(),
    nome: yup.string().required(),
    sobrenome: yup.string().required(),
  })
  .required();
const Cadastro: React.FC = () => {
  const { addToast } = useToast();
  const { login } = useUsuario();
  const { handleSubmit, control } = useForm<IFormInputs>({
    resolver: yupResolver(schema),
  });

  const onSubmit: SubmitHandler<IFormInputs> = async (data) => {
    try {
      await api.post("/usuario", {
        nome: `${data.nome} ${data.sobrenome}`,
        email: data.email,
        password: data.password,
      });

      await login(data.email, data.password);
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

  return (
    <>
      <Grid
        container
        direction="row"
        alignItems="center"
        sx={{ height: "100vh", flexGrow: 1, backgroundColor: "primary.main" }}
      >
        <Grid item sx={{ flexGrow: 1 }}>
          <Container maxWidth="xs">
            <img src={logo} alt="" />
            <Paper elevation={24}>
              <form onSubmit={handleSubmit(onSubmit)}>
                <Grid container direction="column" alignItems="center">
                  <Box m={3} sx={{ width: "80%" }}>
                    <Grid item>
                      <Grid
                        container
                        direction="column"
                        alignItems="center"
                        alignContent="center"
                      >
                        <Grid item>
                          <Grid container>
                            <Grid item></Grid>
                            <Grid item>
                              <Typography
                                variant="h5"
                                component="div"
                                sx={{ flexGrow: 1 }}
                              >
                                <strong>Faça seu Cadastro</strong>
                              </Typography>
                            </Grid>
                          </Grid>
                        </Grid>
                      </Grid>
                    </Grid>
                    <Stack mt={2} spacing={2}>
                      <Grid container direction="row">
                        <Grid item xs={6}>
                          <Box mr={1}>
                            <Controller
                              name="nome"
                              control={control}
                              rules={{ required: true }}
                              render={({
                                field,
                                fieldState: { error, invalid },
                              }) => (
                                <TextField
                                  InputProps={{
                                    startAdornment: (
                                      <InputAdornment position="start">
                                        <FaUserCircle size={20} />
                                      </InputAdornment>
                                    ),
                                  }}
                                  variant="standard"
                                  placeholder="Nome"
                                  {...field}
                                  error={invalid}
                                  helperText={invalid && error?.message}
                                />
                              )}
                            />
                          </Box>
                        </Grid>
                        <Grid item xs={6}>
                          <Box ml={1}>
                            <Controller
                              name="sobrenome"
                              control={control}
                              rules={{ required: true }}
                              render={({
                                field,
                                fieldState: { error, invalid },
                              }) => (
                                <TextField
                                  variant="standard"
                                  placeholder="Sobrenome"
                                  {...field}
                                  error={invalid}
                                  helperText={invalid && error?.message}
                                />
                              )}
                            />
                          </Box>
                        </Grid>
                      </Grid>
                      <Grid item>
                        <Controller
                          name="email"
                          control={control}
                          rules={{ required: true }}
                          render={({
                            field,
                            fieldState: { error, invalid },
                          }) => (
                            <TextField
                              variant="standard"
                              fullWidth={true}
                              InputProps={{
                                startAdornment: (
                                  <InputAdornment position="start">
                                    <MdEmail size={20} />
                                  </InputAdornment>
                                ),
                              }}
                              placeholder="Email"
                              {...field}
                              error={invalid}
                              helperText={invalid && error?.message}
                            />
                          )}
                        />
                      </Grid>
                      <Grid item>
                        <Controller
                          name="password"
                          control={control}
                          rules={{ required: true }}
                          render={({
                            field,
                            fieldState: { error, invalid },
                          }) => (
                            <TextField
                              variant="standard"
                              fullWidth={true}
                              InputProps={{
                                startAdornment: (
                                  <InputAdornment position="start">
                                    <RiLockPasswordFill size={20} />
                                  </InputAdornment>
                                ),
                              }}
                              placeholder="Password"
                              {...field}
                              error={invalid}
                              type="password"
                              helperText={invalid && error?.message}
                            />
                          )}
                        />
                      </Grid>
                      <Grid item>
                        <Button fullWidth type="submit" variant="contained">
                          Cadastrar
                        </Button>
                      </Grid>
                    </Stack>
                  </Box>
                  <Grid item>
                    <Link href="/">
                      <Box mb={1}>
                        <Grid container alignItems="center">
                          <Grid item>
                            <Box sx={{ marginRight: "4px", marginTop: "2px" }}>
                              <FaSignInAlt />
                            </Box>
                          </Grid>
                          <Grid item>
                            <Typography>Login</Typography>
                          </Grid>
                        </Grid>
                      </Box>
                    </Link>
                  </Grid>
                </Grid>
              </form>
            </Paper>
          </Container>
        </Grid>
      </Grid>
    </>
  );
};

export default Cadastro;
