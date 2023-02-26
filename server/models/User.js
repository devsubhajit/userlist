const mongoose = require('mongoose');
const validator = require('../config/validator');


const userSchema = new mongoose.Schema({
    name: {
        type: String,
        lowercase: true,
        required: [true, 'Please enter a name']
    },
    email: {
        type: String,
        required: [true, 'Please enter an email'],
        unique: true,
        lowercase: true,
        validate: [(val) => {
            return validator.regex.regex.email.test(val)
        }, 'Please enter a valid email']
    },
    phone: {
        type: String,
        required: [true, 'Please enter phone number'],
        unique: true,
        lowercase: true,
        validate: [(val) => {
            return validator.regex.regex.phone.test(val)
        }, 'Please enter a valid phone number']
    },

    image: {
        type: String
    },
    createdOn: {
        type: Date,
        default: Date.now
      }
}, { strict: false });


userSchema.statics.getUsers = async function (limit, skip) {
    let [total, users] = await Promise.all([this.find().count(), this.find().limit(limit).skip(skip).sort({ createdOn: 1 })]);
    if (users) {
      let resData = { total: total, users: users }
      return resData;
    }
    throw Error('Unable to fetch');
  };

  userSchema.statics.updateUser = async function (query, arguments) {
    const edited = await this.findOneAndUpdate(
      query,
      {
        $set: arguments
      });
    if (edited) {
      return edited
    }
    throw Error('user_update_err');
  };

  userSchema.statics.deleteUser = async function (id) {
    const deleted = await this.deleteOne({_id:id});
    if (deleted) {
      return deleted
    }
    throw Error('user_delete_err');
  };

const User = mongoose.model('user', userSchema);
module.exports = User;