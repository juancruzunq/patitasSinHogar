
import React, { useState, useEffect } from 'react';
import '../styles/components/pages/homePage.css';
import Imagen from '../images/pet.jpg';
import axios from 'axios';

const HomePage = () => {
    const [nombre, setNombre] = useState('');
    //Busca el usuario logeado
    const fetchUsuario = async () => {
        const apiUrl = process.env.REACT_APP_API_URL + '/usuario';
        try {
            const response = await axios.get(apiUrl, { withCredentials: true });
            if (response.status === 200) {
                setNombre(response.data.usuario);
            }
        } catch (error) {
            setNombre('Invitado');
        }
    }

    useEffect(() => {
        fetchUsuario();
    }, []);

    return (
        <main className="main">
            <div >
                <section >
                    <h2 className="titulos-home">Bienvenido/a {nombre} !</h2>
                    <p className="parrafo-home">
                        Te damos la bienvenida  PatitasSinHogar ! Un espacio dedicado a  la adopción de mascotas. Acá se cruzan historias de amistad y las ganas de encontrar un hogar para aquellos que buscan compañía.<br />
                        Nuestro compromiso es hacer más fácil el encuentro entre los que están dispuestos a brindar cariño y los que lo necesitan. Cada mascota que busca un hogar tiene su propia historia, una personalidad única y una oportunidad para ser parte de un nuevo capítulo en la vida de alguien.<br /> 
                        Esta plataforma no solo busca sumar un miembro a tu familia, sino también forjar un vínculo profundo. Acá encontrarás una selección de compañeros peludos en busca de cariño y seguridad. <br />
                    </p>
                    <h2 className="titulos-home">Adoptar nunca fue tan facil</h2>
                </section>
                <div className="imagen" >
                    <img src={Imagen} alt="Logo de pets" width="900" />
                </div>
            </div>
        </main>
    );
}

export default HomePage;