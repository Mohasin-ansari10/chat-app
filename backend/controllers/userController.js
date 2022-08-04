const { userModel } = require("../model/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

require("dotenv").config();


//Sign Up user
const signUpuser = async (req, res) => {
    const { username , email, password } = req.body;
    
  
    //Validation
    if (!username || !email || !password ) {
      res.status(400).send("Please include all fields.");
    }
  
    //Find the user already exists
    const userExists = await userModel.findOne({ email });
  
    if (userExists) {
      res.status(400).send("Email already exists");
    }else {
      // hash password
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);
  
      //save user in db
      const user = new userModel({
        username,
        email,
        password: hashedPassword,
      });
      user.save((err, user) => {
        if (err) {
          return res.status(400).json({
            message: "not able to save user",
            rr: err,
          });
        } else {
          res.json({
            data: user,
          });
        }
      });
    }
  };

//login api of user with jwt
const loginUser = async (req, res) => {

    const { email, password } = req.body;
    console.log(email , password , "thssss");
  
    const user = await userModel.findOne({ email });
    console.log(user,"scdvftgbhnj");
  
  
    const ComparePass = await bcrypt.compare(password, user.password);
  
    // check user & password match
    if (user && ComparePass) {
      const token = generateToken({ _id: user._id});
  
      //put token in cookie
      res.cookie("token", token, { expire: new Date() + 9999 });
      res.status(200).json({
        _id: user._id,
        username : user.username,
        email: user.email,
        role: user.role,
        headers: {
          "content-type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
    } else {
      res.status(401).send("Invalid Credentials");
    }
  };
  // Generate token
const generateToken = (_id) => {
    return jwt.sign(_id, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });
  };

module.exports ={loginUser ,signUpuser }