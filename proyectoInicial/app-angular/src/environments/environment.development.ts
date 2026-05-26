const PORT = 8080;
const URL = "http://localhost";

export const environment = {
    production: false,
    PORT,
    URL,
    APIURL: `${URL}:${PORT}/api/`,
    ENDPOINT_ALUMNO: "students",
    ENDPOINT_MATERIA: "materias",
    ENDPOINT_PUNTAJE: "puntajes"
};