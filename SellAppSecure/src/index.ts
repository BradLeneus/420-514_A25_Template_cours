import express, { Request, Response } from 'express';
import https from 'https';
import http from 'http';
import fs from 'fs';
import path from 'path';
import app from './app';


const httpsPort: number = Number(process.env.HTTPS_PORT) || 3000;
const httpPort: number = Number(process.env.HTTP_PORT) || 80;
// Charger le certificat et la clé
const options: { key: Buffer; cert: Buffer } = {
  key: fs.readFileSync(path.join(__dirname, 'key.pem')),
  cert: fs.readFileSync(path.join(__dirname, 'cert.pem'))
};

// Middleware JSON
app.use(express.json());

// Route simple pour tester
app.get('/', (req: Request, res: Response): void => {
  res.send('Connexion HTTPS sécurisée');
});

// Créer le serveur HTTPS
https.createServer(options, app).listen(httpsPort, (): void => {
  console.log(`Serveur HTTPS en écoute sur <https://localhost>:${httpsPort}`);
});

// Créer le serveur HTTP qui redirige vers HTTPS
http.createServer((req, res) => {
  res.writeHead(301, { "Location": `https://localhost:${httpsPort}${req.url}` });
  res.end();
}).listen(httpPort, () => {
  console.log(`Serveur HTTP en écoute sur <http://localhost>:${httpPort}`);
});