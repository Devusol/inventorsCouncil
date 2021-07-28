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

  document.querySelector("#btn-logout").disabled = !isAuthenticated;
  document.querySelector("#btn-login").disabled = isAuthenticated;

  if (isAuthenticated) {
    document.querySelector(".gated-content-1").classList.remove("invisible");
    calendar.editable = 'true';
    /* document.getElementById("gated-content-2").classList.remove("invisible"); */

    const claims = await auth0.getIdTokenClaims()
    const pictureUrl = claims.picture

    document.querySelector(".avatar-img").src = pictureUrl || 'https://i.imgur.com/eCikmGJs.png';
    document.querySelector(".avatar-img-div").classList.remove("invisible")

  } else {
    document.querySelector(".gated-content-1").classList.add("invisible");
    /* document.getElementById("gated-content-2").classList.add("invisible"); */
  }
};

window.addEventListener('fireAuth0', async () => { //fireAuth0 event gets fired from partial.js loader
  console.log('loaded');
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
});

const login = async () => {
  await auth0.loginWithRedirect({
    redirect_uri: window.location.href
  });
};

const logout = () => {
  auth0.logout({
    returnTo: window.location.origin
  });
};