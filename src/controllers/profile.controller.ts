import { ProfileModel } from '../backingservices/mongo/models/profile.model'
import mongoose from 'mongoose'
const { Types } = mongoose

import allData from './datatest'

/**
   * PROFILE.
   */
class PROFILE {
  /**
   * getBackgroundBulkFromApi.
   */
  getAllProfileFromMongo() {
  }

  /**
   * parseData.
   * @param {any} profile value.
   * @return {any}
   */
  parseData(profile) {
    // eslint-disable-next-line no-unused-vars
    const { _id, ...leanProfile } = profile

    return leanProfile
  }

  async addMultipleProfilesToMongoDB(profiles) {
    try {
      const newElements = []
      for (const [ index, profile ] of Object.entries(profiles)) {
        // console.time(`${Number(index) + 1} entry`)
        // console.log(`Procesando :[${Number(index) + 1}] de un total de : [${profiles.length}]`)
        // console.log('🚀 ~ file: profile.controller.ts ~ line 32 ~ PROFILE ~ addMultipleProfilesToMongoDB ~ profile', profile)
        // const newProfile = new ProfileModel(profile)
        // const responseSave = await newProfile.save()
        // console.log('🚀 ~ file: profile.controller.ts ~ line 36 ~ PROFILE ~ addMultipleProfilesToMongoDB ~ responseSave', responseSave)
        // console.timeEnd(`${Number(index) + 1} entry`)
        // newElements.push(responseSave._id)
      }

      return { success: true, newElements }
    } catch (error) {
      throw error
    }
  }

  async addProfileToMongoDB(profiles) {
    try {
      const data = await ProfileModel.insertMany(profiles)
      console.log(data)
    } catch (error) {
      throw error
    }
  }

  async updateProfilesByBulkOperator(profilesIds) {
    try {
      const profileBulkOperator = ProfileModel.collection.initializeUnorderedBulkOp()
      for (const profileId of profilesIds)
        profileBulkOperator.find({
          _id: Types.ObjectId(profileId)
        }).updateOne({
          $set: {
            lastName: 'Bootcamp'
          }
        })

      if(profileBulkOperator) {
        const dataOperator = await profileBulkOperator.execute()
        console.log(dataOperator)
      }
    } catch (error) {
      throw error
    }
  }

  async getProfileByIdFromMongo(idRef) {
    try {
      const matchProfilesById = await ProfileModel.find({
        _id: Types.ObjectId(idRef)
      }).select({ experiences: 0, educations: 0 }).lean()

      let matchProfileById

      if(matchProfilesById.length) {
        const [ firstElementFromDB ] = matchProfilesById
        console.log('🚀 ~ file: profile.controller.ts ~ line 36 ~ PROFILE ~ getProfileByIdFromMongo ~ firstElementFromDB', firstElementFromDB)
        matchProfileById = firstElementFromDB
      }

      const matchProfileByIdFromFindOne = await ProfileModel
        .findOne({
          _id: Types.ObjectId(idRef)
        })
        .select({ firstName: 1 })
        .lean()

      const matchProfileByIdFromFindById = await ProfileModel
        .findById(Types.ObjectId(idRef)).select({ _id: 1, createdAt: 1 }).lean()

      return {
        ...(matchProfileById ? { matchProfileById } : {}),
        ...(matchProfileByIdFromFindOne ? { matchProfileByIdFromFindOne } : {}),
        ...(matchProfileByIdFromFindById ? { matchProfileByIdFromFindById } : {})
      }
    } catch (error) {
      console.log('🚀 ~ file: profile.controller.ts ~ line 57 ~ PROFILE ~ getProfileByIdFromMongo ~ error', error)
      throw error
    }
  }

  getAllProfileFromStaticData() {
    return allData
  }

  addProfileToStaticData(profile) {
    allData.push({
      profile
    })

    return allData
  }

  getProfileByIdFromstaticData(idRef) {
    try {
      const resolveDataByFind = allData.find((el) => String(el._id) === String(idRef))

      const resolveDataByFilter = allData.filter((el) => String(el._id) === String(idRef))

      const [ firstElementResolveFromResolveDataByFilter ] = resolveDataByFilter

      let dataToFind = null

      for (const dt of allData)
        if(String(dt._id) === String(idRef) && dataToFind === null)
          dataToFind = dt

      return {
        resolveDataByFind,
        firstElementResolveFromResolveDataByFilter,
        dataToFind
      }
    } catch (error) {
      throw new Error(error)
    }
  }
}

const profileController = new PROFILE()

export {
  profileController
}

