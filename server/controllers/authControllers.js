const User = require('./../models/User');
const sendToken = require('./../utils/sendToken');
const ErrorHandler = require('./../utils/ErrorHandler');
const catchAsyncError = require('./../middlewares/catchAsyncError');

const authControllers = {
    register: catchAsyncError(async function(req, res, next) {
        const {name, email, password, confirmPassword} = req.body;
        if (!name || !email || !password || !confirmPassword) { // ! -> negative value (membalikkan true jadi false atau false jadi true)
            return next(new ErrorHandler('Please provide every field', 400));
        }

        if (password !== confirmPassword) { // .json untuk membuat semua data menjadi json menjadi string
            return next(new ErrorHandler('Password confirmation sohuld be match', 400));
        }

        const newUser = new User({
            name,
            email,
            password
        })

        await newUser.save();

        sendToken(newUser, 200, res); // sendToken => fungsi buat mengirim (menyimpan) jsonwebtoken di cookie browser
    }),
    login: catchAsyncError(async function(req, res, next) {
        // async menjalankan beberapa proses sekaligus.
        const {email, password} = req.body;
        if (!email || !password) {
            // kirim data dengan status code 500, dan data yang dikirm akan diconvert menjadi tipe JSON
            return next(new ErrorHandler('Please provide every field!', 400));
        }
        const user = await User.findOne({email: email}); // findOne untuk mencari data serta mereturn data yang bersangkutan.
        if (!user) {
            return next(new ErrorHandler('User not exists', 404));
        } // User => panggil schema    user => panggil variable
        const isMatch = await user.comparePassword(password);
        if (!isMatch) {
            return next(new ErrorHandler('Password is incorrect', 400));
        }
        sendToken(user, 200, res); // untuk mengirim data ke cookies storage dan datanya adalah json web token 
    }),
    logout: catchAsyncError(async function(req, res, next) {
        res.status(200).cookie('bigProject_token', null, {
            expires: new Date(Date.now()),
            httpOnly: true
        }).json({
            success: true,
            message: 'Logout success!'
        })
    }),
    getLoginData: catchAsyncError(async function(req, res, next) {
        const user = await User.findById(req.user.id);
        if (!user) {
            return next(new ErrorHandler('User not exists', 400));
        }
        res.status(200).json({
            success: true,
            user
        })
    })
};

module.exports = authControllers;