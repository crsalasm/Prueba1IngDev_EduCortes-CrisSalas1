# Proyecto DevOps - MasterBikes

## Descripción

Este repositorio corresponde al proyecto desarrollado durante las Evaluaciones de Ingeniería DevOps.

El proyecto consiste en un microservicio desarrollado en Node.js para la gestión del catálogo de bicicletas de MasterBikes, incorporando un proceso completo de Integración Continua (CI) y Despliegue Continuo (CD).

La solución automatiza el ciclo de vida del software mediante pruebas, análisis de calidad, escaneo de seguridad, construcción de imágenes Docker y despliegue automático en Kubernetes sobre Amazon EC2.

---

# Microservicio

Aplicación desarrollada con **Node.js** y **Express**.

## Endpoints

- `GET /health`
- `GET /api/bicicletas`
- `GET /api/bicicletas?categoria=ruta`
- `GET /api/bicicletas/:id`

---

# Tecnologías utilizadas

- Node.js 20
- Express
- Docker
- Docker Hub
- Kubernetes (K3s)
- GitHub
- GitHub Actions
- Amazon EC2
- Amazon CloudWatch
- Amazon SNS
- SonarCloud
- Dependabot
- Trivy
- Nginx

---

# Ejecución local

Instalar dependencias

```bash
npm ci
```

Ejecutar pruebas

```bash
npm test
```

Levantar la aplicación

```bash
npm start
```

API disponible en:

```text
http://localhost:3000
```

---

# Contenedores Docker

Construir imagen

```bash
docker build -t masterbikes-api:local .
```

Levantar entorno

```bash
docker compose up -d --build
```

Validar funcionamiento

```bash
curl http://localhost:3000/health
```

Detener entorno

```bash
docker compose down
```

---

# Kubernetes

El despliegue del microservicio se realiza mediante Kubernetes (K3s) sobre una instancia Amazon EC2.

Se implementaron:

- Deployment
- Service tipo NodePort
- Dos réplicas del microservicio
- Health Checks
- Readiness Probe
- Liveness Probe
- Recursos de CPU y memoria

Los manifiestos se encuentran en la carpeta:

```text
k8s/
```

---

# Pipeline CI/CD

Workflow principal

```text
.github/workflows/ci-cd.yml
```

## Flujo automatizado

Cada vez que se realiza un **push** a la rama principal, GitHub Actions ejecuta automáticamente:

1. Checkout del repositorio.
2. Instalación de dependencias (`npm ci`).
3. Ejecución de pruebas (`npm test`).
4. Auditoría de seguridad (`npm audit`).
5. Análisis de calidad mediante SonarCloud.
6. Validación del Quality Gate.
7. Construcción de la imagen Docker.
8. Escaneo de vulnerabilidades con Trivy.
9. Publicación automática de la imagen en Docker Hub.
10. Conexión automática vía SSH a Amazon EC2.
11. Actualización del repositorio en la instancia.
12. Reinicio del Deployment de Kubernetes.
13. Verificación del estado de los Pods y del endpoint `/health`.

De esta forma, cualquier cambio realizado en el código queda desplegado automáticamente en la aplicación sin intervención manual.

---

# Monitoreo y Observabilidad

Se implementó monitoreo mediante Amazon CloudWatch.

## CloudWatch Agent

Se recopilan métricas de:

- CPU
- Memoria
- Disco
- Red

Además se envían registros del sistema hacia CloudWatch Logs.

## Dashboard

Dashboard implementado:

```text
MasterBikes-Dashboard
```

Incluye:

- CPU Utilization
- Memory Used
- Disk Used
- Network In
- Network Out

## Alarmas

Se configuró una alarma con la condición:

```text
CPUUtilization > 70%
```

Cuando esta condición se cumple, Amazon SNS envía automáticamente una notificación por correo electrónico.

---

# Seguridad

El proyecto incorpora múltiples controles de seguridad y calidad:

## SonarCloud

- Code Smells
- Bugs
- Vulnerabilidades
- Quality Gate

## npm audit

Análisis de vulnerabilidades en dependencias.

## Trivy

Escaneo de vulnerabilidades sobre imágenes Docker antes del despliegue.

## Dependabot

Actualización automática semanal de:

- Dependencias npm
- GitHub Actions

---

# Trazabilidad

Cada ejecución del pipeline registra automáticamente:

- Repositorio
- Rama
- Commit
- Workflow
- Número de ejecución
- Estado del pipeline

Esto permite identificar exactamente qué versión fue desplegada.

---

# Arquitectura

El proyecto integra los siguientes componentes:

GitHub → GitHub Actions → SonarCloud → Docker → Docker Hub → Amazon EC2 → Kubernetes (K3s) → CloudWatch → Amazon SNS

---

# Modelo de trabajo

Se utilizó GitFlow mediante las ramas:

- `main`
- `develop`
- `feature/*`
- `hotfix/*`

---

# Convenciones de commits

- `feat`
- `fix`
- `docs`
- `ci`
- `test`

---

# Uso de Inteligencia Artificial

Se utilizó Inteligencia Artificial como apoyo para estructurar documentación, revisar configuraciones DevOps y orientar la implementación del pipeline CI/CD, Kubernetes y monitoreo. Todas las decisiones técnicas fueron revisadas y validadas por los integrantes del proyecto.

---

# Integrantes

- Eduardo Cortés Monroy
- Cristian Salas Millón

---

# Evidencias implementadas

## Evaluación Parcial 2

- Pipeline CI/CD
- Docker
- SonarCloud
- Dependabot
- Trivy

## Evaluación Parcial 3

- Kubernetes (K3s) sobre Amazon EC2
- Docker Hub
- Despliegue automático mediante GitHub Actions
- CloudWatch Agent
- Dashboard CloudWatch
- Alarma CPU > 70%
- Amazon SNS
- API desplegada mediante NodePort
- Actualización automática de la aplicación tras un `git push`