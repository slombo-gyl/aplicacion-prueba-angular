# AppAngular

## Aprendizajes

En este README se listan algunos de los aprendizajes destacados durante la realización
de este proyecto.

### Dockerización

Se agregó un Dockerfile para levantar el frontend con Angular. De esto, se destacan dos
observaciones:
1. Se expone el puerto 4200, que es el que por defecto usa Angular, pero en teoría podría
usarse NGINX para levantar el front, que por defecto usa el puerto 80.
2. Angular escucha por defecto en localhost, en la interfaz de red 127.0.0.1, pero para
que escuche por fuera del contenedor debe escuchar en la interfaz de red que conecta con
el contenedor. Para simplificarlo, escucha por todas las interfaces, 0.0.0.0.

Se corrigió un nombre de archivo (Chart.html a [chart.html](src/app/views/dashboard/components/chart/chart.html)) porque al levantarlo con Docker tiraba error.
