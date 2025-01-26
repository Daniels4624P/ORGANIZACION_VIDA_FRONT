import React, { useState } from "react";
import { crearUnaCarpeta } from "../services/api";
import "./FolderForm.css";

const FolderForm = ({ onFolderCreated }) => {
  const [folderName, setFolderName] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await crearUnaCarpeta({ nombre: folderName });
      setFolderName("");
      onFolderCreated(); // Actualiza la lista de carpetas
    } catch (error) {
      console.error("Error creating folder:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="folder-form">
      <input
        type="text"
        placeholder="Nombre de la carpeta"
        value={folderName}
        onChange={(e) => setFolderName(e.target.value)}
        required
        className="folder-input"
      />
      <button type="submit" className="folder-button">
        Crear Carpeta
      </button>
    </form>
  );
};

export default FolderForm;
