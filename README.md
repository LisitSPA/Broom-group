# Broom App

## Descripción General

Este proyecto es una app construida con **Ruby on Rails** y **ReactJs**, para gestionar y explorar sociedades. Con funcionalidades centradas en la gestión de una matriz y sus versiones.

## Requisitos del Sistema

- **Ruby**: `3.0.0`
- **Rails**: `7.0.8`
- **PostgreSQL**: `1.1`
- **ReactJs**: `18.2.0`

## Dependencias

- **Vite Rails y Vite Ruby**: Integración con frontend moderno.
- **Active Model Serializers**: Para serializar respuestas JSON.
- **Devise**: Autenticación de usuarios.
- **Redux**: Gestión de estado de la app.

## Frontend

Este proyecto utiliza **Vite.js** para una construir el frontend. Algunas de las bibliotecas JS clave incluyen:

- **ReactJs**: Biblioteca JS para construir interfaces de usuario.
- **Redux**: Gestión del estado de la aplicación.
- **Framer Motion**: Biblioteca para animaciones en React.
- **Classnames**: Utilidad para condicionalmente unir classNames juntos.
- **TailwindCSS**: Framework CSS para construir interfaces de usuario.

## Instalación y Configuración con Docker

1. Clonar el repositorio.
2. Instalar **Docker** y **Docker Compose**.
3. Ejecutar `docker compose build --no-cache` para construir las imágenes de Docker sin usar caché.
4. Correr `docker compose run broom-app bundle install` para instalar las gemas de Ruby.
5. Ejecutar `docker compose run broom-app rails db:create db:migrate db:seed` para configurar la base de datos.
6. Iniciar con `docker compose up`.

## Conceptos Clave del Proyecto

#### Matriz de Participación
Es una matriz donde cada celda muestra cuánto porcentaje de una sociedad (fila) pertenece a otra sociedad (columna).

#### Grafo Dirigido
Es como un mapa de puntos (sociedades) conectados por flechas (participaciones).

#### Ciclos
Cuando el viaje vuelve a un punto en el grafo siguiendo las flechas.

#### Lista de Adyacencia
Es una lista de todas las sociedades y quiénes están conectadas a ellas.
