import axios from "axios";
import { GENERAL_URL } from "./url";

export const fetchTagsByCategory = async () => {
  const response = await axios.get(`${GENERAL_URL}/claims-by-categories`);
  const { claims } = response.data;
  return claims;
};

export const fetchTagsInProgress = async () => {
  const response = await axios.get(`${GENERAL_URL}//claims-in-progress`);
  const { claims } = response.data;
  return claims;
};

export const fetchTagsFixed = async () => {
  const response = await axios.get(`${GENERAL_URL}/claims-fixed`);
  const { claims } = response.data;
  return claims;
};
