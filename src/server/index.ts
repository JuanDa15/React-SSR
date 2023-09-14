import express, { Express, Request, Response } from "express";
import { CONFIG } from "./config"
import { render } from "./render";

const app: Express = express();

app.get('*', (req: Request, res: Response) => {
  res.send(render(req.url));
})


app.listen(CONFIG.PORT, () => {
  console.log('Server started in port:' + CONFIG.PORT);
})