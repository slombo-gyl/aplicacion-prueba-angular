export interface Alumno {
    id?: number; // Probablemente tu ID también sea opcional si lo genera la BD
  nombre: string;
  apellido: string;
  email: string;
  dni: string;
  notas?: any[];
}