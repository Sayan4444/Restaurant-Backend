const Location = require('../model/Location');

exports.locationtData = async (req, res) => {
    try {
        const data =
            await Location
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