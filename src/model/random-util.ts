
/**
 * Shuffles an array in-place and returns the array
 */
export function shuffle<ElementType>(array: ElementType[]): ElementType[] {
    // Index indicates the shuffled section of the array
    let currentIndex = array.length;

    // While there remain elements to shuffle
    while (currentIndex != 0) {
        // Pick an unshuffled element from the front
        const randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;

        // Swap the element into the shuffled portion
        [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
    }

    return array;
}

/**
 * Returns one element at random from an array
 *
 * Does not modify the input array
 */
export function pickOne<ElementType>(array: ElementType[]): ElementType {
    return array[Math.floor(Math.random() * array.length)];
}

/**
 * Picks N distinct elements from an array
 */
export function pickDistinct<ElementType>(array: ElementType[], numElements: number): ElementType[] {
    // TODO validate inputs

    const distinctElements: ElementType[] = [];
    for (let n = 0; n < numElements; ++n) {
        while (true) {
            const nextElement: ElementType = pickOne(array);
            if (!distinctElements.includes(nextElement)) {
                distinctElements.push(nextElement);
                break;
            }
        }
    }

    return distinctElements;
}
