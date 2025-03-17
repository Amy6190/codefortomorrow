require("dotenv").config();
const jwt = require("jsonwebtoken");
const authModel = require("../models/usermodel");

function ensureWebToken(req, res, next) {
  const x_access_token = req.headers["authorization"];  
  if (typeof x_access_token !== undefined) {
    req.token = x_access_token;
    verifyJWT(req, res, next);
  } else {
    res.sendStatus(403);
  }
}

async function verifyJWT(req, res, next) {
  try {    
    jwt.verify(req.token, process.env.JWTSECRETKEY, async function (err, data) {
      console.log(req.token);
      
      if (err) {
        console.log(err);
        res.sendStatus(403);
      } else {
        const _data = await jwt.decode(req.token, {
          complete: true,
          json: true,
        });
        req.user = _data["payload"];
        console.log(req.user);
        
        req.user_id = req.user.id;
        req.email = req.user.email;
        req.user_role = req.user.user_role;
        
        let userDetails = await authModel.getUsersJwtDetails(req.token);
        console.log(req.user);
        
        if (userDetails.length == 1) {
          next();
        } else {
          return res.sendStatus(403);
        }
      }
    });
  } catch (error) {
    console.log(error, "=====");
    return res.sendStatus(401);
  }
}

module.exports = { ensureWebToken };
