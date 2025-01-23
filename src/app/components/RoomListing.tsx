'use client'

import type React from "react"
import { useCallback, useEffect, useState } from "react"
import Image from "next/image"
import { Star, Person } from "react-bootstrap-icons"
import api from 'src/app/adapters/axios'
import { exibirErrorCatch, exibirToastSuccess } from 'src/app/utils/alerts'
import { Room } from 'src/app/types/bookings'
import { AlertReact } from 'src/app/components'


export function RoomListing() {
  const [rooms, setRooms] = useState<Room[]>([])

  const geBookings = useCallback(async () => {
    try {
      const { data } = await api.getBookings()
      setRooms(data)
    } catch (error) {
      exibirErrorCatch(error)
    }
  }, [])

  async function handleCreate(roomId: number) {
    try {
      await api.createBooking({ roomId })

      exibirToastSuccess('Reserva realizada com sucesso')
    } catch (error) {
      exibirErrorCatch(error)
    }
  }

  useEffect(() => {
    geBookings()
  }, [geBookings])

  return (
    <div className="container py-5">
      <h1 className="mb-4">Quartos Disponíveis</h1>
      <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
        {rooms.map((room) => (
          <div key={room.id} className="col">
            <div className="card h-100">
              <Image
                src={room.imageUrl}
                className="card-img-top"
                alt={room.name}
                layout="responsive"
                width={500}
                height={300}
              />
              <div className="card-body">
                <h5 className="card-title">{room.name}</h5>
                <div className="d-flex align-items-center mb-2">
                  <Person className="me-1" />
                  <small className="text-muted">Capacidade: {room.capacity}</small>
                </div>
                <div className="d-flex align-items-center mb-3">
                  {[...Array(5)].map((_, index) => (
                    <Star key={index} className="text-warning" />
                  ))}
                  <small className="text-muted ms-1">({room.reviews} avaliações)</small>
                </div>
                <div className="d-flex justify-content-between align-items-center">
                  <h6 className="mb-0">R$ {room.price}/noite</h6>
                  <button 
                    className="btn btn-primary"
                    onClick={() => {
                      AlertReact.confirmation({
                        titulo: 'Confirmar reserva',
                        texto: `Reservar ${room.name}`,
                        showCloseButton: true,
                        confirmButtonColor: '#28a745',
                        confirmButtonText: 'Reservar',
                        showCancelButton: true,
                        cancelButtonColor: '#858796',
                        cancelButtonText: 'Cancelar',
                        showLoaderOnConfirm: true,
                        preConfirm: () => handleCreate(room.id),
                      })
                    }}
                  >
                    Reservar
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

