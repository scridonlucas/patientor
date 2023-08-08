import axios from 'axios';
import { Diagnose } from '../types';
import { apiBaseUrl } from '../constants';

const getAll = async () => {
  const { data } = await axios.get<Diagnose[]>(`${apiBaseUrl}/diagnosis`);

  return data;
};

export default {
  getAll,
};
