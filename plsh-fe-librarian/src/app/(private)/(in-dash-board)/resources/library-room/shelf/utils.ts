export const generateUniqueId = (existingIds: Set<number>) => {
    let id;
    do {
        id = Math.floor(1000000000 + Math.random() * 9000000000);
    } while (existingIds.has(id));
    return id;
};

export const generateUniquePosition = (existingPositions: Set<number>, maxPosition: number) => {
    let position;
    do {
        position = Math.floor(Math.random() * (maxPosition + 1));
    } while (existingPositions.has(position));
    return position;
};
