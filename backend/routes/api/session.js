// // backend/routes/api/session.js
// const express = require('express');
// const { Op } = require('sequelize');
// const bcrypt = require('bcryptjs');

// const { setTokenCookie, restoreUser } = require('../../utils/auth');
// const { User } = require('../../db/models');



// // backend/routes/api/session.js
// // ...
// const { check } = require('express-validator');
// const { handleValidationErrors } = require('../../utils/validation');
// // ...



// const router = express.Router();


// // backend/routes/api/session.js
// // ...




// const validateLogin = [
//   check('credential')
//     .exists({ checkFalsy: true })
//     .notEmpty()
//     .withMessage('Please provide a valid email or username.'),
//   check('password')
//     .exists({ checkFalsy: true })
//     .withMessage('Please provide a password.'),
//   handleValidationErrors
// ];




// // backend/routes/api/session.js
// // ...

// // Log in
// router.post(
//   '/',
//   validateLogin,
//   async (req, res, next) => {
//     const { credential, password } = req.body;

//     const user = await User.unscoped().findOne({
//       where: {
//         [Op.or]: {
//           username: credential,
//           email: credential
//         }
//       }
//     });

//     if (!user || !bcrypt.compareSync(password, user.hashedPassword.toString())) {
//       const err = new Error('Login failed');
//       err.status = 401;
//       err.title = 'Login failed';
//       err.errors = { credential: 'The provided credentials were invalid.' };
//       return next(err);
//     }

//     const safeUser = {
//       id: user.id,
//       firstName: user.firstName,
//       lastName: user.lastName,
//       email: user.email,
//       username: user.username,
//     };

//     await setTokenCookie(res, safeUser);

//     return res.json({
//       user: safeUser
//     });
//   }
// );












// // backend/routes/api/session.js
// // ...

// // Log out
// router.delete(
//     '/',
//     (_req, res) => {
//       res.clearCookie('token');
//       return res.json({ message: 'success' });
//     }
// );
  
// // ...






// // backend/routes/api/session.js
// // ...

// // Restore session user
// router.get(
//   '/',
//   (req, res) => {
//     const { user } = req;
//     if (user) {
//       const safeUser = {
//         id: user.id,
//         email: user.email,
//         username: user.username,
//       };
//       return res.json({
//         user: safeUser
//       });
//     } else return res.json({ user: null });
//   }
// );

// // ...



// //*  ------- GET CURRENT USER


// router.get('/', (req, res) => {
  
//   const { user } = req; 

//   if (user) {
    
//     const safeUser = {
//       id: user.id,
//       firstName: user.firstName,
//       lastName: user.lastName,
//       email: user.email,
//       username: user.username,
//     };

//     return res.status(200).json({ user: safeUser });
//   } else {
   
//     return res.status(200).json({ user: null });
//   }

// });











// module.exports = router;

















// module.exports = router;




//*------------THIS ONE WORKED


// // backend/routes/api/session.js
// const express = require('express');
// const { Op } = require('sequelize');
// const bcrypt = require('bcryptjs');

// const { setTokenCookie, restoreUser } = require('../../utils/auth');
// const { User } = require('../../db/models');

// const { check } = require('express-validator');
// const { handleValidationErrors } = require('../../utils/validation');

// const router = express.Router();

// const validateLogin = [
//   check('credential')
//     .exists({ checkFalsy: true })
//     .notEmpty()
//     .withMessage('Please provide a valid email or username.'),
//   check('password')
//     .exists({ checkFalsy: true })
//     .withMessage('Please provide a password.'),
//   handleValidationErrors
// ];

// // Log in
// router.post(
//   '/',
//   validateLogin,
//   async (req, res, next) => {
//     const { credential, password } = req.body;

//     const user = await User.unscoped().findOne({
//       where: {
//         [Op.or]: {
//           username: credential,
//           email: credential
//         }
//       }
//     });

//     if (!user || !bcrypt.compareSync(password, user.hashedPassword.toString())) {
//       const err = new Error('Login failed');
//       err.status = 401;
//       err.title = 'Login failed';
//       err.errors = { credential: 'The provided credentials were invalid.' };
//       return next(err);
//     }

//     const safeUser = {
//       id: user.id,
//       firstName: user.firstName, // <---- now includes firstName
//       lastName: user.lastName,   // <---- now includes lastName
//       email: user.email,
//       username: user.username,
//     };

//     await setTokenCookie(res, safeUser);

//     return res.json({
//       user: safeUser
//     });
//   }
// );

// // Log out
// router.delete(
//   '/',
//   (_req, res) => {
//     res.clearCookie('token');
//     return res.json({ message: 'success' });
//   }
// );

// // Restore session user (GET) using restoreUser middleware
// router.get('/', restoreUser, (req, res) => { // <---- added restoreUser middleware here
//   const { user } = req;
//   if (user) {
//     const safeUser = {
//       id: user.id,
//       firstName: user.firstName, // <---- include firstName
//       lastName: user.lastName,   // <---- include lastName
//       email: user.email,
//       username: user.username,
//     };
//     return res.status(200).json({ user: safeUser });
//   } else {
//     return res.status(200).json({ user: null });
//   }
// });

// module.exports = router;




// backend/routes/api/session.js
const express = require('express');
const { Op } = require('sequelize');
const bcrypt = require('bcryptjs');

const { setTokenCookie, restoreUser } = require('../../utils/auth');
const { User } = require('../../db/models');

const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

const router = express.Router();

const validateLogin = [
  check('credential')
    .exists({ checkFalsy: true })
    .notEmpty()
    .withMessage('Please provide a valid email or username.'),
  check('password')
    .exists({ checkFalsy: true })
    .withMessage('Please provide a password.'),
  handleValidationErrors
];

// Log in
router.post(
  '/',
  validateLogin,
  async (req, res, next) => {
    const { credential, password } = req.body;

    const user = await User.unscoped().findOne({
      where: {
        [Op.or]: {
          username: credential,
          email: credential
        }
      }
    });

    if (!user || !bcrypt.compareSync(password, user.hashedPassword.toString())) {
      // Updated error message and title to "Invalid credentials"
      const err = new Error('Invalid credentials');
      err.status = 401;
      err.title = 'Invalid credentials';
      err.errors = { credential: 'The provided credentials were invalid.' };
      return next(err);
    }

    const safeUser = {
      id: user.id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      username: user.username,
    };

    await setTokenCookie(res, safeUser);

    return res.json({
      user: safeUser
    });
  }
);

// Log out
router.delete(
  '/',
  (_req, res) => {
    res.clearCookie('token');
    return res.json({ message: 'success' });
  }
);

// GET current user session using restoreUser middleware
router.get('/', restoreUser, (req, res) => {
  const { user } = req;
  if (user) {
    const safeUser = {
      id: user.id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      username: user.username,
    };
    return res.status(200).json({ user: safeUser });
  } else {
    return res.status(200).json({ user: null });
  }
});

module.exports = router;