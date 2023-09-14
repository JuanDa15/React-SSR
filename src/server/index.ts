import express, { Express, Request, Response } from "express";
import { CONFIG } from "./config"
import { render } from "./render";
import { webpackMiddleware } from "./middlewares/webpackMiddleware";

const app: Express = express();

const isDev = process.env.NODE_ENV !=='production'

if(isDev){
  app.use(webpackMiddleware())
} else{
  app.use(express.static('dist'))
}

app.get('/galaxias', async (req: Request, res: Response) => {
  try {
    const galaxias = await fetch('https://images-api.nasa.gov/search?q=galaxies')
    const data = await galaxias.json()
    const initialProps = {
      galaxies: data.collection.items
    }

    return res.send(render(req.url, initialProps))
  } catch (error) {
    throw new Error("An error occurred fetching galaxies")
  }
})
app.get('*', (req: Request, res: Response) => {
  res.send(render(req.url));
})



app.listen(CONFIG.PORT, () => {
  console.log('Server started in port:' + CONFIG.PORT);
})