import { Schema } from 'mongoose'

import { ProfileMongoDB } from '../connection'

const ExperienceSchema = new Schema({
  jobPosition: { type: String },
  companyName: { type: String }
})

const EducationSchema = new Schema({
  institutionName: { type: String },
  career         : { type: String }
})

const ProfileSchema = new Schema({
  firstName  : { type: String, trim: true },
  fullName   : { type: String, trim: true },
  lastName   : { type: String, trim: true },
  mobilePhone: { type: String },
  urlLinkedin: { type: String, trim: true, lowercase: true },
  experiences: [ ExperienceSchema ],
  educations : [ EducationSchema ]
}, {
  timestamps: true
})

const ProfileModel = ProfileMongoDB.model('Profile', ProfileSchema)

export {
  ProfileModel
}
