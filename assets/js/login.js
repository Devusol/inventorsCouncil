console.log('login js loaded')



createAuth0Client({
    domain: 'dev-fk12ns8a.us.auth0.com',
    client_id: 'fIeFC0BieZU9ryIiaHoBsxclXGt0MYvH',
    redirectUri: 'localhost:5500/loggedin.html'
}).then(auth0 => {
    console.log(auth0.getUser());
    if (auth0.getUser()) {
       // document.getElementById("loginDiv").style.display = "block";
        console.log("logged in");
    } else {
      //  document.getElementById("loginDiv").style.display = "none";
        console.log("logged out");
    }

    $('.login').click(async () => {
        console.log("login clicked");
        await auth0.loginWithPopup(
            {
                redirectUri: 'localhost:5500/loggedin.html'
            }
        ); 
    });

    $('#logout').click(async () => {
        auth0.logout({
            returnTo: 'http://127.0.0.1:5500'
        });
    });

    $('#getUser').click(async () => {
        const user = await auth0.getUser();
        console.log(user);
    });

    $('#getToken').click(async () => {
        const token = await auth0.getTokenSilently();
        console.log(token);
    });

    $('#sendAuth').click(async () => {
        const token = await auth0.getTokenSilently();
        const response = await fetch('http://localhost:5000/keysafe/putEvents', {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
    });
});

console.log($('.login'));