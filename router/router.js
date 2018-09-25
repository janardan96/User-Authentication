var router = require('express').Router();
const passport = require('passport');
// const flash=require('connect-flash');
// const Validator = require('../validation/validation');

router.get('/', (req, res) => {
    res.render('login', {
        message: req.flash('LoginError')
    });
});


router.get('/welcome',IsLoggedIn,(req, res) => {
    res.render('welcome');
});

router.get('/register', (req, res) => {
    const errors = req.flash('error');
    res.render('register', {
        title: "Casperr",
        messages: errors,
        hasError: errors.length > 0
    });
    // res.render('register',{ message: req.flash('emailError') });

});


// login
router.post('/login',
    passport.authenticate('local.login', {
        successRedirect: '/welcome',
        failureRedirect: '/',
        failureFlash: true
    })
);

// Signup
router.post('/register', function (req, res, next) {
    req.check('email', "Invalid Email").notEmpty().isEmail();
    // req.check('firstName', "Name is required").notEmpty();
    req.check('password', "Password is not matched").notEmpty().equals(req.body.confirmPassword);

    req.getValidationResult().then((result) => {
        const errors = result.array();
        const messages = [];
        errors.forEach((error) => {
            messages.push(error.msg);
        });
        req.flash('error', messages);
        res.redirect('/register');
    }).catch((err) => {
        return next();
    })
}, passport.authenticate('local.signup', {
    successRedirect: '/welcome',
    failureRedirect: '/register',
    failureFlash: true,
}))


//logout
router.get("/logout",(req,res)=>{
    req.logout();
    req.session.destroy();
    res.locals.isAuthenticated = false;
    res.redirect("/");
    })
    

function IsLoggedIn(req,res,next){
if(req.isAuthenticated()){
    return next();
}
res.redirect("/");
}

module.exports = router;