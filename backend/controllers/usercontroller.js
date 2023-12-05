import User from "../models/usermodels.js"
import nodemailer from "nodemailer";


const registerUser = async (req, res) =>{
    try { var userData = req.body
    var result = await User.create(userData);
    res.status (200).json(result);

}catch (e) {res.status(400).json ({
    "message": e.message
     })
    }
}

const loginUser = async (req, res) => {
    var result = await User.findOne({email: req.body.email, password: req.body.password});
    if(result != null){
        res.status(200).json(true);
    }else{
        res.status(200).json(false);
    }

}
const sendEmail =(req, res) =>{
    const transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 465,
        secure: true,
        auth: {
          user: "rayoweb@gmail.com",
          pass: "cmmcadqczpczhwwj"
        },
        tls: {
            rejectUnauthorized: false
        }
    });
}

export { registerUser, loginUser, sendEmail}