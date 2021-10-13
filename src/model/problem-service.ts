import {MultipleChoiceProblem, Word} from './models';
import {pickDistinct, shuffle} from './random-util';

const vocabulary = [
    new Word('glasraich', 'vegetables'),
    new Word('ìm', 'butter'),
    new Word('aran', 'bread'),
    new Word('ugh', 'egg'),
    new Word('bainne', 'milk'),
    new Word('feòil', 'meat'),
    new Word('buntàta', 'potato'),
    new Word('iasg', 'fish'),
    new Word('silidh', 'jam'),
    new Word('ceapairean', 'sandwiches'),
    new Word('sùgh', 'juice'),
    new Word('isbeanan', 'sausages'),
    new Word('ubhal', 'apple'),
    new Word('cèic', 'cake'),
    new Word('càise', 'cheese'),
    new Word('briosgaid', 'biscuit'),
    new Word('mìlsean', 'sweets'),
    new Word('siùcar', 'sugar'),
    new Word('uachdar', 'cream'),
    new Word('rus', 'rice'),
];

/**
 * Generates a simple MultipleChoiceProblem to match a word and its definition
 *
 * This will generate a Gaelic-English or English-Gaelic problem at random
 */
export function generateWordMatchProblem(): MultipleChoiceProblem {
    const options = pickDistinct(vocabulary, 3);
    const answer = options[0];

    const isGaelicPrompt = Math.random() > .5;

    return new MultipleChoiceProblem(
        isGaelicPrompt ? answer.gaelic : answer.english,
        isGaelicPrompt ? answer.english : answer.gaelic,
        shuffle(options).map((word) => isGaelicPrompt ? word.english : word.gaelic),
    );
}
