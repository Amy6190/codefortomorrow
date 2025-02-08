const express = require('express');
const router = express.Router();
const middleware = require('../middleware/middleware.js');
const usercontroller = require('../controller/usercontroller.js');

router.get('/getUser', usercontroller.getUser);
router.post('/registerUser',middleware.validateUsers, usercontroller.registerUser);
router.post('/userlogin',middleware.validateLoginUsers,usercontroller.userLogin)

const { ensureWebToken } = require('../utils/jwtUser.js');
router.use(ensureWebToken)

router.get('/getuserdetailsbyId', usercontroller.getuserdetailsbyId);


// ensureWebToken token can be used for further after login apis integeration 
//  req.user_role can be used for authorization
//  req.user_id can be used for authentication
//  if user login from multiple device its jwt token is stored in logindetails table so once user is logged in then its old token will be deleted 
module.exports = router;