# Proyecto DevOps - MasterBikes

## Descripcion

Este repositorio contiene el microservicio de catalogo de bicicletas de MasterBikes y la automatizacion CI/CD solicitada en la Evaluacion Parcial 2 de Ingenieria DevOps.

El objetivo del pipeline es automatizar la integracion, validacion, seguridad, construccion de contenedores y despliegue simulado del microservicio trabajado en la evaluacion anterior.

## Microservicio

Aplicacion Node.js con Express.

Endpoints principales:

- `GET /health`: verifica que el servicio este activo.
- `GET /api/bicicletas`: devuelve el catalogo completo.
- `GET /api/bicicletas?categoria=ruta`: filtra bicicletas por categoria.
- `GET /api/bicicletas/:id`: obtiene una bicicleta por identificador.

## Tecnologias

- Node.js 20
- Express
- Docker
- Docker Compose
- GitHub Actions
- Dependabot
- Snyk opcional mediante `SNYK_TOKEN`
- Trivy para escaneo de imagen Docker

## Ejecucion local

Instalar dependencias:

```bash
npm ci
```

Ejecutar pruebas automatizadas:

```bash
npm test
```

Iniciar el microservicio:

```bash
npm start
```

La API queda disponible en:

```text
http://localhost:3000
```

## Contenedores

Construir la imagen Docker:

```bash
docker build -t masterbikes-api:local .
```

Ejecutar el entorno simulado con Docker Compose:

```bash
docker compose up -d --build
```

Validar el servicio:

```bash
curl http://localhost:3000/health
```

Detener el entorno:

```bash
docker compose down
```

## Orquestacion y escalabilidad

La orquestacion se implementa con `docker-compose.yml`, que define el servicio `masterbikes-api` con:

- Construccion automatica desde el `Dockerfile`.
- Healthcheck del endpoint `/health`.
- Politica de reinicio `unless-stopped`.
- Limites y reservas de CPU y memoria.
- Parametro de replicas documentado en la seccion `deploy`.
- Configuracion de seguridad con filesystem de solo lectura, `no-new-privileges` y eliminacion de capacidades Linux.

Esta configuracion simula un entorno cloud basado en contenedores y permite validar que el microservicio pueda ejecutarse de forma estable antes de pasar a produccion.

## Pipeline CI/CD

El workflow principal esta en `.github/workflows/ci-cd.yml`.

Etapas del pipeline:

1. **Pruebas automatizadas**
   - Descarga el repositorio.
   - Configura Node.js 20.
   - Instala dependencias con `npm ci`.
   - Ejecuta `npm test`.

2. **Seguridad y calidad**
   - Ejecuta `npm audit --audit-level=high`.
   - Si existen vulnerabilidades altas o criticas, el pipeline falla y bloquea el despliegue.
   - Ejecuta Snyk si el repositorio tiene configurado el secreto `SNYK_TOKEN`.

3. **Build y escaneo Docker**
   - Construye la imagen `masterbikes-api`.
   - Escanea la imagen con Trivy.
   - Si Trivy encuentra vulnerabilidades altas o criticas corregibles, el pipeline falla.

4. **Despliegue cloud simulado**
   - Levanta el servicio con Docker Compose.
   - Valida `/health` con `curl`.
   - Imprime datos de trazabilidad del repositorio, commit, workflow y numero de ejecucion.
   - Apaga el entorno al finalizar.

## Dependabot

El archivo `.github/dependabot.yml` configura revision semanal de:

- Dependencias `npm`.
- Acciones de GitHub Actions.

Esto permite recibir alertas y pull requests automaticos cuando existan actualizaciones o vulnerabilidades conocidas.

## Trazabilidad y calidad

La trazabilidad se garantiza porque cada ejecucion del pipeline queda asociada a:

- Rama ejecutada.
- Pull request o push que disparo el workflow.
- Commit exacto mediante `GITHUB_SHA`.
- Numero de ejecucion mediante `GITHUB_RUN_NUMBER`.
- Evidencia de pruebas, escaneos y despliegue simulado en GitHub Actions.

La calidad se garantiza bloqueando el avance del pipeline cuando fallan las pruebas automatizadas o los controles de seguridad. De esta forma, un cambio no puede llegar al despliegue simulado si rompe el microservicio o introduce vulnerabilidades relevantes.

## Modelo de trabajo

Se mantiene GitFlow:

- `main`: version estable.
- `develop`: integracion.
- `feature/*`: nuevas funcionalidades.
- `hotfix/*`: correcciones urgentes.

## Convenciones de commits

- `feat`: nuevas funcionalidades.
- `fix`: correcciones.
- `docs`: documentacion.
- `ci`: integracion continua.
- `test`: pruebas automatizadas.

## Uso de IA

Se utilizo IA como apoyo para estructurar documentacion, revisar configuraciones DevOps y proponer archivos base para el pipeline CI/CD. Las decisiones tecnicas deben ser revisadas y validadas por los integrantes antes de la entrega.

## Integrantes

- Eduardo Cortes
- Cristian Salas
