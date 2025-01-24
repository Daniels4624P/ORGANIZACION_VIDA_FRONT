import React, { useState, useEffect } from "react";
import FolderList from "./components/FolderList";
import FolderForm from "./components/FolderForm";
import Loader from "./components/Loader";
import {
  obtenerTodasLasCarpeta,
  eliminarUnaCarpeta,
  actualizarUnaCarpeta,
  crearUnaTarea,
  eliminarUnaTarea,
  actulizarUnaTarea,
} from "./services/api";

const App = () => {
  const [folders, setFolders] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchFolders = async () => {
    setIsLoading(true); // Inicia la barra de carga
    try {
      const response = await obtenerTodasLasCarpeta();
      setFolders(Array.isArray(response) ? response : []);
    } catch (error) {
      console.error("Error fetching folders:", error);
    } finally {
      setIsLoading(false); // Detén la barra de carga
    }
  };

  const handleDeleteFolder = async (id) => {
    try {
      await eliminarUnaCarpeta(id);
      fetchFolders();
    } catch (error) {
      console.error("Error deleting folder:", error);
    }
  };

  const handleEditFolder = async (id, newName) => {
    try {
      await actualizarUnaCarpeta(id, { nombre: newName });
      fetchFolders();
    } catch (error) {
      console.error("Error editing folder:", error);
    }
  };

  const handleAddTask = async (folderId, task) => {
    try {
      const payload = {
        carpetaId: folderId,
        nombre: task.nombre,
        descripcion: task.descripcion,
      };
      await crearUnaTarea(payload);
      fetchFolders();
    } catch (error) {
      console.error("Error adding task:", error.response?.data || error.message);
    }
  };

  const handleDeleteTask = async (taskId) => {
    try {
      await eliminarUnaTarea(taskId);
      fetchFolders();
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };

  const handleEditTask = async (taskId, updatedTask) => {
    try {
      await actulizarUnaTarea(taskId, updatedTask);
      fetchFolders();
    } catch (error) {
      console.error("Error editing task:", error);
    }
  };

  useEffect(() => {
    fetchFolders();
  }, []);

  return (
    <div>
      <h1>Gestión de Carpetas</h1>
      {isLoading && <Loader />}
      <FolderForm onFolderCreated={fetchFolders} />
      <FolderList
        folders={folders}
        onDeleteFolder={handleDeleteFolder}
        onEditFolder={handleEditFolder}
        onAddTask={handleAddTask}
        onDeleteTask={handleDeleteTask}
        onEditTask={handleEditTask}
      />
    </div>
  );
};

export default App;
