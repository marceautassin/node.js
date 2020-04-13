const {Rental} = require ('../../models/rental');
const {User} = require ('../../models/user');
const mongoose = require('mongoose');
const request = require('supertest');

describe('POST /returns', () => {
  let server;
  let customerId;
  let movieId;
  let rental;

    beforeEach(async () => {
      server = require('../../index');
      customerId = mongoose.Types.ObjectId();
      movieId = mongoose.Types.ObjectId();
      token = new User().generateAuthToken();

      rental = new Rental({
        customer: {
          _id: customerId,
          name: '12345',
          phone: '12345'
        },
        movie: {
          _id: movieId,
          title: '12345',
          dailyRentalRate: 2
        }
      });
      await rental.save();
    });

    afterEach(async () => {
      await Rental.remove({});
      await server.close();
    });

    it('should work', async () => {
      const result = await Rental.findById(rental._id);
      expect(result).not.toBeNull();
  });

    it('should return 401 if client is not logged in', async () => {
      const res = await request(server)
        .post('/api/returns')
        .send({
          customerId,
          movieId
        });

      expect(res.status).toBe(401);
    });
});
