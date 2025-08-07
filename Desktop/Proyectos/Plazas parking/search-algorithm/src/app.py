from flask import Flask, render_template, request, jsonify, redirect, url_for
from flask_sqlalchemy import SQLAlchemy
from datetime import datetime
import os

# Configuración de la aplicación
app = Flask(__name__)
app.config['SECRET_KEY'] = os.environ.get('SECRET_KEY', 'dev-secret-key')
app.config['SQLALCHEMY_DATABASE_URI'] = os.environ.get('SQLITE_DATABASE_URL', 'sqlite:///data/mi_base_de_datos.db')
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

# Inicializar base de datos
db = SQLAlchemy(app)

# Modelos de la base de datos
class Plaza(db.Model):
    __tablename__ = 'plazas'
    id = db.Column(db.Integer, primary_key=True)
    portal = db.Column(db.String)
    url = db.Column(db.String)
    ciudad = db.Column(db.String)
    direccion_completa = db.Column(db.String)
    coordenadas = db.Column(db.String)
    tipo_operacion = db.Column(db.String)
    precio = db.Column(db.Float)
    moneda = db.Column(db.String)
    gastos_comunidad = db.Column(db.Float)
    fecha_publicacion = db.Column(db.String)
    fecha_extraccion = db.Column(db.String)
    tipo_coche = db.Column(db.String)
    planta = db.Column(db.String)
    puerta_automatica = db.Column(db.Integer)
    ascensor = db.Column(db.Integer)
    camara_seguridad = db.Column(db.Integer)
    alarma = db.Column(db.Integer)
    carga_electrica = db.Column(db.Integer)
    estado_conservacion = db.Column(db.String)
    numero_plaza = db.Column(db.String)
    descripcion = db.Column(db.String)
    # Relaciones
    dimensiones = db.relationship('Dimensiones', backref='plaza', uselist=False, cascade="all, delete-orphan")
    vendedor = db.relationship('Vendedor', backref='plaza', uselist=False, cascade="all, delete-orphan")
    financiacion = db.relationship('Financiacion', backref='plaza', uselist=False, cascade="all, delete-orphan")
    fotos = db.relationship('Fotos', backref='plaza', cascade="all, delete-orphan")

class Dimensiones(db.Model):
    __tablename__ = 'dimensiones'
    plaza_id = db.Column(db.Integer, db.ForeignKey('plazas.id'), primary_key=True)
    longitud = db.Column(db.Float)
    anchura = db.Column(db.Float)
    altura = db.Column(db.Float)
    superficie = db.Column(db.Float)

class Vendedor(db.Model):
    __tablename__ = 'vendedor'
    plaza_id = db.Column(db.Integer, db.ForeignKey('plazas.id'), primary_key=True)
    nombre_contacto = db.Column(db.String)
    telefono = db.Column(db.String)
    email = db.Column(db.String)
    tipo_vendedor = db.Column(db.String)

class Financiacion(db.Model):
    __tablename__ = 'financiacion'
    plaza_id = db.Column(db.Integer, db.ForeignKey('plazas.id'), primary_key=True)
    opciones = db.Column(db.String)

class Fotos(db.Model):
    __tablename__ = 'fotos'
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    plaza_id = db.Column(db.Integer, db.ForeignKey('plazas.id'))
    url_foto = db.Column(db.String)

class Reserva(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    plaza_id = db.Column(db.Integer, db.ForeignKey('plaza.id'), nullable=False)
    matricula = db.Column(db.String(20), nullable=False)
    fecha_inicio = db.Column(db.DateTime, nullable=False)
    fecha_fin = db.Column(db.DateTime, nullable=False)
    estado = db.Column(db.String(20), default='activa')  # activa, completada, cancelada
    created_at = db.Column(db.DateTime, default=datetime.utcnow)

# Rutas de la aplicación
@app.route('/')
def index():
    """Página principal"""
    plazas = Plaza.query.all()
    return render_template('index.html', plazas=plazas)

@app.route('/api/plazas')
def get_plazas():
    """API para obtener todas las plazas"""
    plazas = Plaza.query.all()
    return jsonify([{
        'id': p.id,
        'numero': p.numero,
        'estado': p.estado,
        'tipo': p.tipo
    } for p in plazas])

@app.route('/api/plazas/<int:plaza_id>', methods=['PUT'])
def actualizar_plaza(plaza_id):
    """API para actualizar el estado de una plaza"""
    plaza = Plaza.query.get_or_404(plaza_id)
    data = request.get_json()
    
    if 'estado' in data:
        plaza.estado = data['estado']
    
    db.session.commit()
    return jsonify({'message': 'Plaza actualizada correctamente'})

@app.route('/api/reservas', methods=['POST'])
def crear_reserva():
    """API para crear una nueva reserva"""
    data = request.get_json()
    
    nueva_reserva = Reserva(
        plaza_id=data['plaza_id'],
        matricula=data['matricula'],
        fecha_inicio=datetime.fromisoformat(data['fecha_inicio']),
        fecha_fin=datetime.fromisoformat(data['fecha_fin'])
    )
    
    # Actualizar estado de la plaza
    plaza = Plaza.query.get(data['plaza_id'])
    plaza.estado = 'reservada'
    
    db.session.add(nueva_reserva)
    db.session.commit()
    
    return jsonify({'message': 'Reserva creada correctamente'})

# Crear las tablas de la base de datos
@app.before_first_request
def create_tables():
    """Crear las tablas de la base de datos si no existen"""
    db.create_all()
    
    # Crear algunas plazas de ejemplo si no existen
    if Plaza.query.count() == 0:
        plazas_ejemplo = [
            Plaza(numero='A1', estado='libre', tipo='normal'),
            Plaza(numero='A2', estado='libre', tipo='normal'),
            Plaza(numero='A3', estado='libre', tipo='discapacitados'),
            Plaza(numero='B1', estado='libre', tipo='electrico'),
            Plaza(numero='B2', estado='libre', tipo='normal'),
        ]
        for plaza in plazas_ejemplo:
            db.session.add(plaza)
        db.session.commit()

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=8000, debug=True) 