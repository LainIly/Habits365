export interface Habito {
  id: number;
  nombre: string;
  frecuencia: string;
  hora: string;
  fecha: string;
  categoria: string;
  completadoHoy?: boolean; 
}
