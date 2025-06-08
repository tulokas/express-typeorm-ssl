import { DataSource } from 'typeorm';
import * as fs from 'fs';
import * as dotenv from 'dotenv';
dotenv.config();

export const AppDataSource = new DataSource({
  type: 'mysql',
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT || '3306'),
  username: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  entities: [__dirname + '/entity/*.ts'],
  synchronize: false,
  ssl: {
    ca: fs.readFileSync('/certs/ca.pem', 'utf8'),
    cert: fs.existsSync('/certs/client-cert.pem') ? fs.readFileSync('/certs/client-cert.pem', 'utf8') : undefined,
    key: fs.existsSync('/certs/client-key.pem') ? fs.readFileSync('/certs/client-key.pem', 'utf8') : undefined
  }
});
