import { 
   head, 
   filter, 
   reduce, 
   isEmpty, 
   not, 
   toPairs,
   complement, 
   splitEvery as R } from 'ramda';
import validator from 'validator';

validator.notEmpty = R.complement(R.isEmpty);

const validate = (toValidate, validations) => 
    R.reduce((errors, [fieldName, validationGroup]) => {
        const errorMessages = errorMessagesFor(toValidate[fieldName], validationGroup);
        
        return validator.notEmpty(errorMessages) 
                ? { ...errors, [fieldName]: errorMessages  }
                : errors;
        },
        {}, R.toPairs(validations)
    );

const errorMessagesFor = (toValidate, messagePairs) => 
    R.map(
        R.head, 
        R.filter(([, validFn]) => 
            R.not(validFn(toValidate)), 
            R.splitEvery(2, messagePairs)
        )
    );

const isValid = R.isEmpty;
const isNotValid = R.complement(isValid);

export default validate;
export {
    validator,
    isValid,
    isNotValid
};
