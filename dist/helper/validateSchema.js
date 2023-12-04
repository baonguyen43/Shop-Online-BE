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
Object.defineProperty(exports, "__esModule", { value: true });
const validateSchema = (schema) => (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    // thực thi việc xác thực
    try {
        yield schema.validate({
            body: req.body,
            query: req.query,
            params: req.params,
        }, {
            abortEarly: false,
        });
        return next();
    }
    catch (error) {
        console.log("««««« err »»»»»", error);
        return res
            .status(400)
            .json({ type: error.name, error: 'Không thành công', provider: "YUP" });
    }
});
module.exports = { validateSchema };
