"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const apollo_server_1 = require("apollo-server");
const typeDefs = (0, apollo_server_1.gql) `
  type Order {
    id: ID!
    sequence: Int
    orderNumber: String
    client: String
    manager: String
  }

  type Query {
    orders: [Order]
  }

  type Mutation {
    addOrder(sequence: Int, orderNumber: String, client: String, manager: String): Order
  }
`;
let orders = [
    {
        id: '1',
        sequence: 1,
        orderNumber: '001',
        client: 'Иван Иванов',
        manager: 'Иван Иванов',
    },
    {
        id: '2',
        sequence: 2,
        orderNumber: '002',
        client: 'Иван Иванов',
        manager: 'Иван Иванов',
    },
];
const resolvers = {
    Query: {
        orders: () => orders,
    },
    Mutation: {
        addOrder: (_, { sequence, orderNumber, client, manager }) => {
            const newOrder = {
                id: String(orders.length + 1),
                sequence,
                orderNumber,
                client,
                manager,
            };
            orders.push(newOrder);
            return newOrder;
        },
    },
};
const server = new apollo_server_1.ApolloServer({ typeDefs, resolvers });
server.listen().then(({ url }) => {
    console.log(`🚀 Сервер запущен по адресу: ${url}`);
});
