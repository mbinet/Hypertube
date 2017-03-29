/**
 * Defining a User Model in mongoose
 * Code modified from https://github.com/sahat/hackathon-starter
 */

import bcrypt from 'bcrypt-nodejs';
import mongoose from 'mongoose';

// Other oauthtypes to be added

/*
 User Schema
 */

const UserSchema = new mongoose.Schema({
    email: { type: String, unique: true, lowercase: true },
    password: String,
    tokens: Array,
    profile: {
        username: { type: String, default: '' },
        firstname: { type: String, default: '' },
        lastname: { type: String, default: '' },
        picture: { type: String, default: '' },
        lang: {type: String, default: 'en'},
        seen: {type: Array, default: []}
    },
    resetPasswordToken: String,
    resetPasswordExpires: Date,
    google: {},
    key42: {},
    facebook: {}
});

function encryptPassword(next) {
    const user = this;
    if (!user.isModified('password')) return next();
    return bcrypt.genSalt(5, (saltErr, salt) => {
        if (saltErr) return next(saltErr);
        return bcrypt.hash(user.password, salt, null, (hashErr, hash) => {
            if (hashErr) return next(hashErr);
            user.password = hash;
            return next();
        });
    });
}

/**
 * Password hash middleware.
 */
UserSchema.pre('save', encryptPassword);

/*
 Defining our own custom document instance method
 */
UserSchema.methods = {
    comparePassword(candidatePassword, cb) {
        bcrypt.compare(candidatePassword, this.password, (err, isMatch) => {
            if (err) return cb(err);
            return cb(null, isMatch);
        });
    }
};

/**
 * Statics
 */

UserSchema.statics = {};

export default mongoose.model('User', UserSchema);
