import { ApolloServer, gql } from 'apollo-server';

const typeDefs = gql`
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

interface Order {
  id: string;
  sequence: number;
  orderNumber: string;
  client: string;
  manager: string;
}

let orders: Order[] = [
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
    addOrder: (_: any, { sequence, orderNumber, client, manager }: { sequence: number, orderNumber: string, client: string, manager: string }) => {
      const newOrder: Order = {
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

const server = new ApolloServer({ typeDefs, resolvers });

server.listen().then(({ url }) => {
  console.log(`🚀 Сервер запущен по адресу: ${url}`);
});
