import axios, { AxiosResponse } from "axios";

export interface Types {
  image: string;
  name: string;
}

const getTypes = (): Promise<Types[]> => {
  return axios
    .get(`https://pokebuildapi.fr/api/v1/types`)
    .then((res: AxiosResponse<Types[]>) => {
      return res.data; // Vous pouvez renvoyer directement res.data
    });
};

export default getTypes;
