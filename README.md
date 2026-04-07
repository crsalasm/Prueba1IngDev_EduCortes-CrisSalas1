# Evaluacion Parcial 1 - Base DevOps para Microservicio MasterBikes

Repositorio preparado como base de trabajo para un pipeline DevOps semestral. El proyecto utiliza un microservicio Node.js con Express para exponer un catalogo de bicicletas y una interfaz web estatica de apoyo en la carpeta `masterbikes-main`.

## Descripcion del microservicio

El servicio publica un catalogo inicial de bicicletas y un endpoint de salud para automatizar verificaciones basicas.

### Endpoints

- `GET /health`: valida que el servicio se encuentre disponible.
- `GET /api/bicicletas`: retorna el catalogo base de bicicletas.

## Tecnologias utilizadas

- Node.js
- Express
- CORS
- Git y GitHub
- GitHub Actions

## Estrategia de ramas elegida

Se implementa **GitFlow**.

### Justificacion

GitFlow fue elegido porque la evaluacion pide separar desarrollo estable, integracion y trabajo puntual por tipo de cambio. Este modelo facilita demostrar trazabilidad, colaboracion y orden en un proyecto academico donde debemos evidenciar:

- una rama `main` para versiones estables o listas para entrega,
- una rama `develop` para integrar trabajo en curso,
- ramas `feature/<nombre>` para nuevas funcionalidades,
- ramas `hotfix/<nombre>` para correcciones urgentes sobre la base estable.

Para este encargo, GitFlow resulta mas claro que trunk-based porque deja visible el ciclo completo de feature, revision, merge y correccion urgente.

## Estructura de ramas requerida

- `main`: rama productiva y estable.
- `develop`: rama de integracion de cambios antes de pasar a `main`.
- `feature/<nombre>`: trabajo de nuevas funcionalidades.
- `hotfix/<nombre>`: correcciones urgentes detectadas en la version estable.

### Ramas a utilizar en esta entrega

- `feature/consulta-por-id`
- `feature/filtro-por-categoria`
- `hotfix/respuesta-404-bicicleta`

## Flujo de trabajo de merges

1. `main` contiene la base estable del microservicio.
2. `develop` nace desde `main` y concentra el trabajo en integracion.
3. Cada nueva funcionalidad se desarrolla en una rama `feature/<nombre>` creada desde `develop`.
4. Cada feature se integra a `develop` mediante Pull Request.
5. Si aparece una correccion urgente, se crea `hotfix/<nombre>` desde `main`.
6. El hotfix se fusiona a `main` y luego se replica hacia `develop`.

## Simulacion de desarrollo colaborativo

Para cumplir con la evaluacion se deben evidenciar al menos estos Pull Requests en GitHub:

1. Un PR desde `feature/consulta-por-id` hacia `develop`.
2. Un PR desde `feature/filtro-por-categoria` hacia `develop`.
3. Un PR desde `hotfix/respuesta-404-bicicleta` hacia `main`.

Despues del hotfix, se recomienda un merge adicional desde `main` o desde la rama hotfix hacia `develop` para mantener ambas ramas sincronizadas.

## Convenciones del repositorio

### Convencion de commits

Se usara un formato corto y consistente basado en prefijos:

- `feat:` para nuevas funcionalidades.
- `fix:` para correcciones.
- `docs:` para cambios de documentacion.
- `chore:` para tareas de configuracion o mantenimiento.
- `test:` para pruebas automatizadas.
- `ci:` para integracion continua o workflows.

### Ejemplos de commits

- `feat: agregar endpoint de consulta por id`
- `feat: incluir filtro por categoria en catalogo de bicicletas`
- `fix: retornar 404 cuando la bicicleta no existe`
- `ci: ejecutar pruebas en develop y pull requests a main`

### Naming de ramas

- `feature/<descripcion-corta-en-kebab-case>`
- `hotfix/<descripcion-corta-en-kebab-case>`

### Reglas de merge

- No realizar cambios directos en `main`.
- Integrar features a `develop` solo mediante Pull Request.
- Integrar hotfix a `main` mediante Pull Request.
- Resolver conflictos antes de aprobar el merge.
- Mantener mensajes de PR claros y vinculados al cambio realizado.

### Estrategia de revision

- Cada Pull Request debe ser revisado por al menos un integrante del equipo antes del merge.
- La revision debe validar funcionamiento, claridad del codigo y consistencia con las convenciones.
- Se debe confirmar que la GitHub Action pase correctamente antes de aprobar.

## Automatizacion con GitHub Actions

El repositorio incluye un workflow ubicado en `.github/workflows/ci.yml`.

### Disparadores configurados

- `push` sobre la rama `develop`
- `pull_request` con destino `main`

### Tareas automatizadas

- instalacion de dependencias con `npm ci`,
- ejecucion de pruebas con `npm test`.

## Preparacion local del proyecto

```bash
npm ci
npm start
```

El servidor queda disponible en `http://localhost:3000`.

Para ejecutar las pruebas:

```bash
npm test
```

## Estructura principal del proyecto

```text
.
|-- .github/workflows/ci.yml
|-- masterbikes-main/
|-- src/app.js
|-- test/run-tests.js
|-- server.js
|-- package.json
`-- README.md
```

## Evidencias que deben verse en GitHub al entregar

- repositorio publicado en GitHub,
- ramas `main`, `develop`, al menos dos `feature/*` y una `hotfix/*`,
- historial de commits siguiendo convenciones,
- Pull Requests creados para features y hotfix,
- workflow de GitHub Actions ejecutandose en `develop` y en PR hacia `main`,
- README con estrategia GitFlow, convenciones y flujo colaborativo.
