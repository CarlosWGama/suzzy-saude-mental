import axios from 'axios';
import { AppConfig } from '../config/app';
import AsyncStorage from '@react-native-async-storage/async-storage';


const api = axios.create({
    baseURL: AppConfig.API_URL
})

api.interceptors.request.use(async (config:any) => {
      const token = await AsyncStorage.getItem('jwt');
      if (token)
        config.headers = {'Authorization': `Bearer ${token}`}
      return config
})
    

export default api;