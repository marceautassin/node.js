const lib = require('../lib');
const db = require('../db');
const mail = require('../mail');

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
  db.getCustomerSync = function(customerId) { // replacing function fake or mock function
    console.log('fake user reading...')
    return {id: customerId, points: 20}
  };

  const order = {customerId: 1, totalPrice: 10};
  lib.applyDiscount(order);
  expect(order.totalPrice).toBe(9);
});
});

describe('notifyCustomer', () => {
  it('Should send an email to the customer', () => {
    db.getCustomerSync = jest.fn().mockReturnValue({email: 'a'});
    // db.getCustomerSync = function(customerId) {
    //   return {email: 'a'};
    // };
    mail.send = jest.fn();
    // let mailSent = false;
    // mail.send = function(email, message) {
    //   mailSent = true;
    // };

    lib.notifyCustomer({customerId: 1});

    // expect(mailSent).toBe(true);
    expect(mail.send).toHaveBeenCalled(); //est-ce que la méthode a été appelé // existe aussi en version toHaveBennCalledWith()
    // expect(mail.send).toHaveBeenCalledWith('a', '...');
    expect(mail.send.mock.calls[0][0]).toBe('a');
    expect(mail.send.mock.calls[0][1]).toMatch(/order/);
  });
});
