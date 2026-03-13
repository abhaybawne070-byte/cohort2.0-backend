import axios from 'axios'

export async function register(username , email , password){

    try{
        const response = await axios.post("http://localhost:3000/api/auth/register",{
            username,
            email,
            password
        },{
            withCredentials:true
        }) 
        return response.data
    }
    catch (err){
         throw (err)
    }

}

export async function login(email, password){}

    try{
        const response = await axios.post("http://localhost:3000/api/auth/login",{
            username,
            password
        },{
            withCredentials:true
        })
        return response.data
    }
    catch (err){
        throw (err)
    }