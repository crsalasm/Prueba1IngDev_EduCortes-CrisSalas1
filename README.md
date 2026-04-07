# Proyecto DevOps - MasterBikes

## Descripción
Este proyecto consiste en la implementación de un flujo DevOps utilizando GitHub. Se trabaja con una aplicación web (MasterBikes) y un microservicio en Node.js que entrega un catálogo de bicicletas.

## Microservicio
El microservicio permite consultar información de bicicletas mediante endpoints:

- GET /health → verifica que el servicio esté activo  
- GET /api/bicicletas → devuelve el catálogo  

## Tecnologías
- Node.js  
- Express  
- Git y GitHub  
- GitHub Actions  

## Modelo de trabajo
Se utilizó **GitFlow**, usando las siguientes ramas:

- main → versión final  
- develop → integración  
- feature/* → nuevas funcionalidades  
- hotfix/* → correcciones  

## Flujo de trabajo
- feature → develop  
- develop → main  
- hotfix → main  

Se realizaron:
- 2 features  
- 1 hotfix  

## Convenciones de commits
- feat: nuevas funcionalidades  
- fix: correcciones  
- docs: documentación  
- ci: integración continua  

## Automatización
Se configuró GitHub Actions para ejecutar automáticamente:

- push en develop  
- pull request hacia main  

## Integrantes
- Eduardo Cortes  
- Cristian Salas  