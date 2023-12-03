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
exports.passportVerifyToken = exports.passportVerifyAccount = void 0;
// const BasicStrategy = require("passport-http").BasicStrategy;
const { Strategy: LocalStrategy } = require("passport-local");
const { ExtractJwt, Strategy: JwtStrategy } = require('passport-jwt');
const jwtSetting_1 = __importDefault(require("../constant/jwtSetting"));
const customer_entity_1 = require("../entities/customer.entity");
const passportVerifyAccount = new LocalStrategy({ usernameField: 'email' }, function (email, password, done) {
    return __awaiter(this, void 0, void 0, function* () {
        //check username password ko cần check trong login nưa
        try {
            const user = yield customer_entity_1.Customer.findOne({ where: { email } });
            if (!user)
                return done(null, false);
            const isCorrectPass = yield user.isValidPass(password);
            if (!isCorrectPass)
                return done(null, false);
            return done(null, user);
        }
        catch (error) {
            done(error, false);
        }
    });
});
exports.passportVerifyAccount = passportVerifyAccount;
const passportVerifyToken = new JwtStrategy({
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken("Authorization"),
    secretOrKey: jwtSetting_1.default,
}, (payload, done) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield customer_entity_1.Customer.findOne({
            where: { id: payload.id },
        });
        if (!user)
            return done(null, false);
        user.password = '';
        return done(null, user);
    }
    catch (error) {
        done(error, false);
    }
}));
exports.passportVerifyToken = passportVerifyToken;
