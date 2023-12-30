import {FaEdit, FaEraser, FaPlus, FaCheck, FaWindowClose} from 'react-icons/fa'
import { EventContext } from './Evento'
import { DataContext } from '../App'
import { useContext, useEffect } from 'react'
import { addEventoRequest, deleteEventoRequest,editEventoRequest } from '../api/axios'
import { PanelFlotante } from './PanelFlotante'
import {useForm} from 'react-hook-form'

function EstiloBotones({children, className}){
    return (
        <div className={`bg-blue-700 w-max rounded-md p-1 flex gap-5 absolute -bottom-4 right-3 botones invisible ${className}`}>
            {children}
        </div>
    )
}

const useContexts = () =>{
    const estadoEvento = useContext(EventContext);
    const data = useContext(DataContext);
    function pedirValidacion(){
        data.setLogging(true)
    }
    const cancelarCambios = () =>{
        estadoEvento.setEditando(false)
    }
    return { estadoEvento, data, pedirValidacion,cancelarCambios };
}

export function BotonesEdit(){
    const { estadoEvento, data, pedirValidacion } = useContexts();

    const activarEdicion = () =>{
        estadoEvento.setEditando(true)
    }

    const agregarEvento = async () =>{
        
        const nuevaData = {titulo: `Nuevo evento ${estadoEvento.indice+1}`, fecha: `${new Date().toLocaleDateString('es-ES')}`}
        let newData = [...data.data]
        newData.splice(estadoEvento.indice+1,0, nuevaData)
        nuevaData.pos = estadoEvento.indice+1
        //console.log(nuevaData);
        try{
            const res = await addEventoRequest(nuevaData)
            //console.log(res);
            data.setData(newData)
        }
        catch(err){
            //console.log(err);
            err.response.status == 403 && pedirValidacion()
        }
    }

    const pedirConfirmacion = ()=>{
        console.log(estadoEvento.indice);
        data.setIndiceABorrar(estadoEvento.indice)
    }
    return (
        <EstiloBotones>
            <button onClick={agregarEvento}><FaPlus/></button>
            <button onClick={activarEdicion}><FaEdit/></button>
            <button onClick={pedirConfirmacion}><FaEraser/></button>
        </EstiloBotones>
    )
}
export function BotonesConfirmar({parametros, tituloInicial}){
    const { estadoEvento, data, pedirValidacion,cancelarCambios } = useContexts();
    const confirmarCambios = async () => {
        //console.log(parametros, tituloInicial);

        const nuevaData = {titulo: parametros.titulo, fecha: parametros.fecha}
        let newData = [...data.data]
        newData[estadoEvento.indice] = nuevaData
        nuevaData.filtro = tituloInicial
        //console.log(nuevaData);
        try{
            const res = await editEventoRequest(nuevaData)
            //console.log(res);
            data.setData(newData)
        }
        catch(err){
            err.response.status == 403 && pedirValidacion()
            
            return //para que no salga del modo edicion
        }
        estadoEvento.setEditando(false)
    }

    return (
        <EstiloBotones >
            <button onClick={confirmarCambios}><FaCheck/></button>
            <button onClick={cancelarCambios}><FaWindowClose/></button>
        </EstiloBotones>
    )
}

export function BotonAddAlFinal(){
    const {  data, pedirValidacion } = useContexts();
    const agregarAlFinal = async () =>{
        const nuevaData = {titulo: `Nuevo evento ${data.data.length}`, fecha: `${new Date().toLocaleDateString('es-ES')}`}
        let newData = [...data.data]
        newData.splice(data.data.length,0, nuevaData)
        //console.log(nuevaData);
        try{
            const res = await addEventoRequest(nuevaData)
            //console.log(res);
            data.setData(newData)
        }
        catch(err){
            //console.log(err);
            err.response.status == 403 && pedirValidacion()
        }
    }

    return(
        <button onClick = {agregarAlFinal} className='h-20 w-20 bg-pink-600 mx-auto  flex items-center justify-center rounded-xl mt-9'><FaPlus className='text-5xl'/></button>
    )

}

export function PanelConfirmacion({setIndice, indice}){
    const {data, pedirValidacion } = useContexts();
    const {handleSubmit} = useForm()
    const borrarEvento = handleSubmit(async () =>{
        let newData = [...data.data]
        newData.splice(indice,1)
        try{
            const res = await deleteEventoRequest(indice)
            data.setData(newData)
            data.setIndiceABorrar(null)
        }
        catch(err){
            //console.log(err);
            err.response.status == 403 && pedirValidacion()
        }
        
    })

    const cancelar = ()=>{
        console.log(data);
        data.setIndiceABorrar(null)
    }
    return (
        <PanelFlotante className={`${indice != null?' paneleando':''} z-20 bg-red-500`} onSubmit={borrarEvento}>
            <p>Seguro quieres borrar el evento <b>'{`${data?.data[indice]?.titulo}`}</b>'?</p>
            <button type='submit' className="bg-green-300 w-max text-black text-xl rounded-md my-2 p-1">Confirmar</button>
            <button type='button' onClick={cancelar} className="bg-red-300 w-max text-black rounded-md p-1">Cancelar</button>
        </PanelFlotante>
    )
}

