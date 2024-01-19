import express from "npm:express@4.18.2"
import {Request, Response} from "npm:express@4.18.2"
import mongoose from "npm:mongoose@7.6.3"
import {load} from "https://deno.land/std@0.204.0/dotenv/mod.ts";
import {ApolloServer} from "npm:@apollo/server@4.9.5"
import {startStandaloneServer} from "npm:@apollo/server@4.9.5/standalone"
import { graphSchema } from './GraphQL/graphSchema.ts';
import { Query } from './GraphQL/Query.ts';
import { Mutation } from './GraphQL/Mutation.ts';
import { Contacto } from './GraphQL/ContactoGraph.ts';

const env = await load();

await mongoose.connect(env.MONGO_URL || Deno.env.get("MONGO_URL") || "");
console.log(`Mongo conectado`)



const server = new ApolloServer({
  typeDefs: graphSchema,
  resolvers: {
    Query,
    Mutation,
    Contacto
  }
})

const {url} = await startStandaloneServer(server, {
  listen:{
    port: 3000
  }
})

console.log(`Servidor listo en ${url}`);