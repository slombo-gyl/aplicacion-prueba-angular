export interface Alumno {
  id?: number; 
  nombre: string;
  apellido: string;
  email: string;
  dni: string;
  notas?: any[];
  fechaBaja?: string | null;
  materias?: {
    nombreMateria: string;
    nota: number;
  }[];
}