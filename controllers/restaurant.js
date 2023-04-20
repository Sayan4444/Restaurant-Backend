const Restaurant = require("../model/Restaurant");

exports.restaurantData = async (req, res) => {
    try {
        const data =
            await Restaurant
                .find()
                .select(req.query.select)
                .populate('location_id')
                .populate('cuisine_id')

        res.status(200).json({
            success: true,
            data
        })
    } catch (error) {
        res.status(400).json({
            success: false,
            error: error.message
        })
    }
}

exports.restaurantDataBySlug = async (req, res) => {
    let query;
    query = Restaurant.findOne({
        slug: req.params.slug
    })
        .select('_id')

    if (req.query.select) query = query.select(req.query.select);
    if (req.query.item) query = query.populate('item_id');
    const data = await query;
    return res.status(200).json({
        success: true,
        data
    })
}

exports.restaurantDataByLocation = async (req, res) => {
    let data = await Restaurant
        .find()
        .select(req.query.select)
        .populate('location_id')
        .populate('cuisine_id')

    if (req.query.city)
        data = data.filter(item => item.location_id.name === req.query.city);

    return res.status(200).json({
        success: true,
        data
    })
}