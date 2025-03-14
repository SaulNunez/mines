export function generateRandomPairs(x: number, y: number, n: number): [number, number][] {
    const pairs: [number, number][] = [];
    
    for (let i = 0; i < n; i++) {
        const randomX = Math.floor(Math.random() * x);
        const randomY = Math.floor(Math.random() * y);
        pairs.push([randomX, randomY]);
    }
    
    return pairs;
}


export function getSurroundingPairs(x: number, y: number, maxX: number, maxY: number): [number, number][] {
    const directions = [
        [-1, -1], [0, -1], [1, -1],
        [-1, 0],          [1, 0],
        [-1, 1], [0, 1], [1, 1]
    ];
    
    const result: [number, number][] = [];
    
    for (const [dx, dy] of directions) {
        const newX = x + dx;
        const newY = y + dy;
        
        if (newX >= 0 && newX <= maxX && newY >= 0 && newY <= maxY) {
            result.push([newX, newY]);
        }
    }
    
    return result;
}