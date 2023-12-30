import axios from 'axios'

const instance = axios.create({
    baseURL: 'https://lineatiempoback.onrender.com/api',
    withCredentials: true //supongo que para que guarde las cookies
})

export const eventosRequest = () => instance.get(`/events`)
export const deleteEventoRequest = (pos) => instance.delete(`/events/${pos}`)
export const addEventoRequest = (evento) => instance.post(`/events`, evento)
export const editEventoRequest = (evento) => instance.put(`/events`, evento)
export const loginRequest = (pass) => instance.post(`/login`, pass)

// export const loginRequest = (user) => instance.post (`/login`, user)

// export const verifyTokenRequest = () => instance.get('/verify')