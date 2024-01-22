interface Word{
    word: string,
    type: string|null,
    description: string|null,
    ukSound: string|null,
    usSound: string|null,
    synonyms: string|null,
}

interface WordsQueue{
    status: string,
    word: string,
    oxford: Word,
    cambridge: Word,
    selected: Word
}

export type {Word,WordsQueue};