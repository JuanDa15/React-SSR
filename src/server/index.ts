import express, { Express, Request, Response } from "express";
import { CONFIG } from "./config"

const app: Express = express();

app.get('*', (req: Request, res: Response) => {
  res.send(`<h1>Hello world in route: ${req.url}</h1>`);
})


app.listen(CONFIG.PORT, () => {
  console.log('Server started in port:' + CONFIG.PORT);
})