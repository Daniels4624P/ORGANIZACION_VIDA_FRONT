import React, { useState, useEffect } from "react";
import FolderList from "./components/FolderList";
import FolderForm from "./components/FolderForm";
import Loader from "./components/Loader";
import "./theme.css"; // Asegúrate de importar el archivo de estilos del tema
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
  const [theme, setTheme] = useState("light");

  // Cargar el tema desde localStorage
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") || "light";
    setTheme(savedTheme);
    document.documentElement.setAttribute("data-theme", savedTheme);
  }, []);

  // Alternar tema y guardar en localStorage
  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
    document.documentElement.setAttribute("data-theme", newTheme);
  };

  const fetchFolders = async () => {
    setIsLoading(true);
    try {
      const response = await obtenerTodasLasCarpeta();
      setFolders(Array.isArray(response) ? response : []);
    } catch (error) {
      console.error("Error fetching folders:", error);
    } finally {
      setIsLoading(false);
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
    <div className="app-container">
      <header className="app-header">
        <h1>Gestión de Carpetas</h1>
        <button className="theme-toggle" onClick={toggleTheme}>
          Cambiar a {theme === "light" ? "Oscuro" : "Claro"}
        </button>
      </header>
      {isLoading && <Loader />}
      <main className="app-content">
        <FolderForm onFolderCreated={fetchFolders} />
        <FolderList
          folders={folders}
          onDeleteFolder={handleDeleteFolder}
          onEditFolder={handleEditFolder}
          onAddTask={handleAddTask}
          onDeleteTask={handleDeleteTask}
          onEditTask={handleEditTask}
        />
      </main>
      <footer className="app-footer">© 2025 Mi Aplicación Familiar</footer>
    </div>
  );
};

export default App;
