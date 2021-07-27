var membersCards = document.querySelector("#membersCards");
var membersCardsLandscape = document.querySelector("#membersCardsLandscape");

var memberJSON = [
    {
        "memberImage": "2piLabs.jpg",
        "companyName": "2Pi Labs",
        "companyDescription": "Narwani, Neil - 2-Pi Labs, based in Orlando, FL, can take your product idea from concept to working prototype and beyond. Our specialties include: With in-house 3D printers, electronic PCB assembly machines, CNC mills, lathes, laser cutters and other machine processes, we can rapidly design and prototype your idea to get your product out to market faster.",
        "companyWebsite": "http://2pilabs.com/",
        "companyEmail:": "create@2pilabs.com"
    },
    {
        "memberImage": "FlipSetter.jpg",
        "companyName": "Flip Setter",
        "companyDescription": "Krishnan, Sabaresh - FlipSetter lets you create job profile where you can apply, employ and do a lot more. Setup an organization page, add officers, members, events, news and enhance your own profile.", "companyWebsite": "http://2pilabs.com/",
        "companyWebsite": "https://www.flipsetter.com/",
        "companyEmail:": "https://www.flipsetter.com/Contact"
    },
    {
        "memberImage": "2piLabs.jpg",
        "companyName": "3Pi Labs",
        "companyDescription": "Narwani, Neil - 2-Pi Labs, based in Orlando, FL, can take your product idea from concept to working prototype and beyond. Our specialties include: With in-house 3D printers, electronic PCB assembly machines, CNC mills, lathes, laser cutters and other machine processes, we can rapidly design and prototype your idea to get your product out to market faster.",
        "companyWebsite": "http://2pilabs.com/",
        "companyEmail:": "create@2pilabs.com"
    },
    {
        "memberImage": "FlipSetter.jpg",
        "companyName": "slip Setter",
        "companyDescription": "Krishnan, Sabaresh - FlipSetter lets you create job profile where you can apply, employ and do a lot more. Setup an organization page, add officers, members, events, news and enhance your own profile.", "companyWebsite": "http://2pilabs.com/",
        "companyWebsite": "https://www.flipsetter.com/",
        "companyEmail:": "https://www.flipsetter.com/Contact"
    }];

/* for (let cardData of memberJSON) {
    membersCards.innerHTML += `<div class="card p-2 memberCard">
    <img class="card-img-top" src="assets/img/members/${cardData.memberImage}" style="height:auto;" alt="Card image cap">
        <div class="card-body">
            <h5 class="card-title">${cardData.companyName}</h5>
            <p class="card-text" style="height: 10vh; overflow:auto">${cardData.companyDescription}</p>
            <a href="${cardData.companyWebsite}" class="btn btn-primary p-2">Website</a>
            <a href="${cardData.companyEmail}" class="btn btn-primary p-2">Contact</a>
        </div>
      </div>`
} */

for (let cardData of memberJSON) {
    membersCardsLandscape.innerHTML += `<div class="container py-3">
    <div class="card">
      <div class="row">
        <div class="col-md-4">
                <img src="/assets/img/members/${cardData.memberImage}" class="w-100">
            </div>
            <div class="col-md-8 px-3">
                <div class="card-block px-3">
                <h4 class="card-title">${cardData.companyName}</h4>
                <p class="card-text">${cardData.companyDescription}</p>
                <a href="${cardData.companyWebsite}" class="btn btn-primary p-2">Website</a>
                <a href="${cardData.companyEmail}" class="btn btn-primary p-2">Contact</a>
                </div>
                </div>
      
              </div>
            </div>
          </div>
        </div>`
}


function myFunction() {
    var input, filter, cards, cardContainer, h5, title, i;
    input = document.getElementById("myFilter");
    filter = input.value.toUpperCase();
    cardContainer = document.getElementById("myItems");
    cards = cardContainer.getElementsByClassName("card");

    for (i = 0; i < cards.length; i++) {
        title = cards[i].querySelector(".card-block h4.card-title");
        if (title.innerText.toUpperCase().indexOf(filter) > -1) {
            cards[i].style.display = "";
        } else {
            cards[i].style.display = "none";
        }
    }

    /*   for (let cardFilter of cards){
          title = cards[cardFilter]
      } */
}

function sortFunction(a, b) {
    // Use toUpperCase() to ignore character casing
    const bandA = a.companyName.toUpperCase();
    const bandB = b.companyName.toUpperCase();

    let comparison = 0;
    if (bandA > bandB) {
        comparison = 1;
    } else if (bandA < bandB) {
        comparison = -1;
    }
    return(comparison);
}

memberJSON.sort(sortFunction)