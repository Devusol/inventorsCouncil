
const auth0 = createAuth0Client({
    domain: 'dev-fk12ns8a.us.auth0.com',
    client_id: 'ow0S9gjPxORQA56VZyHgas5ExV8Yhi4Y'
});


const updateUI = async () => {

    const isAuthenticated = await auth0.isAuthenticated();

    document.getElementById("btn-logout").disabled = !isAuthenticated;
    document.getElementById("btn-login").disabled = isAuthenticated;

    if (isAuthenticated) {
        document.queryCommandEnabled(".gated-content-1").classList.remove("invisible");
        /* document.getElementById("gated-content-2").classList.remove("invisible"); */

        const claims = await auth0.getIdTokenClaims()
        const pictureUrl = claims.picture

        document.querySelector(".avatar-img").src = pictureUrl || 'https://icon-library.net/images/icon-of-music/icon-of-music-8.jpg';
        document.querySelector(".avatar-img-div").classList.remove("invisible")

    } else {
        document.querySelector(".gated-content-1").classList.add("invisible");
        /* document.getElementById("gated-content-2").classList.add("invisible"); */
    }
};



/* 
let auth0 = createAuth0Client({
    domain: 'dev-fk12ns8a.us.auth0.com',
    client_id: 'ow0S9gjPxORQA56VZyHgas5ExV8Yhi4Y',
    redirectUri: callbackURL
}).then((auth0) => {
    /* const isAuthenticated = auth0.isAuthenticated(); 
    updateUI(); 
    /* document.getElementById("btn-logout").disabled = !isAuthenticated;
    document.getElementById("btn-login").disabled = isAuthenticated;

    if (isAuthenticated) {
        document.querySelector(".gated-content-1").classList.remove("invisible");
        /* document.getElementById("gated-content-2").classList.remove("invisible"); 
    
        const claims = auth0.getIdTokenClaims()
        const pictureUrl = claims.picture
        
        document.querySelector(".avatar-img").src = pictureUrl || 'https://icon-library.net/images/icon-of-music/icon-of-music-8.jpg';
        document.querySelector(".avatar-img-div").classList.remove("invisible")
    
      } else {
        document.querySelector(".gated-content-1").classList.add("invisible");
        /* document.getElementById("gated-content-2").classList.add("invisible"); 
      } */
/* console.log(auth0.getUser()); */
/*  if (auth0.isAuthenticated()) {
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
 }); */
//});

const login = async () => {
    await auth0.loginWithRedirect({
        redirect_uri: window.location.origin
    });
    const user = await auth0.getUser();
    console.log(user);
};

const logout = () => {
    auth0.logout({
        returnTo: window.location.origin
    });
};

window.onload = async () => {
    
    await configureClient();
    updateUI();
    const query = window.location.search;
    if (query.includes("code=") && query.includes("state=")) {
      // Process the login state
      await auth0.handleRedirectCallback();
      updateUI();
      // Use replaceState to redirect the user away and remove the querystring parameters
      window.history.replaceState({}, document.title, "/");
    }
  };