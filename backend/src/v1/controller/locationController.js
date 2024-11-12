const LocationModel = require('../models/locationModel');
const createLocation = async (req, res) => {
    const { country, provinceCity } = req.body;

    try {
        const newLocation = new LocationModel({
            country,
            provinceCity
        });

        const savedLocation = await newLocation.save();

        res.json({
            success: true,
            data: savedLocation,
            message: 'Location created successfully'
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: 'Error creating location'
        });
    }
};

const getAllLocations = async (req, res) => {
    try {
        const locations = await LocationModel.find();
        res.json({
            success: true,
            data: locations,
            message: 'Fetched all locations successfully'
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: 'Error fetching locations'
        });
    }
};

const updateLocation = async (req, res) => {
    const { locationId } = req.params;
    const { country, provinceCity } = req.body;

    try {
        const updatedLocation = await LocationModel.findByIdAndUpdate(
            locationId,
            { country, provinceCity },
            { new: true, runValidators: true }
        );

        if (!updatedLocation) {
            return res.status(404).json({
                success: false,
                message: 'Location not found'
            });
        }

        res.json({
            success: true,
            data: updatedLocation,
            message: 'Location updated successfully'
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: 'Error updating location'
        });
    }
};

const deleteLocation = async (req, res) => {
    const { locationId } = req.params;

    try {
        const deletedLocation = await LocationModel.findByIdAndDelete(locationId);

        if (!deletedLocation) {
            return res.status(404).json({
                success: false,
                message: 'Location not found'
            });
        }

        res.json({
            success: true,
            data: deletedLocation,
            message: 'Location deleted successfully'
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: 'Error deleting location'
        });
    }
};

const getLocationsByCountry = async (req, res) => {
    const { country } = req.body;

    try {
        const locations = await LocationModel.find({ country });

        if (locations.length === 0) {
            return res.status(404).json({
                success: false,
                message: 'No locations found for the specified country'
            });
        }

        res.json({
            success: true,
            data: locations
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: 'Error retrieving locations'
        });
    }
};

module.exports = {
    createLocation,
    getAllLocations,
    updateLocation,
    deleteLocation,
    getLocationsByCountry
};
