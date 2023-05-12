const User = require("../model/User");

exports.createUser = async (req, res) => {
    const { firstName, lastName, email, phone, city, password } = req.body;

    const first_name = firstName;
    const last_name = lastName;

    try {
        const data = await User.create({ first_name, last_name, email, phone, city, password });
        return res.json({
            success: true,
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
        if (!user) throw new Error('Invalid credentials');

        //Checking if password matches
        const isSame = await user.matchPassword(password);
        if (!isSame) throw new Error('Invalid credentials');
        user = await User.findOne({ email });
        sendTokenResponse(user, res);
    } catch (error) {
        const options = {
            httpOnly: true,
            secure: false,
        }
        if (process.env.ENV !== 'dev') {
            options.secure = true;
            options.sameSite = 'none'
        }

        return res
            .clearCookie('token', options)
            .json({
                success: false,
                error: error.message
            })
    }
}

exports.signoutUser = (req, res) => {
    const options = {
        httpOnly: true,
        secure: false,
    }
    if (process.env.ENV !== 'dev') {
        options.secure = true;
        options.sameSite = 'none'
    }
    res
        .clearCookie('token', options)
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
    }
    if (process.env.ENV !== 'dev') {
        options.secure = true;
        options.sameSite = 'none'
    }
    res.cookie('token', token, options)
    return res.json({
        success: true,
        user
    })
}