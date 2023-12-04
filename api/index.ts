import cookieParser from "cookie-parser";
import express, { Express, NextFunction, Request, Response } from "express";
import createError from "http-errors";
import logger from "morgan";
import path from "path";

import passport from "passport";

import { AppDataSource } from "../data-source";
import indexRouter from "../routes/index";
import categoryRouter from "../routes/category/router";
import customerRouter from "../routes/customer/router";
import employeeRouter from "../routes/employee/router";
import suppliersRouter from "../routes/supplier/router";
import productsRouter from "../routes/product/router";
import ordersRouter from "../routes/order/router";
import loginRouter from "../routes/login/router";
import cartRouter from "../routes/cart/router";
const {
  passportVerifyAccount,
  passportVerifyToken,
} = require("./middlewares/passport");

function ignoreFavicon(req: any, res: any, next: any) {
  if (req.originalUrl.includes('favicon.ico')) {
    res.status(204).end()
  }
  next();
}


const cors = require("cors");

const app: Express = express();
//ADD CORS
app.use(
  cors({
    origin: "*",
  })
);

app.use(ignoreFavicon);

AppDataSource.initialize().then(async () => {
  console.log("Data source initialized");

  app.use(logger("dev"));
  app.use(express.json());
  app.use(express.urlencoded({ extended: false }));
  app.use(cookieParser());
  app.use(express.static(path.join(__dirname, "public")));

  passport.use(passportVerifyAccount);
  passport.use(passportVerifyToken);

  app.use("/", indexRouter);
  app.use("/categories", categoryRouter);
  app.use(
    "/products",
    // passport.authenticate("jwt", { session: false }),
    productsRouter
  );
  app.use("/suppliers", suppliersRouter);
  app.use("/customers", customerRouter);
  app.use("/employees", employeeRouter);
  app.use("/orders", ordersRouter);
  app.use("/login", loginRouter);

  app.use("/cart", cartRouter);

  // catch 404 and forward to error handler
  app.use(function (req, res, next) {
    res.status(404).send("Not found");
    // next(createError(404));
  });

  // error handler
  app.use((err: any, req: Request, res: Response, next: NextFunction) => {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get("env") === "development" ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render("error");
  });

  app.use(express.static('public'))
});

export default app;
