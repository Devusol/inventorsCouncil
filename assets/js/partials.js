 $(document).ready(function () {
  $("head").load("/html/shared/head.html");
  $("header").load("/html/shared/navbar.html");
  $("footer").load("/html/shared/footer.html");
}); 

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