import User from "../model/User.js"

export const getAllUsers = async(req, res, next)=>{
    try {
        const users = await User.find();
        return res.status(200).send("All Users"+ users);
    } catch (error) {
        return res.status(500).send("Internal Server Error");
        
    }
}

export const getById = async(req, res,next)=>{
    try {
        const user = await User.findById(req.params.id);
        if(!user){
            return res.status(404).send("User Not Found");
        }
        return res.status(200).send("User"+ user);
    } catch (error) {
        return res.status(500).send("Internal Server Error");
        
    }
}