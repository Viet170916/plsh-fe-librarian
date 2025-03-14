import axios, {AxiosResponse} from "axios";
import {Shelf} from "@/app/(private)/(in-dash-board)/resources/library-room/RoomMap";

axios.defaults.headers.common["Authorization"] = `Bearer ${1}`;
axios.defaults.baseURL = process.env.NEXT_PUBLIC_SERVER_API_URL;

export async function apiIsShelfExisted({shelfId}: { shelfId: string }) {
    const response: AxiosResponse<Shelf> = await axios.post(`/library-room/shelf/check`, {
        shelfId
    });
    return response;

}