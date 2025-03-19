"use strict";

const express = require('express');
const { Op } = require('sequelize');
const { requireAuth } = require('../../utils/auth');
const { Spot, SpotImage, User /*, Review */ } = require('../../db/models'); // adjust as needed

const router = express.Router();

/**
 * GET /api/spots
 * Returns all spots.
 * Authentication: false
 */
router.get('/', async (req, res, next) => {
  try {
    const spots = await Spot.findAll();
    // Map each spot to include dummy avgRating and previewImage if not stored
    const Spots = spots.map(spot => ({
      id: spot.id,
      ownerId: spot.ownerId,
      address: spot.address,
      city: spot.city,
      state: spot.state,
      country: spot.country,
      lat: spot.lat,
      lng: spot.lng,
      name: spot.name,
      description: spot.description,
      price: spot.price,
      createdAt: spot.createdAt,
      updatedAt: spot.updatedAt,
      avgRating: spot.avgRating || 0, // You might calculate this from Reviews
      previewImage: spot.previewImage || "image url" // Replace with actual logic if available
    }));
    res.status(200).json({ Spots });
  } catch (err) {
    next(err);
  }
});

/**
 * GET /api/spots/current
 * Returns all spots owned by the current user.
 * Authentication: true
 */
router.get('/current', requireAuth, async (req, res, next) => {
  try {
    const spots = await Spot.findAll({
      where: { ownerId: req.user.id }
    });
    const Spots = spots.map(spot => ({
      id: spot.id,
      ownerId: spot.ownerId,
      address: spot.address,
      city: spot.city,
      state: spot.state,
      country: spot.country,
      lat: spot.lat,
      lng: spot.lng,
      name: spot.name,
      description: spot.description,
      price: spot.price,
      createdAt: spot.createdAt,
      updatedAt: spot.updatedAt,
      avgRating: spot.avgRating || 0,
      previewImage: spot.previewImage || "image url"
    }));
    res.status(200).json({ Spots });
  } catch (err) {
    next(err);
  }
});

/**
 * GET /api/spots/:spotId
 * Returns the details of a spot specified by its id.
 * Authentication: false
 */
router.get('/:spotId', async (req, res, next) => {
  try {
    const spotId = req.params.spotId;
    const spot = await Spot.findByPk(spotId, {
      include: [
        { model: SpotImage, attributes: ['id', 'url', 'preview'] },
        { model: User, as: 'Owner', attributes: ['id', 'firstName', 'lastName'] }
        // Optionally include Reviews here if needed
      ]
    });
    if (!spot) {
      const err = new Error("Spot couldn't be found");
      err.status = 404;
      return next(err);
    }
    const spotJSON = spot.toJSON();
    // Set dummy values for numReviews and avgStarRating if not computed
    spotJSON.numReviews = spotJSON.numReviews || 0;
    spotJSON.avgStarRating = spotJSON.avgStarRating || 0;
    res.status(200).json(spotJSON);
  } catch (err) {
    next(err);
  }
});

/**
 * POST /api/spots
 * Creates a new spot.
 * Authentication: true
 * Expects a JSON body with: address, city, state, country, lat, lng, name, description, price.
 */
router.post('/', requireAuth, async (req, res, next) => {
  try {
    const { address, city, state, country, lat, lng, name, description, price } = req.body;
    
    // (Optional) Add validation for these fields here and return a 400 error with an errors object
    const newSpot = await Spot.create({
      ownerId: req.user.id,
      address,
      city,
      state,
      country,
      lat,
      lng,
      name,
      description,
      price
    });
    res.status(201).json(newSpot);
  } catch (err) {
    next(err);
  }
});

module.exports = router;