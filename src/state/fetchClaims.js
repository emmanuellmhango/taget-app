import axios from "axios";
import { GENERAL_URL } from "./url";

export const fetchClaims = async (id) => {
  const allClaims = [];
  try {
    const response = await axios.get(`${GENERAL_URL}/claims_for_mobile`, {
      params: { user_id: id },
    });
    const { success, claims } = response.data;
    claims.forEach((claim) => {
      let { location } = claim;
      location = JSON.parse(location);
      allClaims.push({ ...claim, location });
    });
    //console.log(allClaims);
    return success ? claims : null;
  } catch (error) {
    console.log(error);
  }
};
