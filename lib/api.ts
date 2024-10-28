import axios from "axios";
import { NEXT_PUBLIC_GOOGLE_FORM_URL } from "./config";

export const submitWaitlist = async (email: string) => {
  const response = await axios.post(
    NEXT_PUBLIC_GOOGLE_FORM_URL
  );
  return response.data;
};
