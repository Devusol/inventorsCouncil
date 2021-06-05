var membersCards = document.getElementById("membersCards");

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
        "memberImage": "FlipSetter.jpg",
        "companyName": "Flip Setter",
        "companyDescription": "Krishnan, Sabaresh - FlipSetter lets you create job profile where you can apply, employ and do a lot more. Setup an organization page, add officers, members, events, news and enhance your own profile.", "companyWebsite": "http://2pilabs.com/",
        "companyWebsite": "https://www.flipsetter.com/",
        "companyEmail:": "https://www.flipsetter.com/Contact"
    }];

for (let cardData of memberJSON) {
    membersCards.innerHTML += `<div class="card p-2 memberCard">
    <img class="card-img-top" src="assets/img/members/${cardData.memberImage}" style="height:auto;" alt="Card image cap">
        <div class="card-body">
            <h5 class="card-title">${cardData.companyName}</h5>
            <p class="card-text" style="height: 10vh; overflow:auto">${cardData.companyDescription}</p>
            <a href="${cardData.companyWebsite}" class="btn btn-primary p-2">Website</a>
            <a href="${cardData.companyEmail}" class="btn btn-primary p-2">Contact</a>
        </div>
      </div>`
}