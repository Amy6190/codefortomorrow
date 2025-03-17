const userModel = require("../models/usermodel.js");
const { successResponse, errorResponse } = require("./responseHandler.js");
const CryptoJS = require("crypto-js");
const jwt = require("jsonwebtoken");

exports.getUser = async (req, res) => {
  try {
    const result = await userModel.getusers();
    return res.status(201).json(successResponse("User List", result));
  } catch (error) {
    console.log(error);

    return res.status(500).json(errorResponse("Database error", error));
  }
};

exports.registerUser = async (req, res) => {
  try {
    const { fname, lname, email, password, user_role } = req.body;
    console.log(email);

    const result = await userModel.getuserbyemail(email);
    console.log(result);

    if (result.length > 0) {
      return res.status(201).json(successResponse("User Already Exists", []));
    }
    if (user_role != 1 && user_role != 2) {
      return res.status(201).json(successResponse("Invalid User Id", []));
    }
    let enpas = CryptoJS.SHA256(password).toString(CryptoJS.enc.Hex);
    let saveuser = await userModel.saveuserdetails(req.body, enpas);
    console.log(saveuser, "saveuser");
    if (saveuser) {
      return res
        .status(201)
        .json(successResponse("User registered Successfully", []));
    } else {
      res
        .status(201)
        .json(errorResponse("User unable to register! Please try again", []));
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json(errorResponse("Database error", error));
  }
};

exports.userLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    let enpas = CryptoJS.SHA256(password).toString(CryptoJS.enc.Hex);
    const result = await userModel.getuserbyemail(email);
    
    if (result.length == 0) {
      return res.status(201).json(successResponse("User Not Exists", []));
    }
    let curpassword = result[0].password;
    console.log(curpassword , enpas);
    
    if (curpassword != enpas) {
      return res.status(201).json(successResponse("Wrong Password", []));
    }
    const jwtToken = jwt.sign(
      {
        email: result[0].email,
        id: result[0].id,
        user_role: result[0].user_role,
        time: Date.now(),
      },
      process.env.JWTSECRETKEY,
      { expiresIn: process.env.JWTSESSIONTIMEOUTFORAPP }
    );
    let gettoken = await userModel.gettoken(result[0].id);
    if (gettoken.length > 0) {
      let deletetoken = await userModel.deltetoken(result[0].id);
    }
    let inserttoken = await userModel.inserttoken(result[0].id, jwtToken);
    if (inserttoken) {
      return res
        .status(201)
        .json(successResponse("User Logged In Successfully", jwtToken));
    }
    console.log(jwtToken, "saveuser",result);
    return res
      .status(201)
      .json(successResponse("User Logged In Successfully", jwtToken));
  } catch (error) {
    console.log(error);
    return res.status(500).json(errorResponse("Database error", error));
  }
};


exports.getuserdetailsbyId = async (req, res) => {
    try {
     console.log(req.user);
      return res.status(201).json(successResponse("User List", req.user));
    } catch (error) {
      console.log(error);
      return res.status(500).json(errorResponse("Database error", error));
    }
  };