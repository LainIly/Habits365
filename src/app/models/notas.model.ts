export interface Nota {
  id: number;
  titulo: string;
  contenido: string;
  hora: string;
  fecha: string;
  completadoHoy?: boolean;
}
