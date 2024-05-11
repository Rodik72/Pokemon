import axios, { AxiosResponse } from "axios";

export interface Pokemon {
  image: string;
  sprite: string;
  name: string;
  apiTypes: [{ name: string }];
  stats: { attack: number; HP: number; defense: number; speed: number };
}

const getPokemon = (): Promise<Pokemon[]> => {
  return axios
    .get(`https://pokebuildapi.fr/api/v1/pokemon`)
    .then((res: AxiosResponse<Pokemon[]>) => {
      return res.data; // Vous pouvez renvoyer directement res.data
    });
};

export default getPokemon;
