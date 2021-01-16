import jwt from 'jsonwebtoken';
import config from '../config';

import User from '../models/user';
import Roles from '../models/roles';

export const hasToken = async (req, res, next)=>{

    try {
            const token  = req.headers["token"];
        
        if(!token) return res.status(403).json({message: "no se proporciono token"})
        const decoded = jwt.verify(token,config.SECRET)
        req.userId = decoded.id

        const user =  await User.findById(decoded.id,{password: 0}) 
        if(!user) return res.status(404).json({message: "Este usuario no existe"})

         next()
            
    } catch (err) {
    
        return res.status(401).json({message: "Token no valido"})
    }
}

export const isAdmin = async (req, res, next) =>{

    const user = await User.findById(req.userId)
    const roles = await Roles.find({_id: {$in: user.roles}})
   
    roles.map(role=>{
             
        if(role.name === 'administrador'){
           next()
           return;
        }   
    })

    res.status(403).json({message: 'Requires rol de administrador'})
}