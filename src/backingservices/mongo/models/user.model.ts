import mongoose, {Schema, Types} from 'mongoose';

import {ProfileMongoDB} from '../connection';


const UserSchema = new Schema({
  email: {type: String},
}, {
  timestamps: true,
});


const UserModel = ProfileMongoDB.model('User', UserSchema);

export {
  UserModel,
};
