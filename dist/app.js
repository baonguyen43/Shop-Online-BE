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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const express_1 = __importDefault(require("express"));
const morgan_1 = __importDefault(require("morgan"));
const path_1 = __importDefault(require("path"));
const passport_1 = __importDefault(require("passport"));
const data_source_1 = require("./data-source");
const index_1 = __importDefault(require("./routes/index"));
const router_1 = __importDefault(require("./routes/category/router"));
const router_2 = __importDefault(require("./routes/customer/router"));
const router_3 = __importDefault(require("./routes/employee/router"));
const router_4 = __importDefault(require("./routes/supplier/router"));
const router_5 = __importDefault(require("./routes/product/router"));
const router_6 = __importDefault(require("./routes/order/router"));
const router_7 = __importDefault(require("./routes/login/router"));
const router_8 = __importDefault(require("./routes/cart/router"));
const { passportVerifyAccount, passportVerifyToken, } = require("./middlewares/passport");
const cors = require("cors");
const app = (0, express_1.default)();
//ADD CORS
app.use(cors({
    origin: "*",
}));
data_source_1.AppDataSource.initialize().then(() => __awaiter(void 0, void 0, void 0, function* () {
    console.log("Data source initialized");
    app.use((0, morgan_1.default)("dev"));
    app.use(express_1.default.json());
    app.use(express_1.default.urlencoded({ extended: false }));
    app.use((0, cookie_parser_1.default)());
    app.use(express_1.default.static(path_1.default.join(__dirname, "public")));
    passport_1.default.use(passportVerifyAccount);
    passport_1.default.use(passportVerifyToken);
    app.use("/", index_1.default);
    app.use("/categories", router_1.default);
    app.use("/products", 
    // passport.authenticate("jwt", { session: false }),
    router_5.default);
    app.use("/suppliers", router_4.default);
    app.use("/customers", router_2.default);
    app.use("/employees", router_3.default);
    app.use("/orders", router_6.default);
    app.use("/login", router_7.default);
    app.use("/cart", router_8.default);
    // catch 404 and forward to error handler
    app.use(function (req, res, next) {
        res.status(404).send("Not found");
        // next(createError(404));
    });
    // error handler
    app.use((err, req, res, next) => {
        // set locals, only providing error in development
        res.locals.message = err.message;
        res.locals.error = req.app.get("env") === "development" ? err : {};
        // render the error page
        res.status(err.status || 500);
        res.render("error");
    });
}));
exports.default = app;
