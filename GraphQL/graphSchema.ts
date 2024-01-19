export const graphSchema = `#graphql
    type Contacto {
        nombre: String!
        telefono: String!
        pais: String!
        hora: String
        _id: String!
    }

    type Query {
        getContact(id: ID!): Contacto
        getContacts: [Contacto]!
    }

    type Mutation {
        addContact(nombre: String!, telefono: String!): Contacto! 
        updateContact(id: ID!, nombre: String, telefono: String): Contacto!
        deleteContact(id: ID!): Boolean!
    }

`; 