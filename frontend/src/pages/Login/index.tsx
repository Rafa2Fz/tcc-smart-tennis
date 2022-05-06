import React from "react";

import { useForm, Controller, SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import { Container, Link, Paper, Stack, Typography } from "@mui/material";
import { TextField } from "@mui/material";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";

import { RiUserAddFill } from "react-icons/ri";

import { useUsuario } from "../../hooks/user";

import logo from "../../assets/logo.png";
interface IFormInputs {
  email: string;
  password: string;
}

const schema = yup
  .object({
    email: yup.string().required(),
    password: yup.string().required(),
  })
  .required();
const Login: React.FC = () => {
  const { login } = useUsuario();
  const { handleSubmit, control } = useForm<IFormInputs>({
    resolver: yupResolver(schema),
  });

  const onSubmit: SubmitHandler<IFormInputs> = async (data) => {
    await login(data.email, data.password);
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
                                <strong>Faça Seu Login</strong>
                              </Typography>
                            </Grid>
                          </Grid>
                        </Grid>
                      </Grid>
                    </Grid>
                    <Stack mt={2} spacing={2}>
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
                          Login
                        </Button>
                      </Grid>
                    </Stack>
                  </Box>
                  <Grid item>
                    <Link href="/cadastro">
                      <Box mb={1}>
                        <Grid container alignItems="center">
                          <Grid item>
                            <Box sx={{ marginRight: "4px", marginTop: "2px" }}>
                              <RiUserAddFill />
                            </Box>
                          </Grid>
                          <Grid item>
                            <Typography>Cadastro</Typography>
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

export default Login;
