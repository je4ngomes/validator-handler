#validator-handler
Tiny library to validate and set custom error messages easily.

# Installation and usage

Install the package:

```bash
npm i validator-handler
```

#Example

```javascript
import validate, { validator, isNotValid, isValid } from 'validator-handler';

const inputs = {
    name: "Thiago Silva",
    email: "emaildfdf.com",
    password: "123a"
};

const isIncluded = (pattern) => data => pattern.test(data)

// `validator` is a third-party library with its own sets of validators that you can use;
// or create your own custom function.
const validations = {
    name: ["Please enter a name.", validator.notEmpty],
    email: [
        "Please enter an email address.", validator.notEmpty,
        "Invalid email address.", validator.isEmail
    ],
    password: [
        "Be at least 8 characters or longer.", (x) => x.length > 8,
        "Include at least one number or symbol", isIncluded(/[0-9!@#$%¨&*_()+.]/),
        "Uppercase and lowercase letter are required.", isIncluded(/(?=[A-Z])(?=[a-z])/)
    ]
};

const results = validate(inputs, validations);
/*
OUT: { email: [ 'Invalid email address.' ],
       password: [ 'Be at least 8 characters or longer.',
                   'Uppercase and lowercase letter are required.' ] }
*/

// check if results is valid
if (isValid(results)) {
    ...
}

// check if results is not valid
if (isNotValid(results)) {
    // handling error messages
    ...
}
```

# Details

Functions available                     | Description
--------------------------------------- | --------------------------------------
**validate(toValidate, validations)**   | Validate inputs and return error messages if any input invalid.
**isValid(results)**                    | Check if results is valid.
**isNotValid(results)**                 | Opposite of `isValid` function.
***validator***                         | A library of string validators and sanitizers - [list of validators](https://github.com/chriso/validator.js/blob/master/README.md#validators)