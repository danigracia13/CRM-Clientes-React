import { useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

//Layout
import Layout from "./layout/Layout"

import NuevoCliente from './paginas/NuevoCliente'
import Editarcliente from './paginas/EditarCliente'
import VerCliente from './paginas/VerCliente'
import Inicio from "./paginas/Inicio"

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/clientes" element={<Layout />}>
                    <Route index element={<Inicio />} />
                    <Route path="nuevo" element={<NuevoCliente />} />
                    <Route path="editar/:id" element={<Editarcliente />} />
                    <Route path=":id" element={<VerCliente />} />
                </Route>
            </Routes>
        </BrowserRouter>
    )
}

export default App
