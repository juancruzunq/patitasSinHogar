import React, { useState } from 'react';
import Select from 'react-select'
import { FaVenus, FaMars ,FaArrowLeft } from 'react-icons/fa';
import { IoIosCheckmarkCircleOutline, IoIosCloseCircleOutline } from 'react-icons/io';
import '../styles/components/pages/publicarAnimal.css';
import provincias from '../utils/provincias.json';
import axios from 'axios';
import PopUp from "../components/layout/PopUp"

const MascotaUploadPage = ({ mascota ,onBack}) => {
  const [nombre, setNombre] = useState(mascota.nombre);
  const [contacto, setContacto] = useState(mascota.contacto);
  const [edad, setEdad] = useState(mascota.edad);
  const [castrado, setCastrado] = useState(mascota.castrado);
  const [vacunado, setVacunado] = useState(mascota.vacunado);
  const [imagen, setImagen] = useState(null);
  const [descripcion, setDescripcion] = useState(mascota.descripcion);
  const [genero, setGenero] = useState(mascota.tipo === 0 ? 'Hembra' : 'Macho');
  const [provincia, setProvincia] = useState(provincias.find(provincia => provincia.label === mascota.provincia));
  const [loading, setLoading] = useState(false);
  const [popupVisible, setPopupVisible] = useState(false);
  const [popupStatus, setPopupStatus] = useState(null);
  const [popupMessage, setPopupMessage] = useState('');


  /* Handle Nombre*/
  const handleNombreChange = (event) => {
    setNombre(event.target.value);
  };

  /* Handle contacto*/
  const handleContactoChange = (event) => {
    setContacto(event.target.value);
  };

  /* Handle Edad*/
  const handleEdadChange = (event) => {
    setEdad(parseInt(event.target.value, 10));
  };

  /* Handle Tipo*/
  const handleGeneroChange = (selectedTipo) => {
    setGenero(selectedTipo);
  };

  /* Handle Provincia*/
  const handleProvinciaChange = (option) => {
    setProvincia(option);
  };

  /* Handle Vacunado*/
  const handleCastradoChange = () => {
    setCastrado(!castrado);
  };

  /* Handle Vacunado*/
  const handleVacunadoChange = () => {
    setVacunado(!vacunado);
  };

  /* Handle Descripcion*/
  const handleDescripcionChange = (event) => {
    setDescripcion(event.target.value);
  };

  /* Handle Imagen*/
  const handleImagenChange = (event) => {
    setImagen(event.target.files[0]);
  };

  /* Handle Imagen*/
  const handleUploadClick = () => {
    document.getElementById('imagen').click();
  };

  /* Handle PopUp Close*/
  const handlePopupClose = () => {
    setPopupVisible(false);
    onBack();
    window.location.reload();
  };
  /* Handle PopUp component*/
  const handlePopUp = (status, message) => {
    setPopupStatus(status);
    setPopupMessage(message);
    setPopupVisible(true);
  }

  

  /* Enviar Formulario */
  const handleSubmit = async (event) => {
    const apiUrl = process.env.REACT_APP_API_URL + '/actualizar/' + mascota.id_mascota;
    event.preventDefault();

    setLoading(true);
    const formData = new FormData();
    if(imagen != null){
      formData.append('imagen', new File([imagen], imagen.name));
    }    
    formData.append('nombre', nombre);
    formData.append('edad', edad);
    formData.append('contacto', contacto);
    formData.append('tipo', genero === 'Hembra' ? '0' : '1');
    formData.append('castrado', castrado ? 1 : 0);
    formData.append('vacunado', vacunado ? 1 : 0);
    formData.append('descripcion', descripcion);
    formData.append('provincia', provincia.label);

    try {
      const response = await axios.put (apiUrl, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        withCredentials: true
      });

      handlePopUp(response.status, response.data.message);
      resetPatita();
      setLoading(false);
      
    } catch (error) {
      handlePopUp(error.response.status, error.response.data.message);
      setLoading(false);
    }
  };

  /* Resetea la informacion de la Mascota*/
  const resetPatita = () => {
    setNombre('');
    setEdad(0);
    setDescripcion('');
    setGenero('Hembra');
    setVacunado(null);
    setCastrado(null);
    setImagen(null);
  }
  /*Renderizado de la imagen de la mascota*/
  const extractImageURLFromHTMLString = (htmlString) => {
    const imgTagRegex = /<img.*?src=['"](.*?)['"].*?>/;
    const match = imgTagRegex.exec(htmlString);
    if (match && match[1]) {
      return match[1];
    }
    return '';
  };

  // Example of using navigate to go to a different route
  const handleBackClick = () => {
    onBack()
  };

  return (
    <div>
      {popupVisible && (
        <PopUp status={popupStatus} message={popupMessage} onClose={handlePopupClose} />
      )}
      {loading && (
        <div className="loading-overlay">
          <div className="loading-spinner"></div>
        </div>
      )}
      <form className="custom-form" onSubmit={handleSubmit}>
        <div className="redes-title">
           {/* Back button */}
          <div className="back-button" onClick={handleBackClick}>
        <FaArrowLeft /> Volver
      </div>
          <h2>Actualizar Patita</h2>
        </div>
        <div className="image-upload">
          <div className="image-upload-circle" onClick={handleUploadClick}>
            {imagen ? (
              <img src={URL.createObjectURL(imagen)} alt="Mascota" /> 
              
            ) : (
              mascota.imagen && (
                <img
                  src={extractImageURLFromHTMLString(mascota.imagen)}
                  alt="Mascota"
                />
              )
            )}
          </div>
          <input
            type="file"
            id="imagen"
            accept="image/*"
            onChange={handleImagenChange}
            style={{ display: 'none' }}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="nombre" className="form-label">
            Nombre
          </label>
          <input
            type="text"
            className="form-control"
            id="nombre"
            value={nombre}
            onChange={handleNombreChange}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="contacto" className="form-label">
            Contacto
          </label>
          <input
            type="number"
            className="form-control"
            id="contacto"
            value={contacto}
            onChange={handleContactoChange}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="edad" className="form-label">
            Edad
          </label>
          <input
            type="number"
            className="form-control"
            id="edad"
            value={edad}
            onChange={handleEdadChange}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="ubicacion" className="form-label">
            Ubicacion
          </label>
          <Select isSearchable={true} options={provincias} value={provincia} onChange={handleProvinciaChange} className='custom-select' required />
        </div>
        <div className="mb-3">
          <label htmlFor="tipo" className="form-label">
            Tipo
          </label>
          <div className="tipo-icons">
            <div
              className={`tipo-icon ${genero === 'Hembra' ? 'selected female' : ''}`}
              onClick={() => handleGeneroChange('Hembra')}
            >
              <FaVenus />
              <span>Hembra</span>
            </div>
            <div
              className={`tipo-icon ${genero === 'Macho' ? 'selected male' : ''}`}
              onClick={() => handleGeneroChange('Macho')}
            >
              <FaMars />
              <span>Macho</span>
            </div>
          </div>
        </div>
        <div className="mb-3 form-check">
          <div
            className={`castrado-icon ${castrado ? 'selected' : ''}`}
            onClick={handleCastradoChange}
          >
            {castrado ? <IoIosCheckmarkCircleOutline size={40} color="green" /> : <IoIosCloseCircleOutline size={40} color="red" />}
            <span>Castrado</span>
          </div>
          <div
            className={`vacunado-icon ${vacunado ? 'selected' : ''}`}
            onClick={handleVacunadoChange}
          >
            {vacunado ? <IoIosCheckmarkCircleOutline size={40} color="green" /> : <IoIosCloseCircleOutline size={40} color="red" />}
            <span>Vacunado</span>
          </div>
        </div>
        <div className="mb-3">
          <label htmlFor="descripcion" className="form-label">
            Descripción
          </label>
          <textarea
            id="descripcion"
            value={descripcion}
            onChange={handleDescripcionChange}
            className="form-control"
            required
            style={{ height: '150px' }}
          />
        </div>
        <div className="text-center">
          <button type="submit" className="btn btn-primary btn-violet btn-center">
            {loading ? 'Actualizando Patita...' : 'Actualizar'}
          </button>
        </div>

      </form>
    </div>
  );
};

export default MascotaUploadPage;
