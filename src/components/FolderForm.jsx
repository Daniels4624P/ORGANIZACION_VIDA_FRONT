import React, { useState } from 'react';
import { crearUnaCarpeta } from './../services/api';
import './FolderList.css'

const FolderForm = ({ onFolderCreated }) => {
  const [folderName, setFolderName] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await crearUnaCarpeta({ nombre: folderName });
      setFolderName('');
      onFolderCreated(); // Llamar a la función para actualizar la lista de carpetas
    } catch (error) {
      console.error('Error creating folder:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Nombre de la carpeta"
        value={folderName}
        onChange={(e) => setFolderName(e.target.value)}
        required
      />
      <button type="submit">Crear Carpeta</button>
    </form>
  );
};

export default FolderForm;
