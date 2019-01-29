import { fibonacciSequence } from './fibonacciSequence';

describe('For valid fibonacci number',
    () => {
        const indexes = {
            1: 2,
            2: 3,
            3: 4,
            5: 5,
            8: 6,
            13: 7,
            21: 8,
            34: 9,
            55: 10,
            2584: 18,
            121393: 26,
            12586269025: 50
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