import axios from "axios";
import { GENERAL_URL } from "./url";

export const fetchClaims = async (id) => {
  try {
    const response = await axios.get(`${GENERAL_URL}/claims_for_mobile`, {
      params: { user_id: id },
    });
    const { success } = response.data;
    if (success) {
      const { claims } = response.data;
      return claims;
    }
  } catch (error) {
    console.log("error: ", error);
  }
};
