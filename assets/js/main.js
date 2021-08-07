// Contact Page - Contact Form JS
let contactForm = document.querySelector(".contact-form");
let whichPage = window.location.pathname;

//Set logo white on index page and colorful on all other pages
if (whichPage == "/" | whichPage == "/index.html") {
  $("#brand-logo").attr("src", "/assets/img/logowhite.png");
}

contactForm.addEventListener("submit", function (e) {
  e.preventDefault();
  const contactForm = new FormData(e.target);
  const formValues = Object.fromEntries(contactForm.entries());

  fetch('https://app.devusol.com/aproxy/iccf/api/v1/nodemail', {
    headers: {
      'Content-Type': 'application/json'
    },
    method: 'POST',
    body: JSON.stringify(formValues)
  }).then(response => {
    e.target.reset();
    alert('Thank you. Your request has been sent.');
    console.log(response.json());
  })
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

