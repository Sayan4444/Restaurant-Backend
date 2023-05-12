const User = require("../model/User");

exports.createUser = async (req, res) => {
    const { firstName, lastName, email, phone, city, password } = req.body;

    const first_name = firstName;
    const last_name = lastName;

    try {
        const data = await User.create({ first_name, last_name, email, phone, city, password });
        return res.json({
            success: true,
            data
        })
    } catch (error) {

        if (error.code === 11000)
            return res.json({
                success: false,
                error: "Email already exsists"
            })


        return res.json({
            success: false,
            error: error.message
        })
    }
}

exports.signinUser = async (req, res) => {
    const { email, password } = req.body;
    try {
        //Validate email and password
        if (!email || !password)
            throw new Error('Please provide an email and password');


        //Check for user
        let user = await User.findOne({ email }).select('password');
        if (!user) throw new Error('Invalid credentials1');

        //Checking if password matches
        const isSame = await user.matchPassword(password);
        if (!isSame) throw new Error('Invalid credentials2');
        user = await User.findOne({ email });
        sendTokenResponse(user, res);
    } catch (error) {

        return res
            .clearCookie('token', { httpOnly: true, secure: false }) //TODO secure:true
            .json({
                success: false,
                error: error.message
            })
    }
}

exports.signoutUser = (req, res) => {
    res
        .clearCookie('token', { httpOnly: true, secure: false }) //TODO secure:true
        .status(200).json({
            success: true,
            data: {}
        })
}

exports.getMe = (req, res) => {
    res.json({
        success: true,
        user: req.user
    })
}

function sendTokenResponse(user, res) {
    const token = user.createJwtToken();
    const options = {
        expires: new Date(Date.now() + process.env.JWT_COOKIE_EXPIRE * 24 * 60 * 60 * 1000),
        httpOnly: true,
        secure: false,
        sameSite: 'None'
    }
    res.cookie('token', token, options)
    return res.json({
        success: true,
        user
    })
}