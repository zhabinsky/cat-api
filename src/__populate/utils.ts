import getRandomWord from './getRandomWord';

const generateCatName = () => {
    return ['CAT_NATIONALITY', 'CAT_ADJECTIVES', 'CAT_NICKNAME']
        .map(getRandomWord)
        .join(' ');
};

export { generateCatName };
