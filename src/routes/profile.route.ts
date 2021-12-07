import {Router} from 'restify-router';
import {profileController} from '../controllers/profile.controller';
const ProfileRoute = new Router();


// http://localhost:8080/api/v1/profiles/getAllProfiles?filterName=Cristhian

ProfileRoute.get('/getAllProfiles', async (req, res)=>{
  try {
    const {} = req.query;
    return res.json({});
  } catch (error) {
    return res.json({
      error: true,
      errorMessage: error.message,
    });
  }
});

// http://localhost:8080/api/v1/profiles/getAllProfiles?idRef=xxxx

ProfileRoute.get('/getProfileById', async (req, res)=>{
  try {
    console.log(req.query);
    const {idRef} = req.query;
    const response = profileController.getProfileByIdFromstaticData(idRef);
    return res.json(response);
  } catch (error) {
    return res.json({
      error: true,
      errorMessage: error.message,
    });
  }
});


ProfileRoute.post('/addProfile', async (req, res)=>{
  try {
    const {profile} = req.body;
    const response = profileController.addProfileToStaticData(profile);
    return res.json(response);
  } catch (error) {
    return res.json({
      error: true,
      errorMessage: error.message,
    });
  }
});


ProfileRoute.post('/addProfileToMongoDB', async (req, res)=>{
  try {
    const {profile} = req.body;
    const response = profileController.addProfileToMongoDB(profile);
    return res.json(response);
  } catch (error) {
    return res.json({
      error: true,
      errorMessage: error.message,
    });
  }
});

ProfileRoute.get('/getProfileByIdFromMongoDB', async (req, res)=>{
  try {
    const {idRef} = req.query;
    const response = await profileController.getProfileByIdFromMongo(idRef);
    return res.json(response);
  } catch (error) {
    return res.json({
      error: true,
      errorMessage: error.message,
    });
  }
});

ProfileRoute.post('/updateMultiplesIds', async (req, res)=>{
  try {
    const {profileIds} = req.body;
    const response = await profileController
        .updateProfilesByBulkOperator(profileIds);
    return res.json(response);
  } catch (error) {
    return res.json({
      error: true,
      errorMessage: error.message,
    });
  }
});

export default ProfileRoute;
