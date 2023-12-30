import Centro from "./Centro"
import { BotonesEdit, BotonesConfirmar } from "./BotonesCRUD"
import React, { useState, useContext } from 'react';
const estilo = 'bg-blue-500 rounded-xl p-3 flex flex-col justify-between max-w-sm gap-4 tarjeta relative min-w-32'

export const EventContext = React.createContext()

export function Evento({ titulo, fecha, izquierda, indice }) {
    const [editando, setEditando] = useState(false)
    return (
        <EventContext.Provider value={{setEditando, indice}}>
            <div className="  w-1/2 my-5 flex flex-row justify-center gap-3 mx-auto">

                {editando ? <TarjetaEditable titulo={titulo} fecha={fecha} izquierda={izquierda} /> : <Tarjeta titulo={titulo} fecha={fecha} izquierda={izquierda} />}
                <Centro />
                {editando ? <TarjetaEditable titulo={titulo} fecha={fecha} izquierda={!izquierda} /> : <Tarjeta titulo={titulo} fecha={fecha} izquierda={!izquierda} />}
            </div>
        </EventContext.Provider>
    )
}



function EstiloTarjeta({children, className, izquierda}){
    return(
        <div className={`bg-blue-500 rounded-xl p-3 flex flex-col justify-between gap-4 tarjeta relative max-w-full min-w-36 ${className} ${izquierda ? '' : ' invisible'}`}>
            {children}
        </div>
    )
}

function Tarjeta({ titulo, fecha, izquierda }) {
    return (
        <EstiloTarjeta izquierda={izquierda} className={`${titulo.startsWith('Nuevo evento')?'nuevoEvento': ''}`}>
            <p className='p-1'>{titulo}</p>
            <hr/>
            <p className="p-1">{fecha}</p>
            <BotonesEdit />
        </EstiloTarjeta>
    )
}

function TarjetaEditable({ titulo, fecha, izquierda }) {
    const [tituloInicial, settituloInicial] = useState(titulo)
    const [parametros, setParametros] = useState({titulo,fecha})

    const autoResize = (event) => {
        const textarea = event.target;
        textarea.style.height = `${textarea.scrollHeight}px`;
      };

    return (
        <EstiloTarjeta izquierda={izquierda} >
            <textarea type="text" defaultValue={titulo} onChange={(e) => {setParametros({titulo:e.target.value, fecha: parametros.fecha}); autoResize(e)}} className="bg-blue-600 rounded-md p-1 overflow-hidden" />
            <input type="text" defaultValue={fecha} onChange={(e) => {setParametros({titulo:parametros.titulo, fecha:e.target.value})}} className="bg-blue-600 rounded-md p-1" />
            <BotonesConfirmar parametros={parametros} tituloInicial={tituloInicial}/>
        </EstiloTarjeta>

    )
}
/*
const estilo = 'bg-blue-500 '
    const estiloIzquierda = estilo + `${izquierda?'':' invisible'}`
    const estiloDerecha = estilo + `${!izquierda?'':' invisible'}`
    */