// Create and send and save in cookie.

const  SpSendToken = (user, statusCode, res)=>{
    
    // create jwt token
    const sp_token = user.getJwtToken();

    // option for the cookie
    const options = {
        expires : new Date( Date.now() + process.env.COOKIE_EXPIRES_TIME * 24 * 60 * 1000),
        httpOnly : true //cannot be access through javaScript code
    }
    res.status(statusCode).cookie('sp_token', sp_token, options).json({
        success : true,
        sp_token,
        user
    })
}

module.exports = SpSendToken;