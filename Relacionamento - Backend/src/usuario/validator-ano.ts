import {
    ValidatorConstraint,
    ValidatorConstraintInterface,
  } from 'class-validator';
  
  @ValidatorConstraint({ name: 'anoValido', async: false })
  export class AnoValido implements ValidatorConstraintInterface {
    validate(ano: number) {
      return ano > 1900 ? true : false;
    }
  
    defaultMessage() {
      return 'O ano precisa ser acima de 1900';
    }
  }
  