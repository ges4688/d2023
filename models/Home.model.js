var mongoose = require('mongoose');
var mongoosePaginate = require('mongoose-paginate');

var HomeSchema = new mongoose.Schema({
    userId: { type: String },
    homeId: { type: String , required: true, unique : true },
    moneda: { type: String, enum: ['USD', 'Pesos'] },
    precio: { type: Number },
    direccion: {
      calle: { type: String },
      numero: { type: String },
      piso: { type: String },
      dto: { type: String },
      barrio: { type: String },
      localidad: { type: String },
      provincia: { type: String },
      pais: { type: String },
    },
    geolocalizacion: {
      latitud: { type: Number },
      longitud: { type: Number },
    },
    tipoPropiedad: { type: String, enum: ['Departamento', 'Casa', 'PH', 'Terreno', 'Local', 'Oficina', 'Galpon'] },
    operacion: { type: String, enum: ['Compra', 'Venta', 'Alquiler'] },
    antiguedad: { type: String, enum: ['A estrenar', '10 años', '20 años', '30 años', '40 años o más'] },
    cochera: { type: String, enum: ['Si', 'No'] },
    ambientes: { type: String, enum: ['Monoambiente', '2 Ambientes', '3 Ambientes', '4 Ambientes', '5 o mas Ambientes'] },
    dormitorios: { type: String, enum: ['1 Dormitorio', '2 Dormitorio', '3 Dormitorio', '4 Dormitorio', '5 o mas Dormitorio'] },
    banos: { type: String, enum: ['1', '2', '3', '4', '5', '6 o mas'] },
    amenities: { type: String, enum: ['Piletas', 'Jacuzzi', 'Sauna', 'Sum', 'Quincho', 'Sala de juegos', 'Parrilla', 'Cancha tenis', 'Gym', 'Laundry'] },
    metrosCuadrados: {
      cubiertos: { type: Number },
      semidescubiertos: { type: Number },
      descubiertos: { type: Number },
    } 
});

HomeSchema.plugin(mongoosePaginate);
const Home = mongoose.model('Home', HomeSchema);

module.exports = Home;