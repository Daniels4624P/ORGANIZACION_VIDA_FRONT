import axios from 'axios';

// Base URL de tu API
const api = axios.create({
  baseURL: 'http://localhost:3000/api/v1',
});

export const obtenerUnaTarea = (id) => api.get(`/tareas${id}`);
export const crearUnaTarea = async (tarea) => {
  try {
    const response = await api.post('/tareas', tarea);
    return response.data;
  } catch (error) {
    console.error('Error al crear una tarea:', error.response?.data || error.message);
    throw error;
  }
};

export const eliminarUnaTarea = (id) => api.delete(`/tareas/${id}`);
export const actulizarUnaTarea = (id, tarea) => api.patch(`/tareas/${id}`, tarea);
export const obtenerTodasLasCarpeta = async () => {
  try {
    const response = await api.get('/carpetas');
    return response.data;  // Axios coloca los datos dentro de .data
  } catch (error) {
    console.error('Error obteniendo las carpetas:', error);
    return [];
  }
};
export const obtenerUnaCarpeta = (id) => api.get(`/carpetas${id}`);
export const crearUnaCarpeta = (carpeta) => api.post('/carpetas', carpeta);
export const eliminarUnaCarpeta = (id) => api.delete(`/carpetas/${id}`);
export const actualizarUnaCarpeta = (id, carpeta) => api.patch(`/carpetas/${id}`, carpeta);

export default api;
