import axios from "axios";
import { GENERAL_URL } from "./url";

export const fetchTagsByCategory = async () => {
  try {
    const response = await axios.get(`${GENERAL_URL}/claims-by-categories`);
    const { success } = response.data;
    if (success) {
      const { claims } = response.data;
      return claims;
    }
  } catch (error) {}
};

export const fetchTagsInProgress = async () => {
  try {
    const response = await axios.get(`${GENERAL_URL}/claims-in-progress`);
    const { success } = response.data;
    if (success) {
      const { claims } = response.data;
      return claims;
    }
  } catch (error) {}
};

export const fetchTagsFixed = async () => {
  try {
    const response = await axios.get(`${GENERAL_URL}/claims-fixed`);
    const { success } = response.data;
    if (success) {
      const { claims } = response.data;
      return claims;
    }
  } catch (error) {}
};
