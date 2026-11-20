#  Turnos App API — Sistema de Gestión de Turnos (Web & Mobile)

    > API RESTful robusta y escalable desarrollada con el **Stack MERN** para la administración integral de reservas y turnos en tiempo real, diseñada con arquitectura en capas, control de acceso
  basado en roles (RBAC) y manejo centralizado de excepciones.

    ![NodeJS](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)
    ![Express](https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white)
    ![MongoDB](https://img.shields.io/badge/MongoDB-47A248?style=for-the-badge&logo=mongodb&logoColor=white)
    ![JWT](https://img.shields.io/badge/JWT-black?style=for-the-badge&logo=JSON%20web%20tokens)
    ![Status](https://img.shields.io/badge/Estado-En_Desarrollo_Activo-blue?style=for-the-badge)

    ---

    ##  Visión General del Proyecto

    Este repositorio contiene el núcleo **Backend (API)** de la plataforma multiplataforma de turnos. El sistema permite desacoplar la lógica de negocio para abastecer tanto a clientes **Web
  (React)** como a aplicaciones **Móviles (React Native)**.

    ###  Capacidades Principales
    * **Autenticación Segura:** Registro e inicio de sesión utilizando tokens **JWT (JSON Web Tokens)** con contraseñas encriptadas.
    * **Control de Acceso Basado en Roles (RBAC):** Restricción de endpoints según el perfil del usuario (**Cliente** vs. **Administrador**).
    * **Gestión de Turnos:** Creación, cancelación, consulta de disponibilidad horaria y estados de reservas.
    * **Pipeline de Middlewares Modular:** Validación de esquemas, verificación de sesiones y políticas de autorización.
    * **Middleware de Logs:** Auditoría y trazabilidad de peticiones HTTP en tiempo real.
    * **Manejador Centralizado de Errores:** Estandarización de respuestas HTTP de error evitando fugas de información interna.

    ---

    ##  Pipeline de Seguridad y Middlewares

    Cada petición HTTP entrante atraviesa una cadena de middlewares antes de llegar a la lógica de negocio:


    ┌────────────────────────────────────────┐                                ┌──────────────────────────────────────────────┐   ┌──────────────────────────────────────────┐
    │                                        │                                │                                              │   │                                          │
    │   Req([Petición Cliente: Web / App])   ├───────────────────────────────►│    1️⃣ Logger Middleware (Registro de HTTP)  ├──►│ Auth{"2️⃣ Auth Middleware (¿JWT Válido?)"}
    │                                        │                                │                                              │   │                                          │
    └────────────────────────────────────────┘                                └──────────────────────────────────────────────┘   └──────────────────────────────────────────┘


    ┌────────────────────────────────────────┐                                ┌──────────────────────────────────────────────┐   ┌──────────────────────────────────────────┐
    │                                        │                                │                                              │   │                                          │
    │                  Auth                  ├─Token─Inválido─/─No─provisto──►│            HTTP 401: Unauthorized            │   │     HTTP 200 / 201 (Respuesta JSON)      │
    │                                        │                                │                                              │   │                                          │
    └────────────────────┬───────────────────┘                                └──────────────────────────────────────────────┘   └──────────────────────────────────────────┘
                         │                                                                                                                             ▲
                         └────────────────────────────────────┐                                                                                        │
    ┌────────────────────────────────────────┐          Token Válido          ┌──────────────────────────────────────────────┐                         │
    │                                        │                │               │                                              │                         │
    │                  Role                  │                └──────────────►│ Role{"3️⃣ Role Middleware (¿Tiene permisos?)"}                         │
    │                                        │                                │                                              │                         │
    └────────────────────┬───────────────────┘                                └──────────────────────────────────────────────┘                         │
                         │                                                                                                                             │
                         └────────────────────────────────────┐                                                                                        │
    ┌────────────────────────────────────────┐        Rol Insuficiente        ┌──────────────────────────────────────────────┐                         │
    │                                        │                │               │                                              │                         │
    │               Controller               │                ├──────────────►│             HTTP 403: Forbidden              │                         │
    │                                        │                │               │                                              │                         │
    └────────────────────┬───────────────────┘           Autorizado           └──────────────────────────────────────────────┘                         │
                         │                                    │                                                                                        │
                         └────────────────────────────────────┤                                                                                        │
    ┌────────────────────────────────────────┐           Autorizado           ┌──────────────────────────────────────────────┐                         │
    │                                        │                │               │                                              │                         │
    │ 5️⃣ Centralized Error Handler (HTTP 500)                ├──────────────►│          Controller["4️⃣ Controlador         │                         │
    │                                        │                │               │                                              │                         │
    └────────────────────────────────────────┘                │               └──────────────────────────────────────────────┘                         │
                                                              │                                                                                        │
                                                              │                                                                                        │
                                                              │               ┌──────────────────────────────────────────────┐                         │
                                                              │               │                                              │                         │
                                                              ├──────────────►│        Servicio (Lógica de Turnos)"]         │                         │
                                                              │               │                                              │                         │
                                                              │               └──────────────────────────────────────────────┘                         │
                                                              │                                                                                        │
                                                              │                                                                                        │
                                                              │               ┌──────────────────────────────────────────────┐                         │
                                                              │               │                                              │                         │
                                                              └──────────────►│             (MongoDB / Mongoose)             ├─────────────────────────┘
                                                                              │                                              │
                                                                              └──────────────────────────────────────────────┘


    ---

    ##  Especificación de Endpoints (Referencia de la API)

    ###  Autenticación & Usuarios (`/api/auth`)
    | Método | Endpoint | Acceso | Descripción |
    | :--- | :--- | :--- | :--- |
    | `POST` | `/api/auth/register` | Público | Registro de nuevos clientes. |
    | `POST` | `/api/auth/login` | Público | Autenticación y generación de token JWT. |
    | `GET` | `/api/auth/profile` | Autenticado | Obtiene la información del perfil del usuario en sesión. |

    ###  Gestión de Turnos (`/api/turnos`)
    | Método | Endpoint | Acceso | Descripción |
    | :--- | :--- | :--- | :--- |
    | `GET` | `/api/turnos` | Cliente / Admin | Listar turnos (el cliente ve los propios; el admin ve todos). |
    | `POST` | `/api/turnos` | Cliente / Admin | Solicitar / agendar un nuevo turno. |
    | `GET` | `/api/turnos/disponibilidad`| Público / Cliente | Consulta horarios y fechas disponibles. |
    | `PATCH`| `/api/turnos/:id/estado` | Solo Admin | Actualizar estado del turno (Confirmado, Cancelado, Completado). |
    | `DELETE`| `/api/turnos/:id` | Cliente / Admin | Cancelación de un turno agendado. |

    ---

    ##  Arquitectura de Directorios

    El backend sigue el patrón de separación de responsabilidades:

    ```bash
    app-turnos-api/
    ├── src/
    │   ├── config/             # Configuración de base de datos y entorno
    │   ├── controllers/        # Controladores de lógica de entrada/salida
    │   ├── middlewares/        # Auth (JWT), Roles, Logs y Central Error Handler
    │   ├── models/             # Esquemas de Mongoose (User, Turno, etc.)
    │   ├── routes/             # Definición de rutas modularizadas
    │   ├── services/           # Lógica de negocio e interacción con BD
    │   └── app.js              # Inicialización de Express y middlewares globales
    ├── .env.example            # Plantilla de variables de entorno
    ├── server.js               # Punto de entrada y arranque del servidor
    └── package.json
  ──────
  ##  Instalación y Puesta en Marcha Local

  ### Prerrequisitos

  • Node.js (versión 18 o superior).
  • MongoDB (instancia local o clúster en MongoDB Atlas).

  ### 1. Clonar el repositorio

    git clone https://github.com/Ulises1577/app-turnos-api.git
    cd app-turnos-api

  ### 2. Instalar dependencias

    npm install

  ### 3. Configurar variables de entorno

  Crea un archivo .env en la raíz basado en .env.example:

    PORT=5000
    MONGODB_URI=mongodb://localhost:27017/turnos_db
    JWT_SECRET=tu_clave_secreta_super_segura
    JWT_EXPIRES_IN=7d

  ### 4. Ejecutar el servidor en modo desarrollo

    npm run dev

  El servidor quedará escuchando en http://localhost:5000.
  ──────
  ##  Hoja de Ruta (Roadmap hacia Diciembre)

  [✓] Arquitectura base y conexión a MongoDB.
  [✓] Autenticación de usuarios con JWT y hashing de contraseñas con bcrypt.
  [✓] Middlewares de autorización y validación por roles (Admin/Cliente).
  [✓] CRUD principal de turnos y agendas.
  [ ] Integración con cliente Web (React).
  [ ] Integración con cliente Móvil (React Native).
  [ ] Notificaciones automáticas de confirmación de turno
