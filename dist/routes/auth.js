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
const express_1 = __importDefault(require("express"));
const data_source_1 = require("../data-source");
const user_entitty_1 = require("../entities/user.entitty");
// router.post('/register',AuthController.register);
const router = express_1.default.Router();
const repository = data_source_1.AppDataSource.getRepository(user_entitty_1.User);
router.post('/register', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    let user = new user_entitty_1.User();
    user.email = email;
    user.password = user.setPassword(password);
    try {
        yield repository.save(user);
    }
    catch (error) {
        res.status(404).send("User already exists");
        return;
    }
    res.status(200).send("User Created");
}));
exports.default = router;
// router.post('/login',AuthController.login);
