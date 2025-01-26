import React, { useState } from "react";
import "./FolderList.css";

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
  const [editingTaskId, setEditingTaskId] = useState(null);
  const [editedTaskName, setEditedTaskName] = useState("");

  const handleFolderEdit = (id, nombre) => {
    setEditFolderId(id);
    setNewFolderName(nombre);
  };

  const handleSubmitFolderEdit = (id) => {
    onEditFolder(id, newFolderName);
    setEditFolderId(null);
  };

  const toggleFolder = (id) => {
    setSelectedFolderId(selectedFolderId === id ? null : id);
  };

  const handleTaskClick = (task) => {
    setSelectedTask(selectedTask?.id === task.id ? null : task);
  };

  const handleTaskEdit = (task) => {
    setEditingTaskId(task.id);
    setEditedTaskName(task.nombre);
  };

  const handleSubmitTaskEdit = (task) => {
    onEditTask(task.id, { nombre: editedTaskName, completa: task.completa });
    setEditingTaskId(null);
  };

  const toggleTaskCompletion = (task) => {
    onEditTask(task.id, { nombre: task.nombre, completada: !task.completada });
  };

  return (
    <div className="folder-list">
      <ul>
        {folders.map((folder) => (
          <li key={folder.id} className="folder-item">
            {editFolderId === folder.id ? (
              <input
                type="text"
                value={newFolderName}
                onChange={(e) => setNewFolderName(e.target.value)}
                onBlur={() => handleSubmitFolderEdit(folder.id)}
                autoFocus
                className="folder-input"
              />
            ) : (
              <span
                onDoubleClick={() => handleFolderEdit(folder.id, folder.nombre)}
                className="folder-name"
              >
                {folder.nombre}
              </span>
            )}
            <div className="folder-actions">
              <button onClick={() => onDeleteFolder(folder.id)}>Eliminar</button>
              <button onClick={() => toggleFolder(folder.id)}>
                {selectedFolderId === folder.id ? "Ocultar Tareas" : "Ver Tareas"}
              </button>
            </div>

            {selectedFolderId === folder.id && (
              <ul className="task-list">
                {folder.tareas.map((tarea) => (
                  <li
                    key={tarea.id}
                    className={`task-item ${tarea.completada ? "completed" : ""}`}
                  >
                    {editingTaskId === tarea.id ? (
                      <>
                        <input
                          type="text"
                          value={editedTaskName}
                          onChange={(e) => setEditedTaskName(e.target.value)}
                          className="task-input"
                        />
                        <button onClick={() => handleSubmitTaskEdit(tarea)}>
                          Guardar
                        </button>
                      </>
                    ) : (
                      <>
                        <span
                          onClick={() => handleTaskClick(tarea)}
                          className={tarea.completa ? "completed-text" : ""}
                        >
                          {tarea.nombre}
                        </span>
                        <div className="task-actions">
                          <button onClick={() => handleTaskEdit(tarea)}>
                            Editar
                          </button>
                          <button onClick={() => toggleTaskCompletion(tarea)}>
                            {tarea.completada ? "Desmarcar" : "Completar"}
                          </button>
                          <button onClick={() => onDeleteTask(tarea.id)}>
                            Eliminar
                          </button>
                        </div>
                      </>
                    )}
                  </li>
                ))}
              </ul>
            )}

            <TaskForm folderId={folder.id} onAddTask={onAddTask} />
          </li>
        ))}
      </ul>

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
        className="task-input"
      />
      <input
        type="text"
        placeholder="Descripción (opcional)"
        value={taskDescription}
        onChange={(e) => setTaskDescription(e.target.value)}
        className="task-input"
      />
      <button type="submit">Agregar Tarea</button>
    </form>
  );
};

export default FolderList;
