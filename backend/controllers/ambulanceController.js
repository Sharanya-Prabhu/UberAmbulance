const ambulanceModel = require("../models/ambulanceModel");
const mongoose = require("mongoose");

// GET all Ambulances
exports.getAmbulances = async (req, res) => {
  try {
    const ambulances = await ambulanceModel.find();
    res.status(200).json({
      status: "success",
      results: ambulances.length,
      data: {
        ambulances,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: "fail",
      message: err,
    });
  }
};

// GET a single Ambulance
exports.getAmbulance = async (req, res) => {
  try {
    const ambulance = await ambulanceModel.findById(req.params.id);
    res.status(200).json({
      status: "success",
      data: {
        ambulance,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: "fail",
      message: err,
    });
  }
};

// GET all idle ambulances around a location
exports.getAmbulancesAround = async (req, res) => {
  const { location, distance } = req.body;

  try {
    const ambulances = await ambulanceModel.find({
      location: {
        $near: {
          $geometry: location,
          $maxDistance: distance,
        },
      },
      state: "idle",
    });

    if (!ambulances) {
      return res.status(404).json({
        success: false,
        message: "No ambulances found within the specified distance.",
      });
    }

    res.status(200).json({
      success: true,
      count: ambulances.length,
      data: ambulances,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      success: false,
      message: "Server error. Failed to retrieve ambulances.",
    });
  }
};

// GET the nearest idle ambulance
exports.getNearestAmbulance = async (req, res) => {
  console.log(req.body);
  const { location, distance } = req.body;

  try {
    const ambulance = await ambulanceModel.findOne({
      location: {
        $near: {
          $geometry: location,
          $maxDistance: distance,
        },
      },
      state: "idle",
    });

    if (!ambulance) {
      return res.status(404).json({
        success: false,
        message: "No ambulances found within the specified distance.",
      });
    }

    res.status(200).json({
      success: true,
      data: ambulance,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      success: false,
      message: "Server error. Failed to retrieve ambulances.",
    });
  }
};

// POST a new Ambulance
exports.createAmbulance = async (req, res) => {
  try {
    const newAmbulance = await ambulanceModel.create(req.body);

    res.status(201).json({
      status: "success",
      data: {
        ambulance: newAmbulance,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err,
    });
  }
};

// DELETE a Ambulance
exports.deleteAmbulance = async (req, res) => {
  try {
    await ambulanceModel.findByIdAndDelete(req.params.id);
    res.status(204).json({
      status: "success",
      data: null,
    });
  } catch (err) {
    res.status(404).json({
      status: "fail",
      message: err,
    });
  }
};

// UPDATE a Ambulance
exports.updateAmbulance = async (req, res) => {
  try {
    const ambulance = await ambulanceModel.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );
    res.status(200).json({
      status: "success",
      data: {
        ambulance,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: "fail",
      message: err,
    });
  }
};
