import axios, { AxiosPromise } from 'axios'
import { Room } from 'src/app/types/bookings'

const xhr = axios.create({
  baseURL: process.env.NEXT_PUBLIC_URL_API,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
})

async function getBookings(): AxiosPromise<Room[]> {
  return await xhr.get('/bookings')
}

async function createBooking<T>(params: T): AxiosPromise<void> {
  return await xhr.post('/create-booking', params)
}

const api = { getBookings, createBooking }

export default api
