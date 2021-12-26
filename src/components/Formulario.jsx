import { Formik, Form, Field } from "formik";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup"

import Error from "./Error"
import Spinner from "./Spinner"

const Formulario = ({cliente, cargando}) => {
    const navigate = useNavigate()

    const nuevoClienteSchema = Yup.object().shape({
        nombre: Yup.string()
                .min(3, "El nombre es muy corto")
                .max(40, "El nombre es muy largo")
                .required("El nombre del cliente es obligatorio"),
        empresa: Yup.string()
                .required("El nombre de la empresa es obligatorio"),
        email: Yup.string()
                .email("El email no es valido")
                .required("El email es obligatorio"),
        telefono: Yup.number()
                .integer("El número no es válido")
                .positive("El número no es válido")
                .typeError("El número no es válido")                
    })

    const handleSubmit = async valores => {
        
        try {
            if (cliente.id){
                //Actualizando registro

                const url = `http://localhost:4000/clientes/${cliente.id}`
            
                await fetch(url, { 
                    method: "PUT", 
                    body: JSON.stringify(valores), 
                    headers: {"Content-Type": "application/json"}
                })

            } else { 
                //Nuevo registro
                
                const url = "http://localhost:4000/clientes"
            
                await fetch(url, { 
                    method: "POST", 
                    body: JSON.stringify(valores), 
                    headers: {"Content-Type": "application/json"}
                })
            }

            navigate("/clientes")

        } catch (error) {

            console.log(error)

        }
    }

    return (
        cargando ? <Spinner /> : (
        <div className="bg-gray-100 mt-10 px-5 py-10 rounded-md shadow-md md:w-3/4 mx-auto">
            <h1 className="text-gray-600 font-bold text-xl uppercase text-center">{cliente?.nombre ? "Editar Cliente" : "Agregar Cliente"}</h1>

            <Formik
                initialValues={{
                    nombre: cliente?.nombre ?? "",
                    empresa: cliente?.empresa ?? "",
                    email: cliente?.email ?? "",
                    telefono: cliente?.telefono ?? "",
                    notas: cliente?.notas ?? "",
                }}
                enableReinitialize={true}
                validationSchema={nuevoClienteSchema}
                onSubmit={ async (values, {resetForm}) => {
                    await handleSubmit(values)
                    resetForm()
                }}
            >
                {({errors, touched}) => (
                
                <Form className="mt-10">

                    <div className="mb-4">
                        <label htmlFor="nombre" className="text-gray-800">Nombre:</label>
                        <Field type="text" id="nombre" name="nombre" className="mt-2 block w-full p-3 bg-gray-200 rounded-md" placeholder="Nombre del cliente" />

                        {errors.nombre && touched.nombre ? (
                            <Error>{errors.nombre}</Error>
                        ) : null}
                    </div>
                    <div className="mb-4">
                        <label htmlFor="empresa" className="text-gray-800">Empresa:</label>
                        <Field type="text" id="empresa" name="empresa" className="mt-2 block w-full p-3 bg-gray-200 rounded-md" placeholder="Empresa del cliente" />

                        {errors.empresa && touched.empresa ? (
                            <Error>{errors.empresa}</Error>
                        ) : null}
                    </div>
                    <div className="mb-4">
                        <label htmlFor="email" className="text-gray-800">E-mail:</label>
                        <Field type="email" id="email" name="email" className="mt-2 block w-full p-3 bg-gray-200 rounded-md" placeholder="Email del cliente" />

                        {errors.email && touched.email ? (
                            <Error>{errors.email}</Error>
                        ) : null}
                    </div>
                    <div className="mb-4">
                        <label htmlFor="telefono" className="text-gray-800">Teléfono:</label>
                        <Field type="tel" id="telefono" name="telefono" className="mt-2 block w-full p-3 bg-gray-200 rounded-md" placeholder="Teléfono del cliente" />

                        {errors.telefono && touched.telefono ? (
                            <Error>{errors.telefono}</Error>
                        ) : null}
                    </div>
                    <div className="mb-4">
                        <label htmlFor="notas" className="text-gray-800">Notas:</label>
                        <Field as="textarea" id="notas" name="notas" className="mt-2 block w-full p-3 bg-gray-200 rounded-md" placeholder="Notas del cliente" />
                    </div>

                    <input type="submit" value={cliente?.nombre ? "Guardar Cambios" : "Agregar Cliente"} className="mt-5 w-full bg-blue-800 text-gray-100 p-3 uppercase font-bold text-lg hover:cursor-pointer" />
                
                </Form>
                )}

            </Formik>
        </div>
    ));
}

Formulario.defaultProps = {
    cliente: {},
    cargando: false,
}

export default Formulario;
