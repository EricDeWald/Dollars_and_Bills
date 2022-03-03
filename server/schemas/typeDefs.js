const { gql } = require('apollo-server-express');

const typeDefs = gql`
    type User {
        _id: ID
        username: String
        email: String
        password: String
        budgets: [Budget]!
    }

    type Budget {
        _id: ID
        name: String
        amount: INT
        expenses: [Expense]!
    }

    type Expense {
        _id: ID
        name: String
        amount: INT
        description: String
        userId: User
    }

    type Auth {
        token: ID!
        user: User
    }

    type Query {
        users: [User]
        user(username: String!): User
        budgets(username: String): [Budget]
        budget(budgetId: ID!): Budget
    }

    type Mutation {
        addUser(username: String!, email: String!, password: String!): Auth
        login(email: String!, password: String!): Auth
        addBudget(name: String!, amount: INT): Budget
        addExpense(budgetId: ID!, name: String!, description: String!, userId: User): Expense
        removeBudget(budgetId: ID!): Budget
        removeExpense(expenseId: ID!): Expense
    }
`;

module.exports = typeDefs;
