# CONSULVET
TFC (Proyecto final DAW) - Aplicación para la solicitud de citas veterinarias
# Instalación y Configuración del Proyecto

Este proyecto utiliza el framework **Angular** para el desarrollo frontend, y el framework **Laravel** para el desarrollo backend, con **XAMPP** para el servidor local y base de datos MySQL.

## Requisitos del Sistema

### Versiones específicas requeridas:
- **PHP**: 8.4.6
- **Composer**: 2.8.8
- **Laravel Framework**: 12.9.1
- **Node.js**: 16.13.0
- **NPM**: 9.3.1
- **Angular CLI**: 14.2.13
- **MySQL**: 15.1 Distrib 10.4.28-MariaDB (incluido en XAMPP)

## Instalación Paso a Paso

### 1. Instalar XAMPP

1. Descargar XAMPP desde: https://www.apachefriends.org/download.html
2. Ejecutar el instalador y seguir las instrucciones
3. Si no lo están por defecto, seleccionar Apache y MySQL durante la instalación
4. Iniciar el Panel de Control de XAMPP
5. Activar los servicios **Apache** y **MySQL**

### 2. Instalar Node.js y NPM

1. Descargar Node.js v16.13.0 desde: https://nodejs.org/download/release/v16.13.0/
2. Ejecutar el instalador (NPM se instala automáticamente)
3. Verificar la instalación:
   ```bash
   node --version
   npm --version
   ```
4. Si la versión de npm no es la correcta (9.3.1), instalar manualmente:
    ```bash
    npm install -g npm@9.3.1
    ```

### 3. Instalar Angular CLI

1. Abrir terminal/cmd como administrador
2. Instalar Angular CLI globalmente:
   ```bash
   npm install -g @angular/cli@14.2.13
   ```
3. Instalar Angular core:
   ```bash
   npm install @angular/core@14.3.0
   ```
4. Verificar la instalación:
   ```bash
   ng version
   ```

### 4. Instalar PHP y Composer

#### Opción A: Usar PHP de XAMPP
1. Agregar la ruta de PHP de XAMPP a las variables de entorno:
   - Ruta típica: `C:\xampp\php`
   - Agregar a la variable PATH del sistema

#### Opción B: Instalar PHP independiente
1. Descargar PHP 8.4.6 desde: https://windows.php.net/downloads/releases/php-8.4.6-nts-Win32-vs16-x64.zip
2. Extraer en una carpeta (ej: `C:\php`)
3. Agregar la ruta a las variables de entorno PATH

#### Instalar Composer
1. Descargar Composer desde: https://getcomposer.org/download/
2. Ejecutar el instalador
3. Verificar la instalación:
   ```bash
   php --version
   composer --version
   ```

### 5. Configurar la Base de Datos

1. Abrir phpMyAdmin: http://localhost/phpmyadmin/
2. Crear vacía la base de datos para el proyecto (consulvet)

### 6. Configurar el Backend (Laravel)

1. Navegar a la carpeta del backend del proyecto:
   ```bash
   cd rutadetucarpeta/backend
   ```

2. Instalar las dependencias de PHP:
   ```bash
   composer install
   ```

3. Copiar el archivo de configuración:
   ```bash
   cp .env.example .env
   ```

4. Editar el archivo `.env` con la configuración de la base de datos:
   ```
   DB_CONNECTION=mysql
   DB_HOST=127.0.0.1
   DB_PORT=3306
   DB_DATABASE=consulvet
   DB_USERNAME=root
   DB_PASSWORD=
   ```

5. Generar la clave de la aplicación:
   ```bash
   php artisan key:generate
   ```

6. Ejecutar las migraciones y seeders (crea las tablas de la base de datos y las rellena, en una sola instrucción):
   ```bash
   php artisan migrate --seed
   ```

7. Iniciar el servidor de Laravel:
   ```bash
   php artisan serve
   ```
   El backend estará disponible en: http://localhost:8000

### 7. Configurar el Frontend (Angular)

1. Abrir una nueva terminal y navegar a la carpeta del frontend:
   ```bash
   cd rutadetucarpeta/frontend/consulvet-frontend
   ```

2. Instalar las dependencias de Node.js:
   ```bash
   npm install
   ```

3. Iniciar el servidor de desarrollo de Angular:
   ```bash
   ng serve
   ```
   El frontend estará disponible en: http://localhost:4200

## Comandos Importantes

### Para el Backend (Laravel):
```bash
# Instalar dependencias
composer install

# Ejecutar migraciones
php artisan migrate --seed

# Iniciar servidor
php artisan serve

# Limpiar caché
php artisan cache:clear
php artisan config:clear
```

### Para el Frontend (Angular):
```bash
# Instalar dependencias
npm install

# Iniciar servidor de desarrollo
ng serve
```

## Solución de Problemas Comunes

### Error de permisos en Windows
- Ejecutar la terminal como administrador

### Error de conexión a la base de datos
- Verificar que MySQL esté ejecutándose en XAMPP
- Revisar las credenciales en el archivo `.env` (root sin contraseña)

### Error "ng command not found"
- Verificar que Angular CLI esté instalado globalmente
- Reiniciar la terminal después de la instalación

### Error de versión de Node.js
- Verificar que esté instalada la versión correcta (16.13.0)
- Dentro del proyecto, desde la terminal de VSCode, si surgen conflictos por incomptabilidades de versiones, forzar la instalación (es habitual que surjan, por estar trabajando con una versión de Angular antigua)
```bash
npm install --legacy-peer-deps
```

## Notas Adicionales

- Mantener XAMPP ejecutándose durante las pruebas
- El backend debe estar ejecutándose antes de iniciar el frontend
- Verificar que los puertos 8000 (Laravel) y 4200 (Angular) estén disponibles
- En caso de problemas, revisar los logs en la terminal

## Enlaces Útiles

- [Documentación de Laravel](https://laravel.com/docs)
- [Documentación de Angular](https://angular.io/docs)
- [XAMPP](https://www.apachefriends.org/)
- [Node.js](https://nodejs.org/)
- [Composer](https://getcomposer.org/)

---