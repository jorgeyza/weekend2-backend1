import RestifyErrors from 'restify-errors'
import { Router } from 'restify-router'
import { profileController } from '../controllers/profile.controller'
const ProfileRoute = new Router()

const validateApiKeyService = (apiKey) => {
  const { API_KEY_SERVICE } = process.env
  if(API_KEY_SERVICE === apiKey)
    return true

  return false
}

const validateAuthorizationBearer = (authBearer) => {
  if(authBearer)
    return true

  return false
}

const middlewareServiceAuth = (req, res, next) => {
  try {
    const { apiservice, authorization } = req.headers

    const hasApiService = validateApiKeyService(apiservice)
    let validateAuth = false
    if(!hasApiService) {
      const hasAuthBeare =  validateAuthorizationBearer(authorization)
      validateAuth = hasAuthBeare
      if(validateAuth)
        next()
    }

    validateAuth = hasApiService

    if(validateAuth)
      next()

    throw new Error('Not authenticate')
  } catch (error) {
    const newErr = new RestifyErrors.UnauthorizedError('No se ha proveido el auth bearer o el service api key')

    return next(newErr)
  }
}

// http://localhost:8080/api/v1/profiles/getAllProfiles?filterName=Cristhian

ProfileRoute.get('/getAllProfiles', async (req, res) => {
  try {
    const {} = req.query

    return res.json({})
  } catch (error) {
    return res.json({
      error       : true,
      errorMessage: error.message
    })
  }
})

// http://localhost:8080/api/v1/profiles/getAllProfiles?idRef=xxxx

ProfileRoute.get('/getProfileById', async (req, res) => {
  try {
    console.log(req.query)
    const { idRef } = req.query
    const response = profileController.getProfileByIdFromstaticData(idRef)

    return res.json(response)
  } catch (error) {
    return res.json({
      error       : true,
      errorMessage: error.message
    })
  }
})

ProfileRoute.post('/addProfile', async (req, res) => {
  try {
    const { profile } = req.body
    const response = profileController.addProfileToStaticData(profile)

    return res.json(response)
  } catch (error) {
    return res.json({
      error       : true,
      errorMessage: error.message
    })
  }
})

ProfileRoute.post('/addProfileToMongoDB', async (req, res) => {
  try {
    const { profile } = req.body
    const response = profileController.addProfileToMongoDB(profile)

    return res.json(response)
  } catch (error) {
    return res.json({
      error       : true,
      errorMessage: error.message
    })
  }
})

ProfileRoute.post('/addMultipleProfiles', middlewareServiceAuth, async (req, res) => {
  try {
    console.log(req.headers)
    const profiles = req.body
    const response = await profileController.addMultipleProfilesToMongoDB(profiles)

    return res.json(response)
  } catch (error) {
    return res.json({
      error       : true,
      errorMessage: error.message
    })
  }
})

ProfileRoute.get('/getProfileByIdFromMongoDB', async (req, res) => {
  try {
    const { idRef } = req.query
    const response = await profileController.getProfileByIdFromMongo(idRef)

    return res.json(response)
  } catch (error) {
    return res.json({
      error       : true,
      errorMessage: error.message
    })
  }
})

ProfileRoute.post('/updateMultiplesIds', async (req, res) => {
  try {
    const { profileIds } = req.body
    const response = await profileController
      .updateProfilesByBulkOperator(profileIds)

    return res.json(response)
  } catch (error) {
    return res.json({
      error       : true,
      errorMessage: error.message
    })
  }
})

export default ProfileRoute
