# Backend Reto Coordinadora

## 📌 Descripción del Proyecto
Este proyecto es el backend de un sistema para una empresa de logística que permite gestionar el envío de paquetes, optimizar rutas de entrega y permitir a los clientes rastrear sus pedidos en tiempo real. La solución está desarrollada con Node.js y Express, utilizando MySQL como base de datos.

## 🚀 Características
- Gestión de envíos y seguimiento en tiempo real
- Optimización de rutas de entrega
- Autenticación segura con JWT
- Estructura modular para escalabilidad

## 🛠️ Tecnologías Utilizadas
- **Backend:** Node.js, Express
- **Base de datos:** MySQL
- **Autenticación:** JWT
- **Herramientas adicionales:** bcryptjs, dotenv, cors, axios

## 📂 Estructura del Proyecto
```
backend-reto-coordinadora/
│-- src/
│   │-- config/         # Configuración del sistema
│   │-- controllers/    # Controladores de las rutas
│   │-- models/         # Modelos de la base de datos
│   │-- middlewares/    # Middlewares para seguridad y validaciones
│   │-- routes/         # Definición de las rutas
│   │-- services/       # Lógica de negocio
│   │-- utils/          # Utilidades generales
│   │-- app.js          # Configuración principal de Express
│   └-- server.js       # Inicio del servidor
│-- package.json        # Dependencias y scripts
│-- .env.example        # Variables de entorno
```

## 🔧 Instalación y Configuración
### 1️⃣ Requisitos previos
- Node.js (v16+ recomendado)
- MySQL 8.0

### 2️⃣ Clonar el repositorio
```sh
git clone https://github.com/fabianmenjura/logistic-system-backend.git
cd backend-reto-coordinadora
```
###  Importar base de datos
Asegúrate de tener MySQL en funcionamiento y ejecuta:
```sh
mysql -u root -p logistic-system < logistic-system.sql
```
O también se puede ejecutar el sql en el motor de base de datos que estemos usando
### 3️⃣ Instalar dependencias
```sh
npm install
```

### 4️⃣ Configurar las variables de entorno
Crea un archivo `.env` en la raíz del proyecto con el siguiente contenido o renombra el archivo envExample.txt como .env :
```env
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=
DB_NAME=logistic-system
REDIS_URL=redis://localhost:6379
JWT_SECRET=G7$eK9@qL2*P5&vR8!zX
PORT=3000
GOOGLE_MAPS_API_KEY=
```



### 5️⃣ Iniciar el servidor
#### Modo desarrollo
```sh
npm run dev
```
#### Modo producción
```sh
npm run build
npm start
```

## 📡 Endpoints Principales
### 🔒 Autenticación
| Método | Ruta           | Descripción |
|--------|--------------|-------------|
| POST   | /api/auth/login  | Iniciar sesión |
| POST   | /api/auth/register | Registrar usuario |

# Autenticación
{
    "username": "admin",
    "password": "admin123"
}



# Registro

{
    "username": "user4",
    "password": "user4"
}

En la base de datos se debe asignar rol de administrador 
### 📦 Gestión de Envíos
| Método | Ruta                | Descripción |
|--------|--------------------|-------------|
| GET    | /api/orders/:id        | Obtener detalles de un envío |
| POST   | /api/orders            | Crear un nuevo envío |

## 🔐 Seguridad
- Se utiliza JWT para la autenticación de usuarios.
- Hash de contraseñas con **bcryptjs**.
- Uso de **CORS** para restringir accesos no permitidos.
