const sendToken = (user, statusCode, res) => {
    const token = user.generateJwToken();

    const options = {
        expires: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
        httpOnly: true
    }

    res.status(statusCode).cookie('bigProject_token', token, options).json({
        success: true,
        token,
        user
    })
}

module.exports = sendToken;