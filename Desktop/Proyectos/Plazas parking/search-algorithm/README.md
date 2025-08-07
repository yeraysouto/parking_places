# Sistema de Plazas de Parking

Un sistema web para gestionar plazas de parking con Flask, SQLite y Docker.

## 🚀 Características

- **Gestión de Plazas**: Visualización y control del estado de las plazas
- **Tipos de Plaza**: Normal, Discapacitados, Eléctrico
- **Estados**: Libre, Ocupada, Reservada
- **Interfaz Web**: Diseño responsive con Bootstrap
- **API REST**: Endpoints para gestión programática
- **Base de Datos**: SQLite con SQLAlchemy

## 🛠️ Tecnologías

- **Backend**: Python 3.10, Flask, SQLAlchemy
- **Frontend**: HTML5, CSS3, JavaScript, Bootstrap 5
- **Base de Datos**: SQLite
- **Contenedores**: Docker, Docker Compose

## 📋 Requisitos

- Docker
- Docker Compose

## 🚀 Instalación y Ejecución

### 1. Clonar el repositorio
```bash
git clone <url-del-repositorio>
cd plazas-parking
```

### 2. Ejecutar con Docker Compose

#### Modo Producción
```bash
docker-compose up
```

#### Modo Desarrollo (con hot-reload)
```bash
docker compose --profile dev up
```

#### Ejecutar en background
```bash
docker compose up -d
```

### 3. Acceder a la aplicación

- **URL**: http://localhost:8000
- **Puerto**: 8000 (producción) / 5001 (desarrollo)

## 📁 Estructura del Proyecto

```
plazas-parking/
├── Dockerfile              # Configuración del contenedor
├── docker-compose.yml      # Orquestación de servicios
├── requirements.txt        # Dependencias de Python
├── README.md              # Documentación
├── src/                   # Código fuente
│   ├── __init__.py
│   ├── app.py            # Aplicación Flask principal
│   └── templates/        # Plantillas HTML
│       ├── base.html     # Plantilla base
│       └── index.html    # Página principal
└── data/                 # Directorio para la base de datos
    └── .gitkeep
```

## 🔧 Comandos Útiles

### Docker Compose
```bash
# Construir imágenes
docker compose build

# Ejecutar servicios
docker compose up

# Parar servicios
docker compose down

# Ver logs
docker compose logs -f

# Ejecutar en modo desarrollo
docker compose --profile dev up
```

### Desarrollo Local (sin Docker)
```bash
# Instalar dependencias
pip install -r requirements.txt

# Ejecutar aplicación
python src/app.py
```

## 📊 API Endpoints

### GET /api/plazas
Obtiene todas las plazas de parking.

**Respuesta:**
```json
[
  {
    "id": 1,
    "numero": "A1",
    "estado": "libre",
    "tipo": "normal"
  }
]
```

### PUT /api/plazas/{id}
Actualiza el estado de una plaza.

**Body:**
```json
{
  "estado": "ocupada"
}
```

### POST /api/reservas
Crea una nueva reserva.

**Body:**
```json
{
  "plaza_id": 1,
  "matricula": "ABC123",
  "fecha_inicio": "2024-01-15T10:00:00",
  "fecha_fin": "2024-01-15T12:00:00"
}
```

## 🎨 Funcionalidades de la Interfaz

- **Dashboard**: Estadísticas en tiempo real
- **Filtros**: Por estado y tipo de plaza
- **Gestión**: Cambiar estado de plazas
- **Responsive**: Diseño adaptativo
- **Actualización**: Botón de refresh

## 🔒 Variables de Entorno

- `PYTHONUNBUFFERED=1`: Salida de Python sin buffer
- `SQLITE_DATABASE_URL`: URL de la base de datos SQLite
- `FLASK_ENV`: Entorno de Flask (development/production)
- `FLASK_APP`: Archivo principal de la aplicación

## 📝 Notas de Desarrollo

- La base de datos se crea automáticamente en `data/mi_base_de_datos.db`
- Se incluyen 5 plazas de ejemplo al iniciar
- Los cambios en el código se reflejan automáticamente en modo desarrollo
- La aplicación es completamente funcional desde el primer inicio

## 🤝 Contribuir

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## 📄 Licencia

Este proyecto está bajo la Licencia MIT - ver el archivo [LICENSE](LICENSE) para detalles. 