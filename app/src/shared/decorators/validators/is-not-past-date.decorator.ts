import {
  registerDecorator,
  ValidationOptions,
  ValidationArguments,
} from 'class-validator';

export function IsNotPastDate(validationOptions?: ValidationOptions) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      name: 'isNotPastDate',
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      validator: {
        validate(value: number, args: ValidationArguments) {
          if (typeof value !== 'number') return false;
          const currentTimestamp = Math.floor(Date.now() / 1000);
          return value >= currentTimestamp;
        },
        defaultMessage(args: ValidationArguments) {
          return `${args.property} must be a Unix timestamp not in the past`;
        },
      },
    });
  };
}
