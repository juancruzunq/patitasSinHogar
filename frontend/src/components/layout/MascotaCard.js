import React from 'react';
import PropTypes from 'prop-types';
import '../../styles/components/layout/mascotaCard.css';
import { GiHealthNormal } from "react-icons/gi";
import { MdDelete, MdModeEditOutline } from "react-icons/md";
import { FaMapMarkerAlt, FaInfoCircle, FaWhatsapp } from 'react-icons/fa';

const MascotaCard = ({ mascota, flag, onDelete ,onUpdate }) => {

  /* Extrae la URL de la etiqueta img */
  const imageUrlRegex = /src=['"](.*?)['"]/;
  const imageUrlMatch = mascota.imagen.match(imageUrlRegex);
  const imageUrl = imageUrlMatch ? imageUrlMatch[1] : '';

  /* Informacion medica de la mascota */
  const atencionMedica = () => {
    if (mascota.vacunado && mascota.castrado) {
      if (mascota.tipo === 0) {
        return "Vacunada & Castrada";
      } else {
        return "Vacunado & Castrado";
      }
    } else if (mascota.vacunado || mascota.castrado) {
      if (mascota.vacunado) {
        return mascota.tipo === 0 ? "Vacunada" : "Vacunado";
      } else {
        return mascota.tipo === 0 ? "Castrada" : "Castrado";
      }
    } else {
      return "Sin atención médica";
    }
  };

  /* Informacion basica de la mascota */
  const infoMascota = () => {
    if (mascota.tipo === 0) {
      if(mascota.edad === 0){
        return "Hembra, Bebe";
      }
      else{
        return "Hembra, Adulta";
      }
    }
    else{
      if(mascota.edad === 0){
        return "Macho , Bebe";
      }
      else{
        return "Macho, Adulto"
      }
    }
     
  };

  /* Abre el chat de whatsapp para el contacto */
  const handleWhatsappClick = () => {
    const phoneNumber = mascota.contacto;
    const message = `Hola 👋 Vi tu publicacion en PatitasSinHogar y estoy interesado en adoptar a ${mascota.nombre} 🐱 🐶`;
    const whatsappUrl = `https://api.whatsapp.com/send?phone=${phoneNumber}&text=${encodeURIComponent(message)}`;

    window.open(whatsappUrl, '_blank');
  };

  /* Handle eliminar mascota */
  const handleDeleteClick = () => {
    onDelete();
  };

  /* Handle Edit mascota */
  const handleEditClick = () => {
    onUpdate(mascota);
  };

  return (
    <div>
      <div className="card">
        <div className="card-content">
          <div className="img-container">
            <img src={imageUrl} alt={mascota.nombre} />
          </div>
          <div className="adopciones-card-info">
            <h4 className="nombre-mascota">{mascota.nombre}</h4>
            <div className="additional-info">
              <FaInfoCircle className="additional-info-icon" />
              <p className="additional-info-text">{infoMascota()}</p>
            </div>
            <div className="additional-info">
              <GiHealthNormal className="additional-info-icon" />
              <p className="additional-info-text">{atencionMedica()}</p>
            </div>
            <div className="location-container">
              <FaMapMarkerAlt className="location-icon" />
              <p>{mascota.provincia}</p>
            </div>
            <p >{mascota.descripcion}</p>

          </div>
        </div>
        <div className="icons-container">
          {flag ? (
            <>
              <MdModeEditOutline className="icon edit" onClick={handleEditClick} />
              <MdDelete className="icon delete" onClick={handleDeleteClick} />
            </>
          ) : (
            <FaWhatsapp className="icon whatsapp" onClick={handleWhatsappClick} />
          )}
        </div>
      </div>
    </div>
  );
};

MascotaCard.propTypes = {
  mascota: PropTypes.object.isRequired,
};

export default MascotaCard;
