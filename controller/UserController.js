import bcrypt from "bcrypt";
import jwt from 'jsonwebtoken';
import UserModel from "../model/userModel.js"

class UserController {
    static createUser = async(req,res,next) =>{
        try {
            const {username, password, role} = req.body
            if (!username || !password ) {
                // const err = new ErrorManagement(`All fields are required.`, 400);
                // return next(err);
                 return res.status(400).json({
                status: 'fail',
                message: 'All fields are required.'
            });
            }
            const checkUserExits = await UserModel.findOne({username: username})
            if (checkUserExits) {
                //  const err = new ErrorManagement(`User already exists.Please choose another username.`, 400);
                // return next(err);
                 return res.status(400).json({
                status: 'fail',
                message: 'User already exists.Please choose another username.'
            });
            }
            const saltValueForHashPassword = await bcrypt.genSalt(10)
            const hashedPassword = await bcrypt.hash(password, saltValueForHashPassword);
            const newUser = new UserModel({
                username: username,
                password: hashedPassword,
                role: role
            })
            await newUser.save();
            return res.status(201).json({
                status: 'success',
                message: 'User created successfully.'
            });
        } catch (error) {
            console.log(error)
            return next(error);
        }
    }
    static getAllUser = async(req,res, next) =>{
        try {
            const users = await UserModel.find({})
            return res.status(201).json({
                status: 'success',
                message: users
            });
        } catch (error) {
            console.log(error)
            return next(error);
        }

    }
    static getOneUser = async(req,res) =>{
        try {
            const user = await UserModel.findById({_id: req.params.id})
            return res.status(201).json({
                status: 'success',
                message: user
            });
        } catch (error) {
            console.log(error)
            return next(error);
        }

    }
    static editUser = (req,res) =>{

    }
    static deleteUser = (req,res) =>{

    }
    static login = async(req,res,next) =>{
       try {
         const {username, password} = req.body;
         if (username && password) {
             const checkUserExits = await UserModel.findOne({username: username})
             if (!checkUserExits) {
                 //  const err = new ErrorManagement(`User not found. Please register user`, 400);
                 //     return next(err);
                  return res.status(400).send(
                                             {
                                                  status: "fail", 
                                                  message: "User not found. Please register user.",
                                                 });
             }
             const isMatchPassword = await bcrypt.compare(password, checkUserExits.password);
             if ((username===checkUserExits.username) &&  isMatchPassword) {
                 const JWTtoken = jwt.sign(  { 
                     userID: checkUserExits._id 
                 }, 
                 process.env.JWT_SECRET_KEY, 
                 {
                      expiresIn: '1h'
                 }
                 );
         
                 return res.status(200).send(
                                             {
                                                  status: "success", 
                                                  message: "You are LogedIn.",
                                                  JWTtoken:JWTtoken,
                                                  role: checkUserExits.userRole
                                                 });
 
                 
             }else{
                 return res.status(400).send(
                                             {
                                                  status: "fail", 
                                                  message: "Username or password may be wrong.",
                                                 });
             }
         }
       } catch (error) {
        console.log(error)
       }

    }
  
}

export default UserController;