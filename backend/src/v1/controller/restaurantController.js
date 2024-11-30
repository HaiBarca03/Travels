const Restaurants = require('../models/restaurantModel');
const cloudinary = require('cloudinary')
const fs = require('fs');

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

const createRestaurants = async (req, res) => {
    try {
        const { name, address, location, type, price, rating, reviews } = req.body;

        let imagesLinks = [];

        if (req.files && req.files.length > 0) {
            for (const file of req.files) {
                const result = await cloudinary.uploader.upload(file.path, {
                    folder: 'restaurants',
                });

                imagesLinks.push({
                    public_id: result.public_id,
                    url: result.secure_url,
                });

                fs.unlinkSync(file.path);
            }
        }

        const newRestaurant = new Restaurants({
            name,
            address,
            location,
            type,
            price,
            images: imagesLinks,
            rating: rating || 1,
            reviews
        });

        const savedRestaurant = await newRestaurant.save();
        res.status(201).json({
            success: true,
            data: savedRestaurant,
            message: 'Created successfully',
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Server error' });
    }
}

const updateRestaurant = async (req, res) => {
    try {
        const { name, address, location, type, price, rating, reviews, deleteImages } = req.body;
        const restaurantId = req.params.restaurantId;

        const restaurant = await Restaurants.findById(restaurantId);
        if (!restaurant) {
            return res.status(404).json({ success: false, message: 'restaurant not found' });
        }

        if (deleteImages && deleteImages.length > 0) {
            for (const public_id of deleteImages) {
                await cloudinary.uploader.destroy(public_id);
                restaurant.images = restaurant.images.filter(img => img.public_id !== public_id);
            }
        }

        if (req.files && req.files.length > 0) {
            for (const file of req.files) {
                const result = await cloudinary.uploader.upload(file.path, {
                    folder: 'restaurant',
                });

                restaurant.images.push({
                    public_id: result.public_id,
                    url: result.secure_url,
                });

                fs.unlinkSync(file.path);
            }
        }

        restaurant.name = name || restaurant.name;
        restaurant.address = address || restaurant.address;
        restaurant.location = location || restaurant.location;
        restaurant.type = type || restaurant.type;
        restaurant.price = price || restaurant.price;
        restaurant.rating = rating || restaurant.rating;
        restaurant.reviews = reviews || restaurant.reviews;

        const updatedRestaurant = await restaurant.save();

        res.status(200).json({
            success: true,
            data: updatedRestaurant,
            message: 'restaurant updated successfully',
        });
    } catch (error) {
        console.error('Error updating restaurant:', error);
        res.status(500).json({ success: false, message: 'Server error' });
    }
};

const getRestaurantByLocation = async (req, res) => {
    try {
        const { locationId } = req.params;

        const restaurant = await Restaurants.find({ location: locationId }).populate('location');

        if (!restaurant || restaurant.length === 0) {
            return res.status(404).json({ success: false, message: 'No restaurant found for this location' });
        }

        res.status(200).json({
            success: true,
            data: restaurant
        });
    } catch (error) {
        console.error('Error fetching restaurant by location:', error);
        res.status(500).json({ success: false, message: 'Server error' });
    }
};

const getAllRestaurant = async (req, res) => {
    try {
        const restaurant = await Restaurants.find().populate('location');

        if (!restaurant || restaurant.length === 0) {
            return res.status(404).json({ success: false, message: 'No restaurant found' });
        }

        res.status(200).json({
            success: true,
            data: restaurant
        });
    } catch (error) {
        console.error('Error fetching restaurant:', error);
        res.status(500).json({ success: false, message: 'Server error' });
    }
};

const deleteRestaurant = async (req, res) => {
    try {
        const { id } = req.params;

        const restaurant = await Restaurants.findById(id);
        if (!restaurant) {
            return res.status(404).json({ success: false, message: 'restaurant not found' });
        }

        if (restaurant.images && restaurant.images.length > 0) {
            for (const image of restaurant.images) {
                await cloudinary.uploader.destroy(image.public_id);
            }
        }

        await restaurant.remove();

        res.status(200).json({
            success: true,
            message: 'restaurant deleted successfully'
        });
    } catch (error) {
        console.error('Error deleting restaurant:', error);
        res.status(500).json({ success: false, message: 'Server error' });
    }
};

module.exports = {
    createRestaurants,
    updateRestaurant,
    getRestaurantByLocation,
    getAllRestaurant,
    deleteRestaurant
}