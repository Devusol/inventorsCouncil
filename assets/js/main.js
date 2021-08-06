// Contact Page - Contact Form JS
let theForm = document.getElementById("contactPageForm");
let whichPage = window.location.pathname;

//Set logo whit on index page and colorful on all other pages
if (whichPage == "/" | whichPage == "/index.html"){
  $("#brand-logo").attr("src","/assets/img/logowhite.png");
}



theForm.addEventListener("submit", function (e) {
  e.preventDefault();
  console.log(this);
  let input = this.elements;
  var contactForm = new FormData(theForm);
  console.log([...contactForm]);
  /*   let formPairs = [];
    for (let pair of contactForm.entries()) {
      formPairs.push(pair);
    } 
    console.log(formPairs); */
});


$('.carousel').carousel({
  interval: 2000
})


/* Handle setting navbar submenus on mobile toggle */
function navPop(params) {
  $('.nav-mobile').each(function () {
    if (params.innerText == this.innerText) {
      $.get(`/html/${params.innerText.split(" ")[0].toLowerCase()}.html`, null, htmlResponse => {
        let navItems = $(htmlResponse).find('.sub-navbar-content');
        let linkTo;
        for (let item of $('#navbarSupportedContent').find(`a`)) {
          if (item.innerText == params.innerText) {
            //console.log(item.href);
            linkTo = item;
          }
        }
        $('.mobile-navbar-items').empty();
        $('.mobile-navbar-items').append(linkTo, navItems);
      });
    }
  })
}

