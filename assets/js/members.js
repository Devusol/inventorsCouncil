let membersCards = document.querySelector("#membersCards");
let membersCardsLandscape = document.querySelector("#membersCardsLandscape");
let membersJSON = []

fetch("/assets/json/members.json")
    .then((response) => response.json())
    .then((json) => {
        membersJSON = json;
        let visWeb, visMail;
        for (let cardData of membersJSON) {
            cardData.companyWebsite ? visWeb = "visible" : visWeb = "invisible";
            cardData.companyEmail ? visMail = "visible" : visMail = "invisible";

            membersCardsLandscape.innerHTML += `<div class="py-3"> 
                <div class="card">
                <div class="row">
                    <div class="col-md-4">
                            <img src="/assets/img/members/${cardData.memberImage}" class="w-100">
                        </div>
                        <div class="col-md-8 px-3">
                            <div class="card-block px-3">
                            <h4 class="card-title">${cardData.companyName}</h4>
                            <p class="card-text">${cardData.companyDescription}</p><br>
                            <div class="row">
                                    <div class="col-lg-6 mb-4">
                                        <a href="${cardData.companyWebsite}" class="btn btn-outline-primary p-2 ${visWeb}">Website</a>
                                    </div>
                                    <div class="col-lg-6 mb-4">
                                        <a href="mailto:${cardData.companyEmail}" class="btn btn-outline-primary p-2 ${visMail}">Contact</a>
                                    </div>
                            </div>
                            </div>
                            </div>
                
                        </div>
                        </div>
                    </div>
                    </div>`;
        }
    });


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


function searchFunction() {
    let input = document.querySelector('#myFilter'),
        filter = input.value.toUpperCase(),
        cards = $('.card');

    if (filter == "") {
        for (let cardFilter in cards) {
            cards[cardFilter].parentElement.style.display = "";
        }
        return;
    }

    for (let cardFilter in cards) {
        let title = cards[cardFilter].querySelector(".card-block h4.card-title");
        if (title.innerText.toUpperCase().indexOf(filter) > -1) {
            cards[cardFilter].style.display = "";
        } else {
            cards[cardFilter].parentElement.style.display = "none";
        }
    }

    /*    for (i = 0; i < cards.length; i++) {
           title = cards[i].querySelector(".card-block h4.card-title");
           if (title.innerText.toUpperCase().indexOf(filter) > -1) {
               cards[i].style.display = "";
           } else {
               cards[i].style.display = "none";
           }
       }
    */
}

function sortFunction() {
    console.log('under construction')
        // Use toUpperCase() to ignore character casing
    const bandA = a.companyName.toUpperCase();
    const bandB = b.companyName.toUpperCase();

    let comparison = 0;
    if (bandA > bandB) {
        comparison = 1;
    } else if (bandA < bandB) {
        comparison = -1;
    }
    return (comparison);
}

/* memberJSON.sort(sortFunction) */


/* var memberJSON = [{
    "memberImage": "TalkToMe.jpg",
    "companyName": "Sydspeak Inc.",
    "companyDescription": "Birr, Sydney - Sydspeak Inc. introduces Talk To Me 100. This easy to use communication device helps teachers, parents and therapists teach children speak their first words. Press a symbol button and it speaks the word. With 100 words and the corresponding picture symbols communication partners can interact using the most frequently used words for functional interactive conversation. Talk To Me 100 is affordable at $59.",
    "companyWebsite": "https://sydspeak.com/",
    "companyEmail:": "https://sydspeak.com/"
},
{
    "memberImage": "SharkBait.jpg",
    "companyName": "SharkBait",
    "companyDescription": "Colangelo, Mark - SharkBait serves inventors by providing access to the expert support non-institutional inventors need to make informed decisions from concept to commercialization. Developed by financial angels, makers and startup innovators, the SharkBait system requires no confidential information yet provides progressive levels of personalized insight & guidance to help inventors learn about invention, identify best next steps, and make better use of their time and financial resources!",
    "companyWebsite": "https://sharkbaitventures.com/",
    /*"companyEmail:": "https://www.flipsetter.com/Contact"
},
{
    "memberImage": "NoLogo.png",
    "companyName": "F. Technology Consulting Center",
    "companyDescription": "Flinchbaugh, Dr. David E., Executive Director. - Inventors Council Co-founding member (1974), sponsor since 1986, and current ICCF President. David and Heidi promote new product development and entrepreneurship among our members. We have helped form 21 new companies since 1980 and have filed 57 patent applications since 1996 for consumer goods, military, aerospace, education, art, entertainment, and medical. One medical product example is the ''UroCycler'', a unique, FDA-certified, highly engineered, patient safety, bladder management system now used in 68 countries.",
    /*"companyWebsite": "http://2pilabs.com/",
    "companyEmail:": "drdavidflinchbaugh@bellsouth.net"
},
{
    "memberImage": "SunInComfort.jpg",
    "companyName": "Sun In Comfort, Inc.",
    "companyDescription": "Griffin, Beth - I design ergonomically luxury chaise lounge, beach chairs and cushion’s just for women! Comfort and design is our main goal to appealing to every women who enjoy sun bathing in a prone position with comfort!",
    "companyWebsite": "https://sunincomfort.com/",
    "companyEmail:": "sunincomfort@gmail.com"
},
{
    "memberImage": "KeepMeKozy.png",
    "companyName": "Keep Me Kozy",
    "companyDescription": "Hall, Karen - Keep Me Kozy is a long overdue replacement for flat blanketing. This blanket is designed to transform a mattress into a pouch so kids stay “tucked in”. There are no ends to pull loose so the cover stays wrapped around a child and doesn’t bunch up or get twisted. The simple one-piece design is easy to use. It’s comforting for parents to know their children stay covered at night, and, the design has special benefits for some children with Sensory Processing Disorder (SPD), autism, and epilepsy.",
    "companyWebsite": "http://keepmekozy.com/",
    "companyEmail:": "keepmekozy@yahoo.com"
},
{
    "memberImage": "innovate.png",
    "companyName": "Innovate, LLC",
    "companyDescription": "Hassan, Dr. Michael - INNOVATE offers Consulting Services in Electrical, Electronics, Computer, and Systems Engineering; Expert Witness Services; Professional Development Services; Research and Development; Creative Problem Solving; Products' Innovation, Design and Development; Intellectual Properties Development; Innovative Idea Creation and Problem Solving. Contact us by email or phone 407.780.5585.",
    /*"companyWebsite": "http://keepmekozy.com/",
    "companyEmail:": "innovatellc@gmail.com"
},
{
    "memberImage": "NoLogo.png",
    "companyName": "Eating on a Dollar a Day",
    "companyDescription": "Looking For Next Iphone App to program. Longtime member and engineer loves building iphone apps. Make me an offer. Best way is to meet at Stardust, Starbucks and I will program as you work.",
    /*"companyWebsite": "http://2pilabs.com/",
    "companyEmail:": "https://www.flipsetter.com/Contact"
},
{
    "memberImage": "InventingDaily.jpg",
    "companyName": "Inventing Daily",
    "companyDescription": "Keane, Carolyn - Inventing Daily was founded by a family of inventors looking for a better way to help other inventors get their products noticed. It has evolved into a breeding ground of funding, licensing, sales, and marketing. Having been in the inventing world for a combined 20 years, Jim and Carolyn, the Founders of Inventing Daily have taken multiple products from idea to licensing and manufacturing. They have made mistakes along the way, been lied to, been over-charged for services, and every other pitfall that comes with launching a product on your own. Inventing Daily was created to help you through the process and avoid having the same issues. Our #1 Mission at Inventing Daily is to help people. We’re not talking in a cheesy way here either. On one hand, we’re helping inventors show proof of concept through sales via our Shopping section. On the other hand, we’re helping a few new inventors at a time with their ideas through mentoring and coaching for free. For those that we may not have time to help directly, we share our contacts who can offer the services the inventor needs. We don’t charge the inventor anything as we know how limited the budgets can be. We simply receive a referral fee from the service provider if any services are rendered. It’s that simple. We are not another company that promises the world, but we are the company that promises to do our part to help change it. Good luck with your idea and keep Inventing Daily!",
    "companyWebsite": "https://inventingdaily.com/",
    "companyEmail:": "info@inventingdaily.com"
},
{
    "memberImage": "PinkLotus.png",
    "companyName": "Pink Lotus Technologies",
    "companyDescription": "Kilgallon, Maryann - POMM™ is a wearable technology product from Pink Lotus Technologies LLC, a product development company based in Orlando, Florida. The company was founded by Maryann Kilgallon, an accomplished entrepreneur who actively seeks to find solutions for common problems through the use of a variety of technologies.",
    "companyWebsite": "https://pinklotustech.com/",
    "companyEmail:": "info@pinklotustech.com"
},
{
    "memberImage": "FlipSetter.jpg",
    "companyName": "Flip Setter",
    "companyDescription": "Krishnan, Sabaresh - FlipSetter lets you create job profile where you can apply, employ and do a lot more. Setup an organization page, add officers, members, events, news and enhance your own profile.",
    "companyWebsite": "https://www.flipsetter.com/",
    "companyEmail:": "flipsetterinc@gmail.com"
},
{
    "memberImage": "KMP.png",
    "companyName": "Kirk Marsh Photography",
    "companyDescription": "Marsh, Kirk - Davenport, FL based photographer who is available to help photograph you and/or your inventions.",
    "companyWebsite": "https://www.kirkmarshphotography.com/",
    "companyEmail:": "kirk@kirkmarshphotography.com"
},
{
    "memberImage": "2piLabs.jpg",
    "companyName": "2Pi Labs",
    "companyDescription": "Narwani, Neil - 2-Pi Labs, based in Orlando, FL, can take your product idea from concept to working prototype and beyond. Our specialties include: With in-house 3D printers, electronic PCB assembly machines, CNC mills, lathes, laser cutters and other machine processes, we can rapidly design and prototype your idea to get your product out to market faster.",
    "companyWebsite": "http://2pilabs.com/",
    "companyEmail:": "Create@2PiLabs.com"
},
{
    "memberImage": "Panter.png",
    "companyName": "Panter, Inc.",
    "companyDescription": "Panter, Rodney - Panter Inc., a Florida Corporation started in 2004, has created a new luggage concept designed to provide: lighter weight; improved durability and protection; more interior space; a flat interior; improved mobility (e.g. vertical, horizontal, trailing and in-between); improved stability; easy push button/latch access to outside storage; improved, automatically adjusting luggage strap; multi-wheel, single-point hand/foot actuated brakes; improved, lightweight hinges; stackable for carrying multiple pieces at once; and more. Patent Application No. 12/641845, Luggage Assembly and Associated Ball Wheels, was submitted in Dec of 2009.",
    "companyWebsite": "https://www.panterinc.com/",
    "companyEmail:": "RodPanter@panterinc.com"
},
{
    "memberImage": "JMS.png",
    "companyName": "JMS 3D Printing",
    "companyDescription": "Stana, Jim - Retired mechanical engineer with 40 years of design experience, can help you turn your idea into a 3D printed product prototype. (Up to 10 x 8 x 8 inches in size in durable ABS plastic.) He can create the required CAD model if you don’t have one and apply his knowledge make the parts functional. He also has extensive experience in Lean Six Sigma manufacturing and creating production cost models to see how your concept might compare with the competition. Located in Mt Dora, FL. Contact him through his web site by clicking the logo or name link.",
    "companyWebsite": "https://jms3dprinting.com/",
    "companyEmail:": "info@jms3dprinting.com"
},
{
    "memberImage": "PetRock.png",
    "companyName": "The Pet Rock Throwback",
    "companyDescription": "Stewart, Evan - The 70's are back in fashion, music, style, collectibles, and rocks for pets. The Pet Rock is a whimsical cornerstone of that revival. Forget the hassles of a dog or a cat. Own the only mineral proven to make you feel loved. For a great stocking stuffer or gag gift, pick up a few Pet Rocks today.",
    /* "companyWebsite": "http://2pilabs.com/",
     "companyEmail:": "create@2pilabs.com"
},
{
    "memberImage": "Vilardi.jpg",
    "companyName": "John Vilardi 3D Artist",
    "companyDescription": "Vilardi, John - 3D visualizations are a great way to market your invention prior to fabrication. This process allows for visualization in an environment that makes sense to the customer. Viewing an object in 3D helps the client to see the product as it should be. These renderings can isolate any manufacturing issues or design flaws that 2D drawings cannot reveal. This can mean considerable savings in lost production time and manufacturing costs down the road. The way you present your invention to a prospective company is critical and can make or break your chances of success. A 3D prototype will demonstrate and educate potential buyers on your invention's features, functionality and benefits. My expertise is in Graphics Communications which included Lightwave 3D, Adobe Photoshop, and Adobe Illustrator. I went on to work at the Inky Dinky Animation Studio with Robert Burden in NY for two years and then had the pleasure of working for Crusade Fine Arts comic books and a short film (we came in first place in the Long Island Film festival) with Billy Tucci owner, writer and illustrator for Shi Comic books. I also just started doing freelance ideation work for Edison Nation part time.",
    "companyWebsite": "https://johnvilardi.com/",
    "companyEmail:": "john@johnvilardi.com"
},
{
    "memberImage": "WindAge.png",
    "companyName": "WindAge, LLC",
    "companyDescription": "Wiegel, Ted - WindAge, LLC provides an integrated system of renewable energy devices that fill the current missing links in the electric and fuel-cell vehicle recharging infrastructure, as well as produce clean power from the passing of high-speed trains. Central to this system is the Traffic-Driven Wind Generator, which is supplemented by 3 separate human energy harvester devices, as well as solar panels. The problems of alternate power intermittency and accessibility are thus resolved in one fell swoop.",
    "companyWebsite": "https://windagellc.com/",
    "companyEmail:": "info@windagellc.com"
},
{
    "memberImage": "Tecreation.png",
    "companyName": "TECreation Development, LLC",
    "companyDescription": "Woods, David - TECreation was founded in 2006 for the purpose of providing innovations to the marketplace that use simple elegant designs. Mankind started out as a part of nature but has evolved to the point of fighting with it. We are here to regain our fluid harmony with the environment while improving our lifestyle. Now nearing production is the MaxAir Swim Fin. Testing has shown it to be between 20% and 50% more air efficient than any other recreational swim fin in existence.",
    "companyWebsite": "http://www.tecreationdev.com/",
    "companyEmail:": "DWoodsTCR@gmail.com;"
},
{
    "memberImage": "RavenLogo.jpg",
    "companyName": "Charismatic Raven Productions",
    "companyDescription": "Yannantuono, Al - Charismatic Raven Productions was started on November 10th 2010, and is a small business devoted to bringing the creativity of ones imagination to life. Our operations are based in Orlando Florida.The services of CRP include 2d graphic design (T-shirt design, business cards, holiday cards, conceptual design, flyers, advertisements, banners,company logos and so much more.). In addition we also are skilled in the 3d aspect of design (3d models, conceptual models for inventors, logo introduction videos, and short films.) We are proud to be in conjunction with the Inventors Council of Central Florida.",
    /* "companyWebsite": "https://www.flipsetter.com/",
     "companyEmail:": "https://www.flipsetter.com/Contact"
}
];
 */