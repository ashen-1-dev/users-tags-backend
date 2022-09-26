import {registerDecorator, ValidationArguments, ValidationOptions} from "class-validator";
import {countLowercaseLetters, countUppercaseLetters} from "../helpers";


interface AtLeastValidationOption extends ValidationOptions {
    lowercase?: number;
    uppercase?: number;
}

export function AtLeastContains(validationOptions?: AtLeastValidationOption) {
    return function (object: Object, propertyName: string) {
        registerDecorator({
            name: 'AtLeastContains',
            target: object.constructor,
            propertyName: propertyName,
            options: validationOptions,
            validator: {
                validate(value: any, args: ValidationArguments) {
                    const uppercase = validationOptions.uppercase || 0
                    const lowercase = validationOptions.lowercase || 0
                    return typeof value === 'string' && countUppercaseLetters(value) >= uppercase && countLowercaseLetters(value) >= lowercase
                },
            },
        });
    };
}