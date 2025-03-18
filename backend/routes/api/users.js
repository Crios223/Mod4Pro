// // backend/routes/api/users.js
// const express = require('express');
// const bcrypt = require('bcryptjs');

// const { setTokenCookie, requireAuth } = require('../../utils/auth');
// const { User } = require('../../db/models');

// const router = express.Router();



// // backend/routes/api/users.js
// // ...

// // Sign up
// router.post(
//     '/',
//     async (req, res) => {
//       const { email, password, username } = req.body;
//       const hashedPassword = bcrypt.hashSync(password);
//       const user = await User.create({ email, username, hashedPassword });
  
//       const safeUser = {
//         id: user.id,
//         email: user.email,
//         username: user.username,
//       };
  
//       await setTokenCookie(res, safeUser);
  
//       return res.json({
//         user: safeUser
//       });
//     }
// );






// module.exports = router;



// backend/routes/api/users.js
// const express = require('express');
// const bcrypt = require('bcryptjs');

// const { setTokenCookie, requireAuth } = require('../../utils/auth');
// const { User } = require('../../db/models');

// const router = express.Router();

// // Sign up
// router.post(
//   '/',
//   async (req, res) => {
//     // <---- Added firstName and lastName from the request body
//     const { email, password, username, firstName, lastName } = req.body;
//     const hashedPassword = bcrypt.hashSync(password);
//     // <---- Include firstName and lastName in User.create
//     const user = await User.create({ email, username, firstName, lastName, hashedPassword });

//     const safeUser = {
//       id: user.id,
//       email: user.email,
//       username: user.username,
//       firstName: user.firstName,  
//       lastName: user.lastName,    
//     };

//     await setTokenCookie(res, safeUser);

//     return res.json({
//       user: safeUser
//     });
//   }
// );

// module.exports = router;



// backend/routes/api/users.js
// backend/routes/api/users.js
const express = require('express');
const bcrypt = require('bcryptjs');
const { check } = require('express-validator');

const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { User } = require('../../db/models');
const { handleValidationErrors } = require('../../utils/validation');

const router = express.Router();

// Validation middleware for sign up
const validateSignup = [
  check('email')
    .exists({ checkFalsy: true })
    .withMessage('Email is required'),
  check('username')
    .exists({ checkFalsy: true })
    .withMessage('Username is required'),
  check('firstName')
    .exists({ checkFalsy: true })
    .withMessage('First Name is required'),
  check('lastName')
    .exists({ checkFalsy: true })
    .withMessage('Last Name is required'),
  check('password')
    .exists({ checkFalsy: true })
    .withMessage('Password is required'),
  handleValidationErrors,
];

// Sign up route
router.post(
  '/',
  validateSignup,
  async (req, res, next) => {
    try {
      const { email, password, username, firstName, lastName } = req.body;
      
      // Check for duplicate email
      const existingEmailUser = await User.findOne({ where: { email } });
      if (existingEmailUser) {
        const err = new Error('User already exists with the specified email');
        err.status = 500;
        err.title = 'User already exists with the specified email';
        err.errors = { email: 'User already exists with the specified email' };
        return next(err);
      }
      
      // Check for duplicate username
      const existingUsernameUser = await User.findOne({ where: { username } });
      if (existingUsernameUser) {
        const err = new Error('User already exists with the specified username');
        err.status = 500;
        err.title = 'User already exists with the specified username';
        err.errors = { username: 'User already exists with the specified username' };
        return next(err);
      }
      
      const hashedPassword = bcrypt.hashSync(password);
      const user = await User.create({ email, username, firstName, lastName, hashedPassword });
      
      const safeUser = {
        id: user.id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        username: user.username,
      };

      await setTokenCookie(res, safeUser);
      
      return res.status(201).json({ user: safeUser });
    } catch (err) {
      next(err);
    }
  }
);

module.exports = router;