import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import Spinner from "../components/Spinner"

const VerCliente = () => {
    const { id } = useParams()

    const [cliente, setCliente] = useState({})
    const [cargando, setCargando] = useState(true)

    useEffect(() => {
        const consultarCliente = async () => {
            try {
                const url = `http://localhost:4000/clientes/${id}`
                const respuesta = await fetch(url)
                const resultado = await respuesta.json()

                setCliente(resultado)

            } catch (error) {
                console.log(error)
            }

            setCargando(!cargando)
        }

        consultarCliente()
    }, [])

    return (
        cargando ? <Spinner /> :
            Object.keys(cliente).length === 0
                ? <p>No hay resultados</p> : (

                    <div>
                        <h1 className="font-bold text-4xl text-blue-900">Ver cliente: {cliente.nombre}</h1>
                        <p className="mt-3 mb-5">Información del cliente</p>

                        <p className="text-2xl text-gray-600"><span className="text-gray-800 font-bold uppercase">E-mail: </span> {cliente.email}</p>

                        {cliente.telefono && (
                            <p className="text-2xl text-gray-600"><span className="text-gray-800 font-bold uppercase">Teléfono: </span> {cliente.telefono}</p>
                        )}

                        <p className="text-2xl text-gray-600"><span className="text-gray-800 font-bold uppercase">Empresa: </span> {cliente.empresa}</p>

                        {cliente.notas && (
                            <p className="text-2xl text-gray-600"><span className="text-gray-800 font-bold uppercase">Notas: </span> {cliente.notas}</p>
                        )}
                    </div>
                )

    );
}

export default VerCliente;