"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const cors_1 = __importDefault(require("cors"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const PORT = process.env.PORT;
app.use((0, cors_1.default)({
    origin: [
        "http://localhost:3000",
        "localhost:3000"
    ],
    methods: ["GET", "POST", "PUT", "DELETE", "UPDATE"]
}));
app.get("/", (res, req) => {
    res.send("Home Page");
});
app.listen(PORT, () => {
    console.log(`Server Running Successfully On PORT : `, PORT);
    console.log("Yess!! completed");
});
