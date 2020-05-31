const loginForm = document.getElementById('loginForm');
const loginButton = document.getElementById('loginFormSubmit');

loginButton.addEventListener('click', (e) => {
    e.preventDefault();

    const email = loginForm.email.value;
    const password = loginForm.password.value;

    axios.post('/user/login', {email, password})
        .then(function (response) {
            console.log(response);
            console.log(response.data);
            console.log(response.data.token);
            const token = response.data.token;
            Cookies.set('token', token);
            alert('Welcome back!');
            window.location = '/';
            return true;
        })
        .catch(function (error) {
            const errors = error.response && error.response.data && error.response.data.errors;
            const errorMsg = error.response && error.response.data && error.response.data.msg;
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
