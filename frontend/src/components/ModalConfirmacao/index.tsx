import React, { useEffect } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import confirmacao from "../../assets/confirmacao.png";
import { Grid } from "@mui/material";
import { useNavigate } from "react-router-dom";

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 250,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
  borderRadius: "10px",
};

interface Props {
  abrir: boolean;
}

const ModalConfirmacao: React.FC<Props> = ({ abrir }) => {
  let navigate = useNavigate();
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    navigate("/dashboard");
    setOpen(false);
  };

  useEffect(() => {
    if (abrir) {
      setOpen(true);

      setTimeout(() => {
        handleClose();
      }, 15000);
    }
  }, [abrir]);

  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Grid container direction="column" alignItems="center">
            <Grid item>
              <img
                width="200px"
                height="200px"
                src={confirmacao}
                loading="lazy"
              />
            </Grid>
            <Grid item>
              <Typography id="modal-modal-title" variant="h6" component="h2">
                Agendamento Concluido!
              </Typography>
            </Grid>
            <Grid item>
              <Box mt={2}>
                <Button
                  size="medium"
                  onClick={handleClose}
                  color="primary"
                  variant="contained"
                >
                  Ok
                </Button>
              </Box>
            </Grid>
          </Grid>
        </Box>
      </Modal>
    </div>
  );
};

export default ModalConfirmacao;
