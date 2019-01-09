import { 
   head, 
   filter,
   map, 
   reduce, 
   isEmpty, 
   not, 
   toPairs,
   complement, 
   splitEvery } from 'ramda';
import validator from 'validator';

const validate = (toValidate, validations) => 
    reduce((errors, [fieldName, validationGroup]) => {
        const errorMessages = errorMessagesFor(toValidate[fieldName], validationGroup);
        
        return validator.notEmpty(errorMessages) 
                ? { ...errors, [fieldName]: errorMessages  }
                : errors;
        },
        {}, toPairs(validations)
    );

const errorMessagesFor = (toValidate, messagePairs) => 
    map(
        head, 
        filter(([, validFn]) => 
            not(validFn(toValidate)), 
            splitEvery(2, messagePairs)
        )
    );

const isValid = isEmpty;
const isNotValid = validator.notEmpty = complement(isValid);

export default validate;
export {
    validator,
    isValid,
    isNotValid
};
