let loginForm = document.getElementById('loginForm');
let loginButton = document.getElementById('loginFormSubmit');
let loginErrorMsg = document.getElementById('loginErrorMsg');

loginButton.addEventListener('click', (e) => {
    e.preventDefault();

    const username = loginForm.username.value;
    const password = loginForm.password.value;

    if(username == 'user' && password == '123') {
        alert('You have successfully logged in.');
        location.reload();
    } else {
        loginErrorMsg.style.opacity = 1;
    }
});
