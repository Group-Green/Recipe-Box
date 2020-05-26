// import { User } from "../../models";

const signUpForm = document.getElementById('signUpForm');
const signUpButton = document.getElementById('signUpFormSubmit');
const signUpErrorMsg = document.getElementById('signUpErrorMsg');

/* Need to create a link to the database so that the new input 
    data can be saved as a new mongoDB user. */

signUpButton.addEventListener('click', (e) => {
    e.preventDefault();

    const firstName = signUpForm.firstName.value;
    const middleName = signUpForm.middleName.value;
    const lastName = signUpForm.lastName.value;
    const userEmail = signUpForm.email.value;
    const userName = signUpForm.userName.value;
    let userPassword;
    let adminId = false;

    if (signUpForm.password.value == signUpForm.confirmPassword.value) {
        userPassword = signUpForm.password.value;
    } else {
        alert('Your Passwords did not match. Please fill out the Sign Up form again.');
    }

    if (signUpForm.adminId.value == 'Admin123') {
        alert('Welcome Admin User!');
        adminId = true;
    }

    const new_user = {
        first_name: firstName,
        middle_name: middleName,
        last_name: lastName,
        email: userEmail,
        user_name: userName,
        password: userPassword,
        member_status: true,
        admin_status: adminId
    }

    console.log(new_user);
});


