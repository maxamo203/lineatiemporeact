import { useState } from "react";
import { loginRequest } from "../api/axios";
import {useForm} from 'react-hook-form'
import { PanelFlotante } from "./PanelFlotante";

export function LoginForm({isLogging, setLogging}){
    const {register, handleSubmit, formState:{errors}} = useForm()
    const [pass,setPass] = useState()
    const [errores, setErrors] = useState(null)
    const sendLogin = handleSubmit(async (values)=>{
        //e.preventDefault()
        try{
            await loginRequest(values)
            setLogging(false)
        }catch(err){
            setErrors(err.response.data.message);
        }
    })

    const cancelar =() =>{
        setLogging(false)
    }
    return(
        
        <PanelFlotante className={`${isLogging?' paneleando':''} `} onSubmit={sendLogin}>
            {errors.password && (<MensajeError message={'Contraseña requerida'}/>)}
            {errores && (<MensajeError message={errores}/>)}
            <input type="password" placeholder="Contraseña" {...register('password',{required:true})}className="bg-yellow-600 rounded-md p-1 placeholder:text-zinc-600" onChange={(e) => setPass(e.target.value)}/>
            <button type="submit" className="bg-green-300 w-max text-black text-xl rounded-md my-2 p-1">Login</button>
            <button type="button" onClick={cancelar} className="bg-red-300 w-max text-black rounded-md p-1">Cancelar</button>
        </PanelFlotante>

    )
}

function MensajeError({message}){
    return <p className='text-red-500'>{message}</p>
}