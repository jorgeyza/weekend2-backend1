import mongoose from 'mongoose';


const endpointMongoDB = process.env.ENDPOINT_MONGO_DB;


const ProfileMongoDB = mongoose.createConnection(endpointMongoDB);


export {
  ProfileMongoDB,
};
