const DEFAULT_VALIDATION = {
    type: String,
    required: true,
    minLength: 2,
    maxLength: 256,
    trim: true,
    lowercase: true
};


const PHONE = {
    type: String,
    required: true,
    match: RegExp(/0[0-9]{1,2}\-?\s?[0-9]{3}\s?[0-9]{4}/),
};


const EMAIL = {
    type: String,
    required: true,
    lowercase: true,
    trim: true,
    unique: true,
    match: RegExp(/^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/)
};

const URL = {
    type: String,
    trim: true,
    lowercase: true,
    match: RegExp(/^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/),
};


module.exports = {DEFAULT_VALIDATION, PHONE, EMAIL, URL};