import React from "react";
import api from "../config/connection";

import { useForm, Controller, SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import { Container } from "@mui/material";
import { TextField } from "@mui/material";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";

import { useToast } from "../hooks/toast";
import { AxiosError } from "axios";

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
  const { addToast } = useToast();
  const { handleSubmit, control } = useForm<IFormInputs>({
    resolver: yupResolver(schema),
  });

  const onSubmit: SubmitHandler<IFormInputs> = async (data) => {
    try {
      const resposta = await api.post("/auth", data);
      console.log(resposta);
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
      <Container maxWidth="xs">
        <Box mt="50%">
          <form onSubmit={handleSubmit(onSubmit)}>
            <Grid direction="column" container spacing={2}>
              <Grid item xs={12}>
                <Controller
                  name="email"
                  control={control}
                  rules={{ required: true }}
                  render={({ field, fieldState: { error, invalid } }) => (
                    <TextField
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
                  render={({ field, fieldState: { error, invalid } }) => (
                    <TextField
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
                <Button fullWidth type="submit">
                  Enviar
                </Button>
              </Grid>
            </Grid>
          </form>
        </Box>
      </Container>
    </>
  );
};

export default Login;
