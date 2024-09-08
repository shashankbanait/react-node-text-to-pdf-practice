import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL;

export const fetchUsers = () => axios.get(`${API_URL}/users`);
export const fetchHostelers = () => axios.get(`${API_URL}/hostelersData`);