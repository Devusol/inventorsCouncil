let auth0 = null;
const fetchAuthConfig = () => fetch("/auth_config.json");

const configureClient = async () => {
  const response = await fetchAuthConfig();
  const config = await response.json();

  auth0 = await createAuth0Client({
    domain: config.domain,
    client_id: config.clientId,
  });
};

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

const login = async () => {
  await auth0.loginWithRedirect({
    redirect_uri: window.location.origin
  });
};

const logout = () => {
  auth0.logout({
    returnTo: window.location.origin
  });
};