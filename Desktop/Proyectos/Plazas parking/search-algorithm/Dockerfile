# 1. Imagen base con Python
FROM python:3.10-slim

# 2. Directorio de trabajo dentro del contenedor
WORKDIR /app

# 3. Copiamos solo dependencias para aprovechar cache
COPY requirements.txt .

# 4. Instalamos paquetes
RUN pip install --no-cache-dir -r requirements.txt

# 5. Copiamos el resto de la app
COPY src/ ./src

# 6. Punto de entrada (puede ser tu script principal o bash para desarrollo)
CMD ["bash"]
# Copiamos el archivo de la base de datos SQLite (si existe) al contenedor
# (Descomenta la siguiente línea si tienes un archivo .db que quieras incluir)
# COPY data/mi_base_de_datos.db ./data/

# Exponemos el puerto si tu aplicación lo requiere (ajusta según tu app)
# EXPOSE 8000

# Variables de entorno recomendadas para SQLite y Python
ENV PYTHONUNBUFFERED=1
ENV SQLITE_DATABASE_URL=sqlite:///data/mi_base_de_datos.db
