"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
exports.schema = void 0;
var schema_1 = require("@graphql-tools/schema");
var typeDefs = "\ntype Mutation {\n  signupUser(data: UserCreateInput!): User!\n}\ntype Query {\n  allUsers: [User!]!\n}\ntype User {\n  email: String!\n  id: String!\n  name: String\n}\ninput UserCreateInput {\n  email: String!\n  name: String\n}\n";
var resolvers = {
    Query: {
        allUsers: function (_parent, _args, context) { return __awaiter(void 0, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, context.prisma.user.findMany()];
                    case 1: 
                    // await context.prisma.$connect();
                    return [2 /*return*/, _a.sent()];
                }
            });
        }); }
    },
    Mutation: {
        signupUser: function (_parent, args, context) {
            try {
                // context.prisma.$connect();
                var data = context.prisma.user.create({
                    data: {
                        name: args.data.name,
                        email: args.data.email
                    }
                });
                // data.then((d)=>{
                //   console.log(d);  
                // })
                return data;
            }
            catch (error) {
                console.log(error);
            }
        }
    }
};
exports.schema = (0, schema_1.makeExecutableSchema)({
    resolvers: resolvers,
    typeDefs: typeDefs
});
// generator client {
//   provider        = "prisma-client-js"
//   previewFeatures = ["mongoDb"]
// }
// datasource db {
//   provider = "mongodb"
//   url      = "mongodb://127.0.0.1:27017/testdb"
// }
// model User {
//     id  String  @id @default(dbgenerated()) @map("_id") @db.ObjectId
//   email String  @unique
//   name  String?
// }
