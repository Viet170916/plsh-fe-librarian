import {Shelf} from "@/app/(private)/(in-dash-board)/resources/library-room/RoomMap";
import appStrings from "@/helpers/appStrings";

export const generateUniqueId = (existingIds: Set<number>): number => {
    let newId;
    do {
        newId = Math.floor(100000 + Math.random() * 900000); // Tạo số ngẫu nhiên 6 chữ số
    } while (existingIds.has(newId));
    return newId;
};


export const generateNewShelf = (existingShelves: Shelf[], maxX: number, maxY: number): Shelf | null => {
    const existingIds = new Set(existingShelves.map((shelf) => shelf.id));
    const occupiedPositions = new Set(existingShelves.map((shelf) => `${shelf.x},${shelf.y}`));

    for (let attempt = 0; attempt < 100; attempt++) {
        const x = Math.floor(Math.random() * (maxX + 1));
        const y = Math.floor(Math.random() * (maxY + 1));
        if (!occupiedPositions.has(`${x},${y}`)) {
            return {
                id: generateUniqueId(existingIds),
                name: `${appStrings.shelf.NEW_SHELF} ${existingShelves.length + 1}`,
                label: appStrings.shelf.UN_LABEL,
                column: String.fromCharCode(65 + (x % 26)),
                row: `${y + 1}`,
                rowShelves:[],
                x,
                y,
            };
        }
    }

    return null; // Không tìm được vị trí hợp lệ sau 100 lần thử
};

