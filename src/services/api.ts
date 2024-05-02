import axios from "axios";
import { API_URL } from "../constants/constants";

// To Submit card data to https://jsonplaceholder.typicode.com/posts by post method

export const sendCardInfo = async (data: any): Promise<any> => {
  try{
    const response = await axios.post(`${API_URL}/posts`, data)
    return response.data
  }catch(error){
    throw new Error('Failed to submit form')
  }
  
}

export default sendCardInfo