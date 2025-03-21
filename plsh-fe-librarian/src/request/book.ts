import { BookData } from "@/helpers/appType";
import axios from "axios";

axios.defaults.headers.common["Authorization"] = `Bearer ${ 1 }`;
axios.defaults.baseURL = process.env.NEXT_PUBLIC_SERVER_API_URL ?? "https://book-hive-api.space/api/v1";
export async function getBooks( id: number ){
  return await axios.get<BookData>( `/book/${ id }` );
}
