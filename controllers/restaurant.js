const Restaurant = require("../model/Restaurant");

exports.getRestaurantData = async (req, res) => {
    try {
        let query = Restaurant.find({ ...req.query.filter });
        if (req.query.select) query = query.select(req.query.select);
        if (req.query.location_id) query = query.populate('location_id');
        if (req.query.cuisine_id) query = query.populate('cuisine_id');
        if (req.query.item_id) query = query.populate('item_id');
        if (req.query.review_id) query = query.populate('review_id');

        let data = await query;

        if (req.query.location)
            data = data.filter(obj => obj.location_id.name === req.query.location)
        if (req.query.cuisine)
            data = data.filter(obj => obj.cuisine_id.name === req.query.cuisine)

        return res.json({
            success: true,
            data
        })
    } catch (error) {
        return res.json({
            success: false,
            error: error.message
        })
    }
}