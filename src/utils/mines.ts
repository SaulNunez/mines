export function generateRandomPairs(x: number, y: number, n: number): [number, number][] {
    const pairs: [number, number][] = [];
    
    for (let i = 0; i < n; i++) {
        const randomX = Math.floor(Math.random() * x);
        const randomY = Math.floor(Math.random() * y);
        pairs.push([randomX, randomY]);
    }
    
    return pairs;
}