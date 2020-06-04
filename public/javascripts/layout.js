const token = Cookies.get('token');

window.loggedIn = false;
window.user = {
    first_name: 'Unknown',
    middle_name: '',
    last_name: '',
    admin_status: false,
    member_status: false,
};

//Validate the token stored in Cookies
axios.get('/user/me', { headers: { token, 'Content-Type': 'application/json' }})
    .then(async (response) => {
        window.user = response.data;
        window.loggedIn = true;
        document.getElementById('profileLink').href = `/profile?id=${window.user._id}`;
        document.getElementById('login').style.display='none';
        document.getElementById('signup').style.display='none';
        document.getElementById('loginFooter').style.display='none';
        document.getElementById('signupFooter').style.display='none';
        document.getElementById('logout').style.display='block';
        document.getElementById('logoutFooter').style.display='block';
        document.getElementById('profile').style.display='block';
        document.getElementById('profileFooter').style.display='block';
        document.getElementById('name').style.display='block';
        document.getElementById('name')
            .innerHTML=`<a href='/profile' id='profileNameLink'>${window.user.last_name}, ${window.user.first_name} ${window.user.middle_name}</a>`;
        document.getElementById('profileNameLink').href = `/profile?id=${window.user._id}`;
        document.getElementById('profileFooterLink').href = `/profile?id=${window.user._id}`;
        // Show Recipe Delete Button For Admin

        document.getElementById('spacer').setAttribute('userAdminStatus', window.user.admin_status);
        
    })
    .catch(() => {
        document.getElementById('login').style.display='block';
        document.getElementById('signup').style.display='block';
        document.getElementById('loginFooter').style.display='block';
        document.getElementById('signupFooter').style.display='block';
        document.getElementById('logout').style.display='none';
        document.getElementById('logoutFooter').style.display='none';
        document.getElementById('name').style.display='none';
        document.getElementById('profile').style.display='none';
        document.getElementById('profileFooter').style.display='none';

        // Don't allow profile if not logged in
        if (window.location.pathname === '/profile') {
            window.location = '/';
        }
    });

