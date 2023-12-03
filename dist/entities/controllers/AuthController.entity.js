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
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
const class_validator_1 = require("class-validator");
const data_source_1 = require("../../data-source");
const user_entitty_1 = require("./../user.entitty");
class AuthController {
}
_a = AuthController;
// REGISTER
AuthController.register = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    let user = new user_entitty_1.User();
    user.email = email;
    user.password = user.setPassword(password);
    const errors = yield (0, class_validator_1.validate)(user);
    if (errors.length > 0) {
        res.status(400).send(errors);
        return;
    }
    const useRepository = data_source_1.AppDataSource.getRepository(user_entitty_1.User);
    try {
        yield useRepository.save(user);
    }
    catch (error) {
        res.status(400).send("User already exists");
        return;
    }
    res.status(200).send("User Created");
});
// LOGIN
AuthController.login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    if (!(email && password)) {
        res.status(400).send();
    }
    const userRepository = data_source_1.AppDataSource.getRepository(user_entitty_1.User);
    try {
        const user = yield userRepository.findOne({ where: { email: email } });
        if (!user || !user.isValidPassword(password)) {
            res.status(401).send("Incorrect Password ");
            return;
        }
        res.status(200).json({ access_token: user.generateJWT() });
    }
    catch (error) {
        res.status(401).send(error);
    }
});
exports.default = AuthController;
