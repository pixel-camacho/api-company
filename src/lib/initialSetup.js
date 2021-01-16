import Role from '../models/roles';

export const createRole = async ()=>{
    try {
        const count = await Role.estimatedDocumentCount()

        if(count > 0 ) return;

        const values = await  Promise.all([
            new Role({name:'usuario'}).save(),
            new Role({name:'administrador'}).save(),
            new Role({name:'moderador'}).save()
        ])

           console.log(values)

    } catch (err) {
        console.error(err)   
    }
} 