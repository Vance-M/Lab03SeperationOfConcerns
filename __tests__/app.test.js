const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');

jest.mock('twilio', () => () => ({
  messages: {
    create: jest.fn(),
  },
}));

describe('routes for Order Tables', () => {
  beforeEach(() => {
    return setup(pool);
  });


  it('creates a new order in our database and sends a text message', () => {
    return request(app)
      .post('/api/v1/orders')
      .send({ quantity: 10 })
      .then((res) => {
        // expect(createMessage).toHaveBeenCalledTimes(1);
        expect(res.body).toEqual({
          id: '1',
          quantity: 10,
        });
      });
  });


  it('gets all order in table', async () => {
      const res = await request(app)
        .get('/api/v1/orders')
      expect(res.body).toEqual({
        id: '1',
        quantity: 10,
      });
  });

  it('gets a single order by its ID', async () => {
    const res = await request(app)
      .get('/api/v1/orders/1');

    expect(res.body).toEqual({
      id: '1',
      quantity: 10,
    });
  });

  it('creates a new order in our database and sends a text message', () => {
    return request(app)
      .put('/api/v1/orders/1')
      .send({ quantity: 5 })
      .then((res) => {
        // expect(createMessage).toHaveBeenCalledTimes(1);
        expect(res.body).toEqual({
          id: '1',
          quantity: 5,
        });
      });
  });

  it('creates a new order in our database and sends a text message', () => {
    return request(app)
      .delete('/api/v1/orders/1')
      .then((res) => {
        // expect(createMessage).toHaveBeenCalledTimes(1);
        expect(res.body).toEqual({
          id: '1',
          quantity: 10,
        });
      });
  });
});
