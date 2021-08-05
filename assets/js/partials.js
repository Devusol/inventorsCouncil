$(document).ready(function () {
  let subNav = $('.sub-navbar-content');
  const fireAuth0 = new Event('fireAuth0');

  $("head").load("/html/shared/head.html", function () {
    /* $('.sign-up').load("/html/shared/signup.html", function () { */
    $("header").load("/html/shared/navbar.html", function () {
      console.log($('.sub-navbar-items.navbar-extra-items'));
      $('.sub-navbar-items.navbar-extra-items').append(subNav);
      /* $('.navbar-extra-items').append(subNav); */
      $("footer").load("/html/shared/footer.html", function () {
        console.log($('body').css('display'));
        window.dispatchEvent(fireAuth0);

      })
    })
    /* }) */
  });

});

window.onload = () => {
 

  /* console.log($('.sub-navbar')[0]); */
  /*  */

  $('.sign-up').load("/html/shared/signup.html");
  $('body').css("display", 'initial');

 
};

/*
async loadCSSStyles(){
  return new Promise((resolve, reject)=>{
    const styleURLs = [...];
    await Promise.all(styleURLs.map(async style => await fetchStyle(style)));
    resolve();
  })
})
const fetchStyle = (url) => {
  //https://stackoverflow.com/questions/574944/how-to-load-up-css-files-using-javascript
  return new Promise((resolve, reject) => {
    let link = document.createElement("link");
    link.type = "text/css";
    link.rel = "stylesheet";
    link.onload = function() {
      resolve();
      console.log("style has loaded");
      //Can add setTimeout to attempt to wait for the styles to be applied to DOM
    };
    link.href = url;
    //Uses jQuery, but can be VanillaJS
    $(link).appendTo("head");
  });
}

 */