import {
  registerDecorator,
  ValidationOptions,
  ValidationArguments,
} from "class-validator";

export function IsContentNotSetForCollection(
  validationOptions?: ValidationOptions,
) {
  return function (object: any, propertyName: string) {
    registerDecorator({
      name: "IsContentNotSetForCollection",
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      validator: {
        validate(value: any, args: ValidationArguments) {
          const type = (args.object as any).type;
          if (type == "collection" && value) {
            return false;
          }
          return true;
        },
        defaultMessage() {
          return 'Content cannot be set for type "collection"';
        },
      },
    });
  };
}
