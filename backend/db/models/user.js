// 'use strict';

// const { Model, Validator } = require('sequelize');

// module.exports = (sequelize, DataTypes) => {
//   class User extends Model {
//     static associate(models) {
//       // define association here
//     }
//   }

//   User.init(
//     {
//       username: {
//         type: DataTypes.STRING,
//         allowNull: false,
//         unique: true,
//         validate: {
//           len: [4, 30],
//           isNotEmail(value) {
//             if (Validator.isEmail(value)) {
//               throw new Error('Cannot be an email.');
//             }
//           },
//         },
//       },
//       email: {
//         type: DataTypes.STRING,
//         allowNull: false,
//         unique: true,
//         validate: {
//           len: [3, 256],
//           isEmail: true,
//         },
//       },
//       hashedPassword: {
//         type: DataTypes.STRING.BINARY,
//         allowNull: false,
//         validate: {
//           len: [60, 60],
//         },
//       },
//     },
//     {
//       sequelize,
//       modelName: 'User',
//       defaultScope: {
//         attributes: {
//           exclude: ['hashedPassword', 'email', 'createdAt', 'updatedAt'],
//         },
//       },
//     }
//   );
//   return User;
// };




"use strict";

const { Model, Validator } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
      // define associations here if needed
    }
  }

  User.init(
    {
      firstName: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          len: {
            args: [1, 30],
            msg: "first name must be between 1 and 30 characters"
          }
        }
      },
      lastName: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          len: {
            args: [1, 30],
            msg: "last name must be between 1 and 30 characters"
          }
        }
      },
      username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
          len: {
            args: [4, 30],
            msg: "username must be between 4 and 30 characters"
          },
          isNotEmail(value) {
            if (Validator.isEmail(value)) {
              throw new Error("Cannot be an email.");
            }
          },
        },
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
          len: {
            args: [3, 256],
            msg: "email must be between 3 and 256 characters"
          },
          isEmail: {
            msg: "Must be a valid email address."
          },
        },
      },
      hashedPassword: {
        type: DataTypes.STRING.BINARY,
        allowNull: false,
        validate: {
          len: {
            args: [60, 60],
            msg: "hashedPassword must be exactly 60 characters"
          }
        }
      },
    },
    {
      sequelize,
      modelName: "User",
      defaultScope: {
        attributes: {
          exclude: ["hashedPassword", "email", "createdAt", "updatedAt"],
        },
      },
    }
  );
  return User;
};