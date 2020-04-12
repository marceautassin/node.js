const exercise = require('../exercise1');

describe('fizzbuzz', () => {
  it('Should return the same number if it is not divisible by 3 or 5', () => {
    const result = exercise.fizzBuzz(2);
    expect(result).toBe(2);
  });
  it('Input must be a number', () => {
    const args = ['a', null, NaN, 0, undefined,false];
    args.forEach(a => {
      expect(() => {exercise.fizzBuzz(a).toThrow()});
    })
  });
  it('Fizzbuzz is divisible by 3 and 5', () => {
    const result = exercise.fizzBuzz(15);
    expect(result).toBe('FizzBuzz');
  });
  it('Fizz is divisible by 3', () => {
    const result = exercise.fizzBuzz(6);
    expect(result).toBe('Fizz');
  });
  it('Buzz is divisible by 5', () => {
    const result = exercise.fizzBuzz(10);
    expect(result).toBe('Buzz');
  });
});
