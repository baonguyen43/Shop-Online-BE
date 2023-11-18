import { ValidatorConstraint, ValidatorConstraintInterface, ValidationArguments } from "class-validator";
import { ObjectId } from "typeorm";

@ValidatorConstraint({ name: "ObjectId", async: false })
export class ObjectIdValidator implements ValidatorConstraintInterface {
  validate(value: any, args: ValidationArguments) {
    return ObjectId.isValid(value);
  }

  defaultMessage(args: ValidationArguments) {
    return `${args.property} không phải kiểu ObjectID`;
  }
}