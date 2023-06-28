
function Validation(values) {
    let error = {};
    //const email_pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    // const password_pattern = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[a-zA-Z0-9]{8,}$/;
    
    if (values.username === "") {
        error.username = "Name should not be empty";
    } 
    else {
        error.username = "";
    }
  
    if (values.password === "") {
      error.password = "password should not be empty";
    } 
    else {
      error.password = "";
    }
    return error;
  }
  export default Validation;
  