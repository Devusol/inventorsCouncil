// Contact Page - Contact Form JS
let theForm = document.getElementById("contactPageForm");
theForm.addEventListener("submit", function(e) {
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

