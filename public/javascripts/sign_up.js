const signUpForm = document.getElementById('signUpForm');
const signUpButton = document.getElementById('signUpFormSubmit');

console.log('HELLO!', signUpButton);

/* Need to create a link to the database so that the new input 
    data can be saved as a new mongoDB user. */

signUpButton.addEventListener('click', (e) => {
    e.preventDefault();
    console.log('WEEEEEEEEEE');

    const firstName = signUpForm.firstName.value;
    const middleName = signUpForm.middleName.value;
    const lastName = signUpForm.lastName.value;
    const userEmail = signUpForm.email.value;
    const userName = signUpForm.userName.value;
    let userPassword;
    let adminId = false;

    if (signUpForm.adminId.value === 'Admin123') {
        adminId = true;
    }

    if (signUpForm.password.value === signUpForm.confirmPassword.value) {
        userPassword = signUpForm.password.value;
    } else {
        alert('Your Passwords did not match. Please fill out the Sign Up form again.');
        return false;
    }

    if (signUpForm.password.value.length < 6) {
        alert('Your Password must be at least 6 characters.');
        return false;
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
    };

    axios.post('/user/signup', new_user)
        .then(function (response) {
            const token = response.data.token;
            Cookies.set('token', token);
            if(adminId) {
                alert('Welcome new administrator!');
            } else {
                alert('Welcome new member!');
            }
            window.location = '/';
            return true;
        })
        .catch(function (error) {
            const errors = error.response.data.errors;
            const errorMsg = error.response.data.msg;
            let msg = '';
            if (errorMsg) {
                msg += `${errorMsg}\n`;
            }
            if (errors) {
                errors.forEach(error => msg += `${error.msg}\n`);
            }
            alert(msg);
            return false;
        });
});


