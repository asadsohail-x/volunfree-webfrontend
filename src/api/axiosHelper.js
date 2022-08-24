import axios from "axios";

const config = {
  headers: {
    "Content-Type": "application/json",
  },
};

export const axiosGet = (url) => axios.get(url, config);
export const axiosPost = (url, body) => axios.post(url, body, config);
export const axiosPut = (url, body) => axios.put(url, body, config);
export const axiosPatch = (url, body) => axios.patch(url, body, config);
export const axiosDelete = (url) => axios.delete(url, config);
