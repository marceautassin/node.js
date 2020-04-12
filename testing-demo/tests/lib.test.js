const lib = require('../lib');
const db = require('../db');

describe('absolute', () => {
  it('should return a positive number if input is positive', () => {
    const result = lib.absolute(1);
    expect(result).toBe(1);
  });

  it('should return a positive number if input is negative', () => {
    const result = lib.absolute(-1);
    expect(result).toBe(1);
  });

  it('should return 0 if input is 0', () => {
    const result = lib.absolute(0);
    expect(result).toBe(0);
  });
});

describe('greet', () => {
  it('should return the greeting message', () => {
    const result = lib.greet('Marceau');
    expect(result).toMatch(/Marceau/);
    expect(result).toContain('Marceau');
  });
});

describe('getCurrencies', () => {
  it('should return supported currencies', () => {
    const result = lib.getCurrencies();
    expect(result).toEqual(expect.arrayContaining(['EUR', 'USD', 'AUD']));
  });
});

describe('getProduct', () => {
  it('should return the product with the given id', () => {
    const result = lib.getProduct(1);
    // expect(result).toEqual({id: 1, price: 10}); // toEqual au lieu de toBe car la localisation n'est pas la meme dans la mémoire
    expect(result).toMatchObject({
      id: 1,
      price: 10
    }); // ne test pas l'intégralité de l'objet source
    expect(result).toHaveProperty('id', 1); //test une propriété seulement
  });
});

describe('registerUSer', () => {
  it('Shoudl throw if username is falsy', () => {
    // Null
    //undefined
    //NaN
    //''
    //0
    //false
    const args = [null, undefined, NaN, '', 0, false];
    args.forEach(a => {
      expect(() => {
        lib.registerUser(a).toThrow();
      });
    });
  });

  it('Should return a user objectif valid username is passed', () => {
    const result = lib.registerUser('marcito');
    expect(result).toMatchObject({username: 'marcito'});
    expect(result.id).toBeGreaterThan(0); // on test juste si l'id est sup à 0
  });
});


describe('applyDiscount', () => {
it('Should apply discount to the user bill', () => {
  db.getCustomerSync = function(customerId) {
    console.log('fake user reading...')
    return {id: customerId, points: 20}
  };

  const order = {customerId: 1, totalPrice: 10};
  lib.applyDiscount(order);
  expect(order.totalPrice).toBe(9);
});
});
