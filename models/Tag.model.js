var mongoose = require('mongoose');
var mongoosePaginate = require('mongoose-paginate');

var tagSchema = new mongoose.Schema({
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
});

tagSchema.plugin(mongoosePaginate);
const Tagg = mongoose.model('Tag', tagSchema);

module.exports = Tagg;