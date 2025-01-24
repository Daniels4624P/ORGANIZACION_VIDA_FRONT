import React, { useState } from "react";
import "./FolderList.css"; // Archivo CSS para los estilos personalizados.

const FolderList = ({
  folders,
  onDeleteFolder,
  onEditFolder,
  onAddTask,
  onDeleteTask,
  onEditTask,
}) => {
  const [editFolderId, setEditFolderId] = useState(null);
  const [newFolderName, setNewFolderName] = useState("");
  const [selectedFolderId, setSelectedFolderId] = useState(null);
  const [selectedTask, setSelectedTask] = useState(null);

  const handleFolderEdit = (id, nombre) => {
    setEditFolderId(id);
    setNewFolderName(nombre);
  };

  const handleSubmitEdit = (id) => {
    onEditFolder(id, newFolderName);
    setEditFolderId(null);
  };

  const toggleFolder = (id) => {
    setSelectedFolderId(selectedFolderId === id ? null : id);
  };

  const handleTaskClick = (task) => {
    setSelectedTask(selectedTask?.id === task.id ? null : task);
  };

  return (
    <div className="folder-list">
      <ul>
        {folders.map((folder) => (
          <li key={folder.id}>
            {editFolderId === folder.id ? (
              <input
                type="text"
                value={newFolderName}
                onChange={(e) => setNewFolderName(e.target.value)}
                onBlur={() => handleSubmitEdit(folder.id)}
                autoFocus
              />
            ) : (
              <span onDoubleClick={() => handleFolderEdit(folder.id, folder.nombre)}>
                {folder.nombre}
              </span>
            )}
            <button onClick={() => onDeleteFolder(folder.id)}>Eliminar</button>
            <button onClick={() => toggleFolder(folder.id)}>
              {selectedFolderId === folder.id ? "Ocultar Tareas" : "Ver Tareas"}
            </button>

            {selectedFolderId === folder.id && (
              <ul>
                {folder.tareas.map((tarea) => (
                  <li key={tarea.id} className="task-item">
                    <span onClick={() => handleTaskClick(tarea)}>{tarea.nombre}</span>
                    <input
                      type="text"
                      value={tarea.nombre}
                      onChange={(e) =>
                        onEditTask(tarea.id, { nombre: e.target.value })
                      }
                    />
                    <button onClick={() => onDeleteTask(tarea.id)}>Eliminar tarea</button>
                  </li>
                ))}
              </ul>
            )}

            <TaskForm folderId={folder.id} onAddTask={onAddTask} />
          </li>
        ))}
      </ul>

      {/* Mostrar la descripción de la tarea seleccionada */}
      {selectedTask && (
        <div className="task-details">
          <h3>{selectedTask.nombre}</h3>
          <p>{selectedTask.descripcion || "Sin descripción"}</p>
          <button onClick={() => setSelectedTask(null)}>Cerrar</button>
        </div>
      )}
    </div>
  );
};

const TaskForm = ({ folderId, onAddTask }) => {
  const [taskName, setTaskName] = useState("");
  const [taskDescription, setTaskDescription] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onAddTask(folderId, { nombre: taskName, descripcion: taskDescription });
    setTaskName("");
    setTaskDescription("");
  };

  return (
    <form onSubmit={handleSubmit} className="task-form">
      <input
        type="text"
        placeholder="Nombre de la tarea"
        value={taskName}
        onChange={(e) => setTaskName(e.target.value)}
        required
      />
      <input
        type="text"
        placeholder="Descripción (opcional)"
        value={taskDescription}
        onChange={(e) => setTaskDescription(e.target.value)}
      />
      <button type="submit">Agregar Tarea</button>
    </form>
  );
};

export default FolderList;
