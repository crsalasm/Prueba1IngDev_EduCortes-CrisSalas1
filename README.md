# Proyecto DevOps - MasterBikes

## Descripción

Este repositorio corresponde a la evolución del proyecto desarrollado durante las Evaluaciones DevOps.

Durante la Evaluación Parcial 1 se desarrolló el microservicio del catálogo de bicicletas de MasterBikes.

En la Evaluación Parcial 2 se incorporó un pipeline CI/CD automatizado con controles de calidad, seguridad y construcción de imágenes Docker.

Finalmente, en la Evaluación Parcial 3 se integró el despliegue del microservicio sobre Kubernetes en AWS, junto con mecanismos de monitoreo, observabilidad y alertas mediante Amazon CloudWatch.

El objetivo del proyecto es automatizar completamente el ciclo de vida del software, garantizando calidad, seguridad, disponibilidad y trazabilidad.

---

# Microservicio

Aplicación desarrollada en Node.js utilizando Express.

## Endpoints principales

* `GET /health`
* `GET /api/bicicletas`
* `GET /api/bicicletas?categoria=ruta`
* `GET /api/bicicletas/:id`

---

# Tecnologías utilizadas

* Node.js 20
* Express
* Docker
* Docker Compose
* Kubernetes (K3s)
* Nginx
* GitHub Actions
* GitHub
* Docker Hub
* Amazon EC2
* Amazon CloudWatch
* Amazon SNS
* SonarCloud
* Dependabot
* Trivy

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

La API queda disponible en

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

# Orquestación y despliegue

Durante la Evaluación Parcial 2 el entorno fue simulado utilizando Docker Compose.

En la Evaluación Parcial 3 el microservicio fue desplegado sobre Kubernetes (K3s) utilizando una instancia Amazon EC2.

Se implementaron los siguientes recursos:

* Deployment
* Service tipo NodePort
* Dos réplicas del microservicio
* Health Checks
* Liveness Probe
* Readiness Probe
* Recursos de CPU y memoria

La aplicación quedó disponible mediante un Service NodePort y fue validada desde navegador y mediante solicitudes HTTP.

---

# Kubernetes

La carpeta `k8s/` contiene los manifiestos utilizados para el despliegue.

## deployment.yaml

Define:

* Deployment
* Dos Pods
* Imagen Docker publicada en Docker Hub
* Variables de entorno
* Recursos
* Health Checks

## service.yaml

Define:

* Service tipo NodePort
* Puerto 30080
* Exposición del microservicio hacia el exterior

---

# Pipeline CI/CD

Workflow principal

```text
.github/workflows/ci-cd.yml
```

## Etapas del pipeline

### 1. Pruebas automatizadas

* Checkout
* Node.js
* npm ci
* npm test

### 2. Seguridad y calidad

* npm audit
* SonarCloud
* Quality Gate

Si existen problemas críticos de calidad o seguridad el pipeline puede detener su ejecución.

### 3. Docker

* Build imagen Docker
* Escaneo mediante Trivy

### 4. Despliegue

* Docker Compose
* Validación endpoint /health
* Evidencia de trazabilidad

---

# Monitoreo y Observabilidad

Para la Evaluación Parcial 3 se implementó monitoreo utilizando Amazon CloudWatch.

## CloudWatch Agent

Se instaló CloudWatch Agent sobre la instancia EC2 para recopilar métricas del sistema.

Se monitorean:

* CPU
* Memoria
* Disco
* Red

Además se enviaron logs del sistema hacia CloudWatch Logs.

---

# Dashboard

Se creó un Dashboard denominado:

```text
MasterBikes-Dashboard
```

El dashboard incorpora:

* CPU Utilization
* Memory Used
* Disk Used
* Network In
* Network Out

Estas métricas permiten observar el comportamiento del microservicio y detectar posibles anomalías durante su ejecución.

---

# Alarmas

Se implementó una alarma utilizando Amazon CloudWatch.

Condición configurada:

```text
CPUUtilization > 70%
```

Cuando la condición se cumple:

* Amazon SNS envía automáticamente un correo electrónico notificando la alerta.

---

# Docker Hub

La imagen del microservicio fue publicada en Docker Hub para ser utilizada por Kubernetes durante el despliegue.

---

# Dependabot

Dependabot realiza revisiones automáticas semanales de:

* npm
* GitHub Actions

Generando Pull Requests automáticos cuando existen actualizaciones o vulnerabilidades conocidas.

---

# Seguridad y calidad

El proyecto incorpora múltiples mecanismos de validación.

## SonarCloud

* Calidad de código
* Code Smells
* Bugs
* Vulnerabilidades
* Quality Gate

## npm audit

Detección de vulnerabilidades en dependencias.

## Trivy

Escaneo de imágenes Docker antes del despliegue.

---

# Trazabilidad

Durante cada ejecución del pipeline se registra:

* Repositorio
* Rama
* Commit
* Workflow
* Número de ejecución
* Estado del pipeline

Esto permite identificar exactamente qué versión fue desplegada.

---

# Modelo de trabajo

Se utilizó GitFlow.

Ramas:

* main
* develop
* feature/*
* hotfix/*

---

# Convenciones de commits

* feat
* fix
* docs
* ci
* test

---

# Arquitectura implementada

El proyecto integra:

* GitHub
* GitHub Actions
* SonarCloud
* Dependabot
* Docker
* Docker Hub
* Kubernetes (K3s)
* Amazon EC2
* Amazon CloudWatch
* Amazon SNS
* Node.js
* Express

---

# Uso de Inteligencia Artificial

Se utilizó Inteligencia Artificial como apoyo para:

* estructurar documentación;
* revisar configuraciones DevOps;
* apoyar la creación de archivos base del pipeline CI/CD;
* orientar la configuración de Kubernetes y CloudWatch.

Todas las decisiones técnicas fueron revisadas, comprendidas y validadas por ambos integrantes antes de ser implementadas.

---

# Integrantes

* Eduardo Cortés Monroy
* Cristian Salas Millón

---

## Evidencias

Evaluación Parcial 2

* Pipeline CI/CD funcionando
* Docker
* SonarCloud
* Dependabot
* Trivy

Evaluación Parcial 3

* Kubernetes sobre Amazon EC2
* CloudWatch Dashboard
* CloudWatch Agent
* Alarma CPU >70%
* Amazon SNS
* API desplegada y funcionando
* Microservicio accesible mediante NodePort
