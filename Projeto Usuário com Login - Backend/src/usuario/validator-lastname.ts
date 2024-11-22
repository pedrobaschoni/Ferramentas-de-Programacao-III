import {
    ValidatorConstraint,
    ValidatorConstraintInterface,
  } from 'class-validator';
  
  @ValidatorConstraint({ name: 'lastNameValido', async: false })
  export class LastNameValido implements ValidatorConstraintInterface {
    validate(lastName: string) {
      return lastName.length >= 5 ? true : false;
    }
  
    defaultMessage() {
      return 'O ultimo nome precisa ter acima de 5 letras';
    }
  }
  