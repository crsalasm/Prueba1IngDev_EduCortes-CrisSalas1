# Instalacion recomendada para PC nuevo

Para trabajar y probar la EP2 localmente se recomienda instalar estas herramientas:

1. Git para Windows
   - Descargar desde: https://git-scm.com/download/win
   - Sirve para clonar, subir cambios, crear commits y sincronizar con GitHub.

2. Node.js LTS
   - Descargar desde: https://nodejs.org/
   - Instalar la version LTS.
   - Incluye `node` y `npm`.

3. Docker Desktop
   - Descargar desde: https://www.docker.com/products/docker-desktop/
   - Sirve para construir la imagen Docker y ejecutar `docker compose`.
   - Puede solicitar reiniciar el PC o activar WSL 2.

## Verificacion despues de instalar

Abrir PowerShell nuevo y ejecutar:

```powershell
git --version
node --version
npm --version
docker --version
docker compose version
```

Luego, dentro de la carpeta del proyecto:

```powershell
npm ci
npm test
docker compose up -d --build
curl http://localhost:3000/health
docker compose down
```

Si esos comandos funcionan, el PC queda listo para desarrollar, probar y subir la entrega a GitHub.

## Si Docker no inicia por WSL 2

Si `docker info` o `wsl --install -d Ubuntu` muestran un error como `HCS_E_HYPERV_NOT_INSTALLED`, Windows aun no tiene activo el hipervisor requerido por WSL 2.

Abrir PowerShell como Administrador y ejecutar:

```powershell
dism.exe /online /enable-feature /featurename:Microsoft-Windows-Subsystem-Linux /all /norestart
dism.exe /online /enable-feature /featurename:VirtualMachinePlatform /all /norestart
bcdedit /set hypervisorlaunchtype auto
```

Despues reiniciar el PC.

Si el error continua, entrar a la BIOS/UEFI del equipo y activar la virtualizacion del procesador:

- Intel: Intel VT-x o Intel Virtualization Technology.
- AMD: SVM Mode o AMD-V.

Luego iniciar Docker Desktop nuevamente y repetir:

```powershell
wsl --install -d Ubuntu
wsl -l -v
docker info
```
