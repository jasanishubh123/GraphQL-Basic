"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var express_1 = __importDefault(require("express"));
var express_graphql_1 = require("express-graphql");
var context_1 = require("./context");
var schema_1 = require("./schema");
var app = (0, express_1["default"])();
app.use('/graphql', (0, express_graphql_1.graphqlHTTP)({
    schema: schema_1.schema,
    context: context_1.context,
    graphiql: true
}));
app.listen(4000, function () {
    console.log("🚀 Server ready at: http://localhost:4000/graphql");
});
