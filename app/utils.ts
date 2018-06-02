export function loop(times, cb) {
    for (let i = 0; i < times; i++) {
        cb(i);
    }
}

export function shuffleArray(array) {
    loop(array.length, i => {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    });
}
