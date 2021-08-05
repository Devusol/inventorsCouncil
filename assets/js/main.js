// Contact Page - Contact Form JS
let theForm = document.getElementById("contactPageForm");
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

function navPop(params) {

  $('.nav-mobile').each(function () {

    if (params.innerText == this.innerText) {
      /*  $.get('/html/about.html', null, htmlResponse =>{ */
      $.get(`/html/${params.innerText.split(" ")[0].toLowerCase()}.html`, null, htmlResponse => {
        let navItems = $(htmlResponse).find('.sub-navbar-content');
        let linkTo;
        for (let item of $('#navbarSupportedContent').find(`a`)) {
          if (item.innerText == params.innerText) {
            console.log(item.href);
            linkTo = item;
          }
        }
        $('.mobile-navbar-items').empty();
        $('.mobile-navbar-items').append(linkTo, navItems);
      });
    }
    // console.log(this.innerText);
  })

  /*   if (params.name == "about") {
      $.get('/html/about.html', null, htmlResponse => {
         let navItems = $('.sub-navbar-menu');
        $('.mobile-navbar-items').append(navItems); 
        console.log(navItems, $('.mobile-navbar-items')); 
        console.log('pop pop');
      });
    } 
   */
}
