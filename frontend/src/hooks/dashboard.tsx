import { useOutletContext } from "react-router-dom";

type IAddTitulo = {
  addTitulo(titulo: string): void;
};

export function useDashboard() {
  return useOutletContext<IAddTitulo>();
}
