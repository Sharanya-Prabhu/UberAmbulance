const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const ambulanceSchema = new Schema({
  ambulanceId: {
    type: String,
    required: true,
    unique: true,
    primaryKey: true
  },
  location: {
    type: {
      type: String,
      enum: ['Point'],
      required: true
    },
    coordinates: {
      type: [Number],
      required: true
    }
  },
  state: {
    type: String,
    required: true,
    enum: ['idle', 'in service']
  }
}, { timestamps: true, collection: 'ambulances' });

ambulanceSchema.index({ location: '2dsphere' });

module.exports = mongoose.model('Ambulance', ambulanceSchema);