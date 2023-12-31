import './App.css'
import {Evento} from './components/Evento'
import React, { useEffect, useState } from 'react'
import { eventosRequest } from './api/axios'
import { BotonAddAlFinal, PanelConfirmacion } from './components/BotonesCRUD'
import {FaAngleDoubleDown} from 'react-icons/fa'
import { LoginForm } from './components/LoginForm'
import { Loading } from './components/Loading'



export const DataContext = React.createContext()
function App() {


  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [logging, setLogging] = useState(false);
  const [primeraCarga, setPrimeraCarga] = useState(true)
  const [indiceABorrar, setIndiceABorrar] = useState(null)

  useEffect(()=>{
    const fetchEvents = async () =>{
      try{
        const response = await eventosRequest()
        setData(response.data)
      }catch(err){
        console.log(err);
      }finally{
        setPrimeraCarga(false)
        setLoading(false)
      }
      
    }
    fetchEvents()
    
  }, []) //cuando carga la pagina se trae la info de la bbdd

  const handleScroll = () => {
    const alturaTotal = document.documentElement.scrollHeight;
  
    // Realizamos el desplazamiento suave hacia abajo
    window.scrollTo({
      top: alturaTotal,
      behavior: 'smooth'
    });
  }

  if (loading && primeraCarga) {
    return <Loading/>;
  }
  return (
    <>
      {loading && <Loading/>}
      <LoginForm isLogging={logging} setLogging = {setLogging}/>
      <PanelConfirmacion indice={indiceABorrar} setIndice={setIndiceABorrar}/>
      <span className={`${logging || indiceABorrar != null?'fondoBlur': ''}`}>

        <div className='flex items-center justify-around '>
          <button onClick={handleScroll} className=' border-2 border-black  invisible'> <FaAngleDoubleDown className='text-3xl'/></button>
          <h1 className='text-3xl font-bold text-center mb-4'>Linea de Tiempo de Eventos</h1>
          <button onClick={handleScroll} className=' border-2 border-black rounded-xl p-1 '> <FaAngleDoubleDown className='text-3xl'/></button>
        </div>
      </span> 
        
        <DataContext.Provider value={{data,setData, setLogging,indiceABorrar, setIndiceABorrar, setLoading}}>
        <span className={`${logging || indiceABorrar != null?'fondoBlur': ''}`}>
        {data.map((evento, indice) => {
            return <Evento titulo={evento.titulo} fecha={evento.fecha} izquierda={indice%2===0?true:false} key= {indice} indice={indice}/>
        })}
        <BotonAddAlFinal/>
        </span> 
        <PanelConfirmacion indice={indiceABorrar} setIndice={setIndiceABorrar}/>
        </DataContext.Provider>

    </>
    
  )
}

export default App
