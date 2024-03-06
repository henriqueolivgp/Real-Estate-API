import fastify, { FastifyInstance, FastifyListenOptions } from 'fastify';
import dotenv from 'dotenv';

dotenv.config();

const PORT = parseInt(process.env.PORT_SERVER || '3000');
const HOST = process.env.HOST_SERVER || '127.0.0.1';

const app: FastifyInstance = fastify();

const options: FastifyListenOptions = {
    port: PORT,
    host: HOST,
    // Other options...
};

app.get('/', async (req, res) => {
  return 'Welcome Api';
});

const start = async () => {
  try {
    app.listen(options, (err, address) => {
      if (err) {
          console.error(err);
          process.exit(1);
      }
      console.log(`Server is running on ${address}`);
  });
  } catch (err) {
    console.error('Error starting server:', err);
    process.exit(1);
  }
};

start();
