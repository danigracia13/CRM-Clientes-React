import { Outlet, Link, useLocation } from "react-router-dom";

const Layout = () => {
    const location = useLocation()
    const urlActual = location.pathname

    return (
        <div className="md:flex md:min-h-screen">
            <div className="md:w-1/6 bg-blue-900 px-5 py-10">
                <h2 className="text-4xl text-gray-100 text-center font-bold">CRM Clientes</h2>
                <nav className="mt-10">
                    <Link to="/clientes" className={`${urlActual === "/clientes" ? "border-2 border-white rounded-xl" : ""} p-3 text-gray-100 block text-2xl font-bold mt-2 hover:text-blue-300`}>
                        Clientes
                    </Link>
                    <Link to="/clientes/nuevo" className={`${urlActual === "/clientes/nuevo" ? "border-2 border-white rounded-xl" : ""} p-3 text-gray-100 block text-2xl font-bold mt-2 hover:text-blue-300`}>
                        Nuevo Cliente
                    </Link>
                </nav>
            </div>
            <div className="md:w-5/6 p-10 md:h-screen overflow-scroll">
                <Outlet />
            </div>
        </div>
    );
}

export default Layout;
