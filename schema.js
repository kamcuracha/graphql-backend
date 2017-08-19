const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLInt,
    GraphQLSchema,
    GraphQLList,
    GraphQLNonNull
} = require('graphql');

const customers = [
    {id: '1', name: 'John Doe', email: 'johndoe@yahoo.com', age: 15},
    {id: '2', name: 'Jane Doe', email: 'janedoe@yahoo.com', age: 18},
    {id: '3', name: 'Bob Dylan', email: 'bobbie@yahoo.com', age: 40},
    {id: '4', name: 'Joe Romano', email: 'jromano@yahoo.com', age: 39},
];

const CustomerType = new GraphQLObjectType({
    name: 'Customer',
    fields: () => ({
        id: {type: GraphQLString},
        name: {type: GraphQLString},
        email: {type: GraphQLString},
        age: {type: GraphQLInt},
    }),
});

const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        customer: {
            type: CustomerType,
            args: {
                id: {type: GraphQLString}
            },
            resolve(parentValue, args) {
                for(let i = 0; i < customers.length; i++) {
                    if(customers[i].id == args.id) {
                        return customers[i];
                    }
                }
            }
        }
    }
});

module.exports = new GraphQLSchema({
    query: RootQuery
});