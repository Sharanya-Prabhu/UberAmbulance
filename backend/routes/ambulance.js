const express = require('express')
const {
  getAmbulances, 
  getAmbulance, 
  getAmbulancesAround,
  getNearestAmbulance,
  createAmbulance, 
  deleteAmbulance, 
  updateAmbulance,
} = require('../controllers/AmbulanceController')

const router = express.Router()

// GET all Ambulances
router.get('/', getAmbulances)

// GET a single Ambulance
router.get('/getone/:id', getAmbulance)

// POST all ambulances around a location
router.post('/around', getAmbulancesAround)

// POST the nearest ambulance around a location
router.post('/nearest', getNearestAmbulance)

// POST a new Ambulance
router.post('/', createAmbulance)

// DELETE a Ambulance
router.delete('/:id', deleteAmbulance)

// UPDATE a Ambulance
router.patch('/:id', updateAmbulance)

module.exports = router