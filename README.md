# Proyecto DevOps - MasterBikes

## Descripción

Este repositorio es la continuación de la ev1 ya que contiene el microservicio de catálogo de bicicletas de MasterBikes, la automatización CI/CD y la Seguridad desarrollada para la Evaluación Parcial 2 de Ingeniería DevOps.

El objetivo del pipeline es automatizar la integración, validación, seguridad, construcción de contenedores y despliegue simulado del microservicio.

## Microservicio

Aplicación Node.js desarrollada con Express.

### Endpoints principales

* `GET /health`: verifica que el servicio esté activo.
* `GET /api/bicicletas`: devuelve el catálogo completo.
* `GET /api/bicicletas?categoria=ruta`: filtra bicicletas por categoría.
* `GET /api/bicicletas/:id`: obtiene una bicicleta por identificador.

## Tecnologías

* Node.js 20
* Express
* Docker
* Docker Compose
* Nginx
* GitHub Actions
* Dependabot
* SonarCloud
* Trivy

## Ejecución local

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

Ejecutar el entorno simulado:

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

## Orquestación y escalabilidad

La orquestación se realiza mediante Docker Compose. El entorno incluye dos réplicas del servicio `masterbikes-api` y un contenedor Nginx que actúa como proxy inverso.

La configuración incorpora:

* Construcción automática desde Dockerfile.
* Healthcheck del endpoint `/health`.
* Reinicio automático (`unless-stopped`).
* Límites y reservas de CPU y memoria.
* Réplicas del microservicio.
* Configuraciones básicas de seguridad (`read_only`, `no-new-privileges` y eliminación de capacidades Linux).

Esta arquitectura permite simular un entorno cloud basado en contenedores.

## Pipeline CI/CD

El workflow principal se encuentra en:

```text
.github/workflows/ci-cd.yml
```

### Etapas del pipeline

#### 1. Pruebas automatizadas

* Descarga el repositorio.
* Configura Node.js.
* Instala dependencias.
* Ejecuta `npm test`.

#### 2. Seguridad y calidad

* Ejecuta `npm audit --audit-level=high`.
* Ejecuta análisis estático de código con SonarCloud.
* Si existen problemas críticos de calidad o seguridad, el pipeline puede bloquear su avance.

#### 3. Build y escaneo Docker

* Construye la imagen `masterbikes-api`.
* Escanea la imagen mediante Trivy.
* Genera evidencia de vulnerabilidades detectadas.

#### 4. Despliegue cloud simulado

* Levanta el entorno con Docker Compose.
* Valida el endpoint `/health`.
* Registra información de trazabilidad.
* Apaga el entorno al finalizar.

## Dependabot

El archivo `.github/dependabot.yml` configura revisiones semanales de:

* Dependencias npm.
* GitHub Actions.

Esto permite recibir alertas y pull requests automáticos cuando existen actualizaciones o vulnerabilidades conocidas.

## Trazabilidad y calidad

La trazabilidad se garantiza mediante:

* Rama ejecutada.
* Pull Request o Push asociado.
* Commit exacto (`GITHUB_SHA`).
* Número de ejecución (`GITHUB_RUN_NUMBER`).
* Evidencia de pruebas, análisis y despliegue en GitHub Actions.

La calidad se asegura mediante pruebas automatizadas, análisis de dependencias con npm audit, análisis de código con SonarCloud y escaneo de imágenes Docker con Trivy.

## Modelo de trabajo

Se utiliza GitFlow:

* `main`: versión estable.
* `develop`: integración.
* `feature/*`: nuevas funcionalidades.
* `hotfix/*`: correcciones urgentes.

## Convenciones de commits

* `feat`: nuevas funcionalidades.
* `fix`: correcciones.
* `docs`: documentación.
* `ci`: integración continua.
* `test`: pruebas automatizadas.

## Uso de IA

Se utilizó IA como apoyo para estructurar documentación, revisar configuraciones DevOps y proponer archivos base para el pipeline CI/CD. Todas las decisiones técnicas fueron revisadas y validadas por los integrantes del proyecto.

## Integrantes

* Eduardo Cortés Monroy
* Cristian Salas Millón

* Prueba de ejecución 02-06-2026
* Validación pipeline CI/CD el 02-06-2026
