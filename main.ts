import express from "npm:express@4.18.2"
import {Request, Response} from "npm:express@4.18.2"
const miapp = express();

miapp.use(express.json());

miapp.get("/a", (req: Request, res: Response) => {
  res.send("Hola")
})

miapp.listen(3000);