import config from '../config';
import jwt from 'jsonwebtoken';

import User from '../models/user';
import Roles from '../models/roles';

export const signup = async (req, res)=>{

     const {username, email, password, roles} = req.body;

        const newUser = new User ({
            username,
            email,
            password: await User.encryptPassword(password)
        })

        if(roles){
            const fountRoles = await Roles.find({name: {$in: roles}})
            newUser.roles =  fountRoles.map(role => role._id)
        }else{
            const role = await Roles.findOne({name: "usuario"})
            newUser.roles = [role._id]
        }
    
        const saveUser =  await newUser.save()
        const token = jwt.sign({id: saveUser._id},config.SECRET,{expiresIn: 86400})

           res.status(200).json({data: token})
}

export const signin = async (req, res)=>{
      
    const userFound = await User.findOne({email: req.body.email}).populate("role")      
    if(!userFound) return res.status(400).json({message: "Usuario no existente"});
                                                
    const correctPass = User.comparePassword(req.body.password ,userFound.password)
    if(!correctPass) return res.status(401).json({message: "Password incorrecto"});
    
    const token = jwt.sign({id: userFound._id},config.SECRET, { expiresIn: 86400})

      res.json({data: token})
}