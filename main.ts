import express from "npm:express@4.18.2"
import {Request, Response} from "npm:express@4.18.2"
import mongoose from "npm:mongoose@7.6.3"
import {load} from "https://deno.land/std@0.204.0/dotenv/mod.ts";
import {ApolloServer} from "npm:@apollo/server@4.9.5"
import {startStandaloneServer} from "npm:@apollo/server@4.9.5/standalone"

const env = await load();

const miapp = express();

miapp.use(express.json());

miapp
  .get("/a", (req: Request, res: Response) => {
    res.send("Holaaaa")
  })
  .get("/b", (req: Request, res: Response) => {
    res.send("Adioooss, tranquilo que el deploy funciona")
  })

miapp.listen(3000);