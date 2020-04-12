import { expect } from 'chai';
import { generateCatName } from './utils';
import 'mocha';

describe('function generateCatName()', () => {
    const catName = generateCatName();
    const parts = catName.split(' ');

    it('is trimmed', () => {
        expect(catName.length).to.equal(catName.trim().length);
    });
    it('is not empty', () => {
        expect(catName).to.not.equal('');
    });
    it('consists of 3 words', () => {
        expect(catName.split(' ').length).to.equal(3);
    });
    it('words are unique', () => {
        expect([...new Set(parts)].length).to.equal(3);
    });
});
