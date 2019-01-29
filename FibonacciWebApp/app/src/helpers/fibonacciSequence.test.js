import { fibonacciSequence } from './fibonacciSequence';

describe('For valid fibonacci number',
    () => {
        const indexes = {
            0: 1,
            1: 3,
            2: 4,
            3: 5,
            5: 6,
            8: 7,
            13: 8,
            21: 9,
            34: 10,
            55: 11,
            2584: 19,
            121393: 27,
            12586269025: 51
        };

        Object.keys(indexes).forEach(number => {
            var expectedIndex = indexes[number];
            it(number + ' produces the correct index ' + expectedIndex,
                () => {
                    expect(fibonacciSequence.getSequenceIndex(number)).toBe(expectedIndex);
                });
        });
    });

describe('For invalid fibonacci number', () => {
    const numbers = [4, 7, 15, 30, 54, 56, 121392];

    numbers.forEach(number => {
        it(number + ' produces undefined',
            () => {
                expect(fibonacciSequence.getSequenceIndex(number)).toBe(undefined);
            });
    });
});