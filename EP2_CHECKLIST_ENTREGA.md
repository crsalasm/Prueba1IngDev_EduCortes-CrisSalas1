# Checklist de entrega EP2

## Archivos agregados o modificados

- `Dockerfile`: contiene el microservicio con Node.js 20 Alpine, usuario no root y healthcheck.
- `.dockerignore`: reduce el contexto de build de Docker.
- `docker-compose.yml`: simula el despliegue cloud y define parametros de seguridad, recursos y healthcheck.
- `.github/workflows/ci-cd.yml`: pipeline CI/CD completo en GitHub Actions.
- `.github/dependabot.yml`: alertas y actualizaciones automaticas de dependencias.
- `README.md`: documentacion del pipeline, trazabilidad, calidad, seguridad y ejecucion.
- `package.json`: scripts para pruebas, auditoria, Docker y Compose.

## Requisitos de la pauta

- IE1 Contenedores: cubierto con `Dockerfile` y build en GitHub Actions.
- IE2 Pruebas automatizadas: cubierto con `npm test` en el job `test`.
- IE3 Seguridad y escalabilidad: cubierto con bloqueo por `npm audit`, Trivy como evidencia del escaneo de imagen, Snyk opcional, limites de recursos y configuraciones de seguridad en Compose.
- IE4 Despliegue automatico simulado: cubierto con el job `deploy-simulado` usando Docker Compose.
- IE5 Orquestacion: cubierto con `docker-compose.yml`.

## Pasos para subirlo a GitHub

1. Copiar estos archivos al repositorio local o trabajar directamente sobre esta carpeta.
2. Instalar Git, Node.js LTS y Docker Desktop si se desea probar localmente.
3. Subir los cambios al repositorio de GitHub.
4. Abrir la pestana `Actions` en GitHub y revisar el workflow `CI/CD MasterBikes`.
5. Si se usara Snyk, crear el secreto `SNYK_TOKEN` en GitHub:
   - `Settings > Secrets and variables > Actions > New repository secret`
   - Nombre: `SNYK_TOKEN`
   - Valor: token de la cuenta Snyk

## Comandos de verificacion local

```bash
npm ci
npm test
npm audit --audit-level=high
docker build -t masterbikes-api:local .
docker compose up -d --build
curl http://localhost:3000/health
docker compose down
```

## Nota para la entrega

En AVA se debe entregar el enlace del repositorio GitHub donde esten estos archivos. La evidencia principal queda en la pestana `Actions`, ya que muestra pruebas, seguridad, build Docker y despliegue simulado asociados al commit.
