import jwt from "jsonwebtoken";
import user from "../model/User.js";

export const verify = (req, res, next)=>{
    const token = req.cookies.access_token;
    if(!token)
        return res.status(401).send("Not Verified User");
    jwt.verify(token, "secretkey",(err, user)=>{
        if(err){
            return res.status(404).send("Token is Not Valid");
        }else{
            req.user = user;
        }
        next();
    })
    }


export const verifyUser = (req, res, next)=>{
    verify(req,res,()=>{
        if(req.user.is === req.params.id || req.user.isAdmin){
            next();
        }else{
            return res.status(403).send("Not Authorized");
        }
    })
}

export const verifyAdmin = (req, res, next)=>{
    verify(req,res,()=>{
        if(req.user.isAdmin){
            next();
        }else{
            return res.status(403).send("Not Authorized");
        }
    })
}