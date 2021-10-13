
/**
 * The state of a current Problem being displayed in a Game
 */
export class ProblemState {
  currentProblem: MultipleChoiceProblem;
  result: 'Correct' | 'Incorrect' | 'Unanswered' =
    'Unanswered';

  /**
   * Creates a new ProblemState with the given Problem, with an inital result of Unanswered
   */
  constructor(currentProblem: MultipleChoiceProblem) {
      this.currentProblem = currentProblem;
  }
}

/**
 * A vocabulary word that can be studied, including Gaelic form and English definition
 */
export class Word {
  gaelic: string;
  english: string;

  /**
   * Creates a Word with the given Gaelic and English forms
   */
  constructor(gaelic: string, english: string) {
      this.gaelic = gaelic;
      this.english = english;
  }
}

/**
 * A multiple choice problem that the user can be prompted with
 */
export class MultipleChoiceProblem {
  prompt: string;
  answer: string;
  options: string[];

  /**
   * Creates a MultipleChoiceProblem with the given options
   */
  constructor(prompt: string, answer: string, options: string[]) {
      this.prompt = prompt;
      this.answer = answer;
      this.options = options;
  }
};
