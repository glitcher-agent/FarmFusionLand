import Role from "../model/Role.js";
import User from "../model/User.js";
import bcrypt from "bcryptjs";
import jwt from 'jsonwebtoken'
import UserToken from "../model/UserToken.js";
import nodemailer from 'nodemailer';


export const register = async (req, res, next) =>{
    try {
        const existingUser = await User.findOne({ email: req.body.email });
        if (existingUser) {
      return res.status(400).json("Email is already registered.");
      
    }
        const role = await Role.find({ role: 'users' });
        const salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(req.body.password, salt)
        const newUser = new User({
            fullName: req.body.fullName,
            userName: req.body.userName,
            email: req.body.email,
            password: hashPassword,
            roles: role
        });
        await newUser.save();
        return res.status(200).json("Registration Success");
        
    } catch (error) {
        return res.status(200).json("Registration is failed, Please try again later");
        
    }
}

export const registerAdmin = async (req, res, next) =>{
    const role = await Role.find({});
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(req.body.password, salt)
    const newUser = new User({
        fullName: req.body.fullName,
        userName: req.body.userName,
        email: req.body.email,
        password: hashPassword,
        roles: role,
        isAdmin: true
    });
    await newUser.save();
    return res.status(200).json("Admin Registration Success");
}

export const login = async (req, res, next) =>{
    try{
        const user = await User.findOne({ email: req.body.email }).populate("roles", "role");
        const { roles } = user
        if (!user){
            return res.status(404).json("user not found");
        }
        const isPasswordCorrect = await bcrypt.compare(req.body.password, user.password)
        if (!isPasswordCorrect){
            return res.status(400).json("Password is incorrect");     
        }
        const token = jwt.sign({ id: user._id, isAdmin: user.isAdmin, role: roles },"secretkey");
        res.cookie("access", token, { httpOnly: true })
            .status(200)
            .json({
                status: 200,
                message: "login Success",
                data: user
            })
        return res.status(200).json("Login Success");
    } catch (error)
    {

        return res.status(500).json("Internal Server Error"+error);
    }
}

export const sendEmail = async (req, res, next) =>{
    const email = req.body.email;
    const user = await User.findOne({email: {$regex: '^'+email+'$', $options: 'i' }});
    if(!user){
        return res.status(404).json("USER NOT FOUND");
    }
    const payload = {
        email: user.email
    }
    const expiryTime =300;
    const token =jwt.sign(payload, "secretkey", {expiresIn: expiryTime});

    const newToken = new UserToken({
        userId: user._id,
        token:token
    });

    const mailSender = nodemailer.createTransport({
        service:"gmail",
        auth:{
            user:"vinodnaidu124@gmail.com",
            pass:"srvziirysesqitnw"
        }

    });
    let mailDetails ={
        from: "vinodnaidu124@gmail.com",
        to: email,
        subject: "Reset Password",
        html:`
    <html>
    <head>
        <title>Password Reset Request</title>
    </head>
    <body>
        <h1>Password Reset Request</h1>
        <p>Dear ${user.userName}, </p>

        <p>We have received a request to reset your password for your account with FarmGrow. To complete the password reset process, please click on the button below:</p>
        
        <a href = "http://localhost:4200/reset/${token}">
        <button style="background-color: #4CAF58; color: white; padding: 14px 20px; border: none; cursor: pointer; border-radius: 4px;">Reset Password </button>
        </a>
        
        <p>Please note that this link is only valid for a 5mins. If you did not request a password reset, please disregard this message.</p>
        
        <p>Thank you, </p>
        <p>FarmGrow Team</p>
        
        </body>
</html>
`,
    };
    mailSender.sendMail(mailDetails, async(err, data)=>{
        if(err){
            console.log("error"+err);
            return res.status(500).json("Somethin Went Wrong");
        }else{
            await newToken.save();
            return res.status(200).json("Mail Sent Successfully");
        }
    })

}

export const resetPassword = async (req, res, next)=>{
    const token = req.body.token;
    const newPassword = req.body.password;
    jwt.verify(token, "secretkey", async(err, data)=>{
        if(err){
            return res.status(500).json("Reset Link is Expired"+err)
        }else{ 
            const response = data;
            const user = await User.findOne({email: {$regex: '^'+response.email+'$', $options: 'i' }});
            const salt = await bcrypt.genSalt(10);
            const encryptedPassword = await bcrypt.hash(newPassword, salt);
            user.password = encryptedPassword;
            try {
                const updatedUser = await User.findOneAndUpdate(
                    {_id:user._id},
                    {$set: user},
                    {new: true}
                )
                return res.status(200).json("Password Updated")
            } catch (error) {
                return res.status(500).json("Password is not Updated please try again Later"+error)
                
            }
        }

    })

}
