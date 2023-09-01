import React, { useEffect, useState } from 'react';
import '../styles/components/pages/adoptarAnimalPage.css';
import axios from 'axios';
import MascotaCard from '../components/layout/MascotaCard';


const AdoptarPage = () => {

    const [mascotas, setMascotas] = useState([]);
    const [loading, setLoading] = useState(true);


    //Busca las mascotas para adoptar
    const fetchMascotas = async () => {
        const apiUrl = process.env.REACT_APP_API_URL + '/mascotas';
        try {
            const response = await axios.get(apiUrl, { withCredentials: true });
            setMascotas(response.data);
            setTimeout(() => {
                setLoading(false);
            }, 1000);
        } catch (error) {
            setMascotas([]);
        }
    };

    useEffect(() => {
        fetchMascotas();
    }, []);
    
    return (
        <div>            
            {loading && (
                <div className="loading-overlay">
                    <div className="loading-spinner"></div>
                </div>
            )}
            <div className="title-container">
                <h2>Adoptar Patita</h2>
            </div>
            {mascotas.length === 0 ? (
                <p className="empty-message">
                    Por el momento, no hay mascotas en adopción. Intente más tarde.
                </p>
            ) : (
                <div className="adopciones-cards">
                    {mascotas.map((mascota) => (
                        <MascotaCard
                            key={mascota.id_mascota}
                            mascota={mascota} />
                    ))}
                </div>
            )}
        </div>
    );
};

export default AdoptarPage;
