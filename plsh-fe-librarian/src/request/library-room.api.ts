import axios, {AxiosResponse} from "axios";
import {LibraryRoomState} from "@/stores/slices/lib-room-state/lib-room.slice";
import {ShelfState} from "@/stores/slices/lib-room-state/shelf.slice";

axios.defaults.headers.common["Authorization"] = `Bearer ${1}`;
axios.defaults.baseURL = process.env.NEXT_PUBLIC_SERVER_API_URL;

export async function apiIsShelfExisted({shelfId}: { shelfId: number }): Promise<AxiosResponse<{ exists: boolean }>> {
    return await axios.get(`/library-room/shelf/check`, {
        params: {id: shelfId}
    });

}

export async function apiGetShelf({id}: { id: number }): Promise<AxiosResponse<ShelfState>> {
    return await axios.get<ShelfState>(`/library-room/shelf/${id}`);

}

export async function apiGetLibraryRoom() {
    console.log(axios.defaults.baseURL)
    const response = await axios.get<LibraryRoomState>(`/library-room`);
    console.log(response.data);
    return response;
}