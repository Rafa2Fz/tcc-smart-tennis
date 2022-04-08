import React, { createContext, useState, useCallback, useContext } from "react";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert, { AlertProps } from "@mui/material/Alert";

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
  props,
  ref
) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export interface ToastMessage {
  type?: "success" | "error" | "info";
  text?: string;
}

interface ToastContextData {
  addToast(message: ToastMessage): void;
}

const ToastContext = createContext<ToastContextData>({} as ToastContextData);

const ToastProvider: React.FC = ({ children }) => {
  const [open, setOpen] = React.useState(false);
  const [message, setMessage] = useState<ToastMessage>({} as ToastMessage);

  const addToast = useCallback(({ type, text }: ToastMessage) => {
    const toast = {
      type,
      text,
    };

    setMessage({ text, type });
    setOpen(true);
  }, []);

  const handleClose = (
    event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  return (
    <ToastContext.Provider value={{ addToast }}>
      <Snackbar open={open} autoHideDuration={3000} onClose={handleClose}>
        <Alert
          onClose={handleClose}
          severity={message.type}
          sx={{ width: "100%" }}
        >
          {message.text}
        </Alert>
      </Snackbar>
      {children}
    </ToastContext.Provider>
  );
};

function useToast(): ToastContextData {
  const context = useContext(ToastContext);

  return context;
}

export { ToastProvider, useToast };
