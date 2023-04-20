const Cuisine = require('../model/Cuisine');

exports.cuisinetData = async (req, res) => {
    try {
        const data =
            await Cuisine
                .find()

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