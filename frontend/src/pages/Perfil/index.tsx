import {
  Avatar,
  Button,
  Container,
  Grid,
  IconButton,
  InputAdornment,
  Stack,
  TextField,
} from "@mui/material";
import { Box } from "@mui/system";
import React, { useCallback, useEffect, useState } from "react";
import { FaUserCircle } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { RiLockPasswordFill } from "react-icons/ri";
import Cabecalho from "../../components/Cabecalho";
import { useUsuario } from "../../hooks/user";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm, Controller } from "react-hook-form";
import { useToast } from "../../hooks/toast";
import { AxiosError } from "axios";
import api from "../../config/connection";

const schema = yup
  .object({
    email: yup.string().required(),
    password: yup.string().required(),
    nome: yup.string().required(),
    sobrenome: yup.string().required(),
  })
  .required();

interface IFormInputs {
  email: string;
  nome: string;
  password: string;
  sobrenome: string;
}

const Perfil: React.FC = () => {
  const { user, logout, atualizarUsuario } = useUsuario();
  const [arquivoSelecionado, setArquivoSelecionado] = useState(undefined);
  const [previsualizacao, setPrevisualizacao] = useState<string | undefined>(
    () => {
      if (user.avatar_url) {
        return `${api.defaults.baseURL}${user.avatar_url}`;
      } else {
        return undefined;
      }
    }
  );
  const { handleSubmit, control } = useForm<IFormInputs>({
    resolver: yupResolver(schema),
  });
  const { addToast } = useToast();
  const formData = new FormData();

  useEffect(() => {
    if (arquivoSelecionado) {
      const objectUrl = URL.createObjectURL(arquivoSelecionado);
      setPrevisualizacao(objectUrl);
      return () => URL.revokeObjectURL(objectUrl);
    }
  }, [arquivoSelecionado]);

  const handleSelectFile = useCallback((event) => {
    if (!event.target.files || event.target.files.length === 0) {
      setArquivoSelecionado(undefined);
      return;
    }
    setArquivoSelecionado(event.target.files[0]);
  }, []);
  const handleClick = useCallback(async () => {
    try {
      if (arquivoSelecionado) {
        formData.append("avatar", arquivoSelecionado);
        await api.put("usuario/avatar", formData);

        await atualizarUsuario();
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
  }, [arquivoSelecionado]);

  return (
    <>
      <Cabecalho titulo="Perfil" />
      <Container>
        <Grid
          container
          direction="column"
          alignContent="center"
          alignItems="center"
        >
          <Grid item>
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
            >
              <Avatar
                sx={{ bgcolor: "secondary.main", width: 96, height: 96 }}
                src={previsualizacao}
              >
                {user.nome.charAt(0)}
              </Avatar>
              <input
                onChange={handleSelectFile}
                type="file"
                style={{
                  position: "absolute",
                  opacity: 0,
                }}
              />
            </IconButton>
          </Grid>
          <Grid item>
            <Stack mt={2} spacing={2}>
              <Grid container direction="row">
                <Grid item xs={6}>
                  <Box mr={1}>
                    <Controller
                      name="nome"
                      control={control}
                      rules={{ required: true }}
                      render={({ field, fieldState: { error, invalid } }) => (
                        <TextField
                          InputProps={{
                            startAdornment: (
                              <InputAdornment position="start">
                                <FaUserCircle size={20} />
                              </InputAdornment>
                            ),
                          }}
                          variant="standard"
                          placeholder={`${user.nome.split(" ")[0]}`}
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
                      render={({ field, fieldState: { error, invalid } }) => (
                        <TextField
                          variant="standard"
                          placeholder={`${user.nome.split(" ")[1]}`}
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
                  render={({ field, fieldState: { error, invalid } }) => (
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
                      placeholder={`${user.email}`}
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
                      variant="standard"
                      fullWidth={true}
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <RiLockPasswordFill size={20} />
                          </InputAdornment>
                        ),
                      }}
                      placeholder="*****"
                      {...field}
                      error={invalid}
                      type="password"
                      helperText={invalid && error?.message}
                    />
                  )}
                />
              </Grid>
              <Grid item>
                <Button
                  fullWidth
                  type="submit"
                  variant="contained"
                  onClick={handleClick}
                >
                  Atualizar
                </Button>
              </Grid>
            </Stack>
          </Grid>
        </Grid>
      </Container>
    </>
  );
};

export default Perfil;
