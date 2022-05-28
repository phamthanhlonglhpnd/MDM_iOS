
const isValidateEmail = (value) => {
    const regexEmail = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return regexEmail.test(String(value).toLowerCase());
}

const validateEmail = (value, setEmailError) => {
    if(value === "") {
        setEmailError("Vui lòng nhập email")
    } else if(isValidateEmail(value)) {
        setEmailError("");
    } else {
        setEmailError("Vui lòng nhập đúng định dạng email!")
    }
}

const validatePassword = (value, setPasswordError) => {
    if(value === "" ) {
        setPasswordError("Vui lòng nhập password!")
    } else {
        setPasswordError("");
    }
}

const validateInput = (value, setInputError) => {
    if(value === "") {
        setInputError("Vui lòng nhập dữ liệu!")
    }
}

export {
    validateEmail, validatePassword, isValidateEmail, validateInput, 
}