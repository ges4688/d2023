var mongoose = require('mongoose');
var mongoosePaginate = require('mongoose-paginate');

var HomeSchema = new mongoose.Schema({
    id: { type: Number },
    homeId: { type: String },
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
    //tipoPropiedad: { type: String },
    metrosCuadrados: {
      cubiertos: { type: Number },
      semidescubiertos: { type: Number },
      descubiertos: { type: Number },
    },
    //tags: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Tag' }]
    tag: {
        operacion: { type: String, enum: ['Compra', 'Venta', 'Alquiler'] },
        tipoPropiedad: { type: String, enum: ['Departamento', 'Casa', 'PH', 'Terreno', 'Local', 'Oficina', 'Galpon'] },
        moneda: { type: String, enum: ['USD', 'Pesos'] },
        ambientes: { type: String, enum: ['Monoambiente', '2 Ambientes', '3 Ambientes', '4 Ambientes', '5 o mas Ambientes'] },
        dormitorios: { type: String, enum: ['1 Dormitorio', '2 Dormitorio', '3 Dormitorio', '4 Dormitorio', '5 o mas Dormitorio'] },
        baños: { type: String, enum: ['1', '2', '3', '4', '5', '6 o mas'] },
        amenities: { type: String, enum: ['Piletas', 'Jacuzzi', 'Sauna', 'Sum', 'Quincho', 'Sala de juegos', 'Parrilla', 'Cancha tenis', 'Gym', 'Laundry'] },
        precio: {
          minimumPrice: { type: Number },
          maximumPrice: { type: Number },
        },
        antiguedad: { type: String, enum: ['A estrenar', '10 años', '20 años', '30 años', '40 años o más'] },
        cochera: { type: String, enum: ['Si', 'No'] },
    }
});

HomeSchema.plugin(mongoosePaginate);
const Home = mongoose.model('Home', HomeSchema);

module.exports = Home;