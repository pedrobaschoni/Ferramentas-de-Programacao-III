import {
    ValidatorConstraint,
    ValidatorConstraintInterface,
  } from 'class-validator';
  
  @ValidatorConstraint({ name: 'emailValido', async: false })
  export class EmailValido implements ValidatorConstraintInterface {
    validate(email: string) {
      return email.includes('@') ? true : false;
      // return email.endsWith('@gmail.com') ? true : false;

        // const prefixo = email.split("@")[0]; // Pega a parte antes do "@"
        // return prefixo.length > 0 && email.endsWith("@gmail.com");
    }
  
    defaultMessage() {
      return 'O email precisa ter um @';
    }
  }
  