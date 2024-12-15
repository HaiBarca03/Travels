const touristAttractionModel = require("../models/touristAttractionModel");
const Tour = require("../models/tourModel");

const createTour = async (req, res) => {
    try {
        const {
            name,
            code,
            tour_places,
            description,
            start_date,
            place_departure,
            time,
            max_participants,
            guide_id,
            reviews
        } = req.body;

        const attractions = await touristAttractionModel.find({ _id: { $in: tour_places } });

        const totalPrice = attractions.reduce((sum, attraction) => sum + parseFloat(attraction.price), 0);

        const aggregatedActivities = [...new Set(attractions.flatMap(attraction => attraction.activities))];

        const newTour = new Tour({
            name,
            code,
            tour_places,
            description,
            activities: aggregatedActivities,
            price: totalPrice,
            start_date,
            place_departure,
            time,
            max_participants,
            guide_id,
            reviews
        });

        const savedTour = await newTour.save();
        res.status(201).json({ message: 'Tour created successfully!', tour: savedTour });
    } catch (error) {
        res.status(500).json({ message: 'Error creating tour', error: error.message });
    }
};

const getDetailTour = async (req, res) => {
    try {
        const { id } = req.params;

        const tour = await Tour.findById(id).populate('tour_places');

        if (!tour) {
            return res.status(404).json({ message: 'Tour not found' });
        }

        res.status(200).json({ message: 'Tour details retrieved successfully', tour });
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving tour details', error: error.message });
    }
};

const getAllTours = async (req, res) => {
    try {
        const tours = await Tour.find().populate({
            path: 'tour_places',
            select: 'name'
        });

        res.status(200).json({ message: 'All tours retrieved successfully', tours });
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving tours', error: error.message });
    }
};

const updateTour = async (req, res) => {
    try {
        const { id } = req.params;

        const {
            name,
            code,
            tour_places,
            description,
            start_date,
            place_departure,
            time,
            max_participants,
            guide_id,
            reviews
        } = req.body;

        let totalPrice = 0;
        let aggregatedActivities = [];

        if (tour_places && tour_places.length > 0) {
            const attractions = await touristAttractionModel.find({ _id: { $in: tour_places } });
            totalPrice = attractions.reduce((sum, attraction) => sum + parseFloat(attraction.price), 0);
            aggregatedActivities = [...new Set(attractions.flatMap(attraction => attraction.activities))];
        }

        const updatedTour = await Tour.findByIdAndUpdate(
            id,
            {
                name,
                code,
                tour_places,
                description,
                activities: aggregatedActivities.length ? aggregatedActivities : undefined,
                price: totalPrice || undefined,
                start_date,
                place_departure,
                time,
                max_participants,
                guide_id,
                reviews
            },
            { new: true, runValidators: true }
        );

        if (!updatedTour) {
            return res.status(404).json({ message: 'Tour not found' });
        }

        res.status(200).json({ message: 'Tour updated successfully!', tour: updatedTour });
    } catch (error) {
        res.status(500).json({ message: 'Error updating tour', error: error.message });
    }
};

const deleteTour = async (req, res) => {
    try {
        const { id } = req.params;

        const deletedTour = await Tour.findByIdAndDelete(id);

        if (!deletedTour) {
            return res.status(404).json({ message: 'Tour not found' });
        }

        res.status(200).json({ message: 'Tour deleted successfully!', tour: deletedTour });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting tour', error: error.message });
    }
};

module.exports = { createTour, getDetailTour, getAllTours, updateTour, deleteTour };