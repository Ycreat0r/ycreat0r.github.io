/* =====================================================
   PORTFOLIO WEBSITE SCRIPT
===================================================== */


/* =====================================================
   GLOBAL VARIABLES
===================================================== */


let currentWorks = [...works];

let visibleCount = 6;

let currentFilter = "all";



const portfolioGrid =
document.getElementById("portfolioGrid");


const searchInput =
document.getElementById("searchInput");


const loadMoreBtn =
document.getElementById("loadMore");



/* =====================================================
   LOADER
===================================================== */


window.addEventListener("load",()=>{


    const loader =
    document.getElementById("loader");


    gsap.to(loader,{

        opacity:0,

        duration:1,

        delay:.5,

        onComplete:()=>{

            loader.style.display="none";

        }

    });


});



/* =====================================================
   LENIS SMOOTH SCROLL
===================================================== */


const lenis =
new Lenis({

    duration:1.2,

    smooth:true

});


function raf(time){

    lenis.raf(time);

    requestAnimationFrame(raf);

}


requestAnimationFrame(raf);



/* =====================================================
   RENDER PORTFOLIO
===================================================== */


function renderWorks(){


    portfolioGrid.innerHTML="";


    const items =
    currentWorks.slice(
        0,
        visibleCount
    );



    items.forEach(work=>{


        const card =
        document.createElement("div");


        card.className=
        "work-card";



        let media="";



        if(work.type==="video"){


            media=`

            <video

            muted

            loop

            autoplay

            playsinline

            preload="metadata"

            src="${work.video}"

            poster="${work.thumbnail}">

            </video>


            <div class="video-indicator">

                ▶

            </div>

            `;


        }

        else{


            media=`

            <img

            loading="lazy"

            src="${work.thumbnail}"

            alt="${work.title}">

            `;


        }



        card.innerHTML=`

            ${media}


            <div class="work-info">


                <h3>

                ${work.title}

                </h3>


                <p>

                ${work.year}

                • ${work.description}

                </p>



                <div class="work-tags">


                ${work.tags.map(tag=>`

                    <span>

                    ${tag}

                    </span>

                `).join("")}


                </div>


            </div>


        `;



        card.addEventListener(
            "click",
            ()=>openModal(work)
        );



        portfolioGrid.appendChild(card);


    });



    animateCards();


    updateLoadButton();


}




/* =====================================================
   LOAD MORE
===================================================== */


function updateLoadButton(){


    if(

        visibleCount >= currentWorks.length

    ){

        loadMoreBtn.style.display="none";

    }

    else{

        loadMoreBtn.style.display="block";

    }


}



loadMoreBtn.addEventListener(
"click",
()=>{


    visibleCount += 3;


    renderWorks();


});



/* =====================================================
   FILTERS
===================================================== */


document
.querySelectorAll(".filters button")
.forEach(button=>{


    button.addEventListener(
    "click",
    ()=>{


        document
        .querySelectorAll(".filters button")
        .forEach(btn=>

            btn.classList.remove("active")

        );


        button.classList.add("active");



        currentFilter =
        button.dataset.filter;



        applyFilters();


    });


});



function applyFilters(){


    const search =
    searchInput.value
    .toLowerCase();



    currentWorks =
    works.filter(work=>{


        const categoryMatch =

        currentFilter==="all"

        ||

        work.type===currentFilter

        ||

        work.category===currentFilter;



        const searchMatch =

        work.title
        .toLowerCase()
        .includes(search)

        ||

        work.tags
        .join(" ")
        .toLowerCase()
        .includes(search);



        return (

            categoryMatch

            &&

            searchMatch

        );


    });



    visibleCount=6;


    renderWorks();


}



searchInput.addEventListener(
"input",
applyFilters
);



/* =====================================================
   INIT
===================================================== */


renderWorks();

/* =====================================================
   MODAL / LIGHTBOX
===================================================== */


const modal =
document.getElementById("modal");


const modalBody =
document.getElementById("modalBody");


const closeModal =
document.getElementById("closeModal");



function openModal(work){


    modalBody.innerHTML="";


    if(work.type==="video"){


        modalBody.innerHTML=`

        <video

        controls

        autoplay

        playsinline

        src="${work.video}">

        </video>

        `;


    }

    else{


        modalBody.innerHTML=`

        <img

        src="${work.image}"

        alt="${work.title}">

        `;


    }



    modal.classList.add("active");

    document.body.style.overflow="hidden";


}



function hideModal(){


    modal.classList.remove("active");


    modalBody.innerHTML="";


    document.body.style.overflow="";


}



closeModal.addEventListener(
"click",
hideModal
);



document
.querySelector(".modal-overlay")
.addEventListener(
"click",
hideModal
);



document.addEventListener(
"keydown",
(e)=>{


    if(e.key==="Escape"){

        hideModal();

    }


});





/* =====================================================
   MOBILE MENU
===================================================== */


const menuBtn =
document.querySelector(".menu-btn");


const mobileMenu =
document.getElementById("mobileMenu");



menuBtn.addEventListener(
"click",
()=>{


    mobileMenu
    .classList.toggle("active");


});



document
.querySelectorAll(".mobile-menu a")
.forEach(link=>{


    link.addEventListener(
    "click",
    ()=>{


        mobileMenu
        .classList.remove("active");


    });


});




/* =====================================================
   CUSTOM CURSOR
===================================================== */


const cursor =
document.getElementById("cursor");



document.addEventListener(
"mousemove",
(e)=>{


    gsap.to(cursor,{

        x:e.clientX,

        y:e.clientY,

        duration:.25

    });


});



const hoverElements =
document.querySelectorAll(

"a,button,.work-card,input,textarea"

);



hoverElements.forEach(element=>{


    element.addEventListener(
    "mouseenter",
    ()=>{


        cursor
        .classList
        .add("cursor-hover");


    });



    element.addEventListener(
    "mouseleave",
    ()=>{


        cursor
        .classList
        .remove("cursor-hover");


    });


});



/* =====================================================
   VIDEO HOVER PREVIEW
===================================================== */


document
.addEventListener(
"mouseenter",
(e)=>{


    if(
        e.target.tagName==="VIDEO"
    ){

        e.target.play();

    }


},
true);



document
.addEventListener(
"mouseleave",
(e)=>{


    if(
        e.target.tagName==="VIDEO"
    ){

        e.target.pause();

    }


},
true);

/* =====================================================
   GSAP ANIMATIONS
===================================================== */


gsap.registerPlugin(
    ScrollTrigger
);



/* =====================================================
   HERO INTRO
===================================================== */


const heroTimeline =
gsap.timeline();



heroTimeline

.to(
".subtitle",
{

    opacity:1,

    y:-20,

    duration:1,

    ease:"power3.out"

}

)


.to(
".hero h1",
{

    opacity:1,

    y:-20,

    duration:1.2,

    ease:"power4.out"

},

"-=.6"

)


.to(
".hero p",
{

    opacity:1,

    y:-20,

    duration:1,

    ease:"power3.out"

},

"-=.7"

)


.to(
".hero-buttons",
{

    opacity:1,

    y:-20,

    duration:1,

    ease:"power3.out"

},

"-=.6"

);





/* =====================================================
   SCROLL REVEAL
===================================================== */


gsap.utils.toArray(
"section"
)
.forEach(section=>{


    gsap.from(
    section,
    {

        opacity:0,

        y:80,

        duration:1,

        ease:"power3.out",

        scrollTrigger:{

            trigger:section,

            start:"top 80%",


        }


    });


});





/* =====================================================
   ABOUT IMAGE PARALLAX
===================================================== */


gsap.to(
".about-left img",
{

    y:-80,

    ease:"none",

    scrollTrigger:{

        trigger:".about",

        start:"top bottom",

        end:"bottom top",

        scrub:true

    }


});





/* =====================================================
   PORTFOLIO CARD ANIMATION
===================================================== */


function animateCards(){


    gsap.from(
    ".work-card",
    {

        opacity:0,

        y:50,

        scale:.95,

        stagger:.08,

        duration:.8,

        ease:"power3.out"

    });


}





/* =====================================================
   SERVICES FLOAT
===================================================== */


gsap.utils.toArray(
".service-card"
)
.forEach(card=>{


    gsap.from(
    card,
    {

        opacity:0,

        y:60,

        duration:1,

        scrollTrigger:{

            trigger:card,

            start:"top 85%"

        }


    });



});





/* =====================================================
   CTA ANIMATION
===================================================== */


gsap.from(
".cta-content",
{

    scale:.9,

    opacity:0,

    duration:1.2,

    scrollTrigger:{

        trigger:".cta",

        start:"top 70%"

    }


});





/* =====================================================
   NAVBAR BLUR ON SCROLL
===================================================== */


window.addEventListener(
"scroll",
()=>{


    const nav =
    document.querySelector(".navbar");


    if(window.scrollY>50){


        nav.style.background=

        "rgba(5,5,5,.7)";


    }

    else{


        nav.style.background=

        "transparent";


    }


});





/* =====================================================
   MAGNETIC BUTTON EFFECT
===================================================== */


document
.querySelectorAll(
".primary,.secondary"
)
.forEach(button=>{


    button.addEventListener(
    "mousemove",
    e=>{


        const rect =
        button.getBoundingClientRect();


        const x =
        e.clientX - rect.left - rect.width/2;


        const y =
        e.clientY - rect.top - rect.height/2;



        gsap.to(
        button,
        {

            x:x*.15,

            y:y*.15,

            duration:.3


        });


    });



    button.addEventListener(
    "mouseleave",
    ()=>{


        gsap.to(
        button,
        {

            x:0,

            y:0,

            duration:.5


        });


    });


});





/* =====================================================
   IMAGE TILT EFFECT
===================================================== */


document
.querySelectorAll(
".work-card"
)
.forEach(card=>{


    card.addEventListener(
    "mousemove",
    e=>{


        const rect =
        card.getBoundingClientRect();



        const x =
        e.clientX - rect.left;


        const y =
        e.clientY - rect.top;



        const rotateX =
        (y-rect.height/2)/20;


        const rotateY =
        (rect.width/2-x)/20;



        gsap.to(
        card,
        {

            rotateX,

            rotateY,

            duration:.3

        });


    });



    card.addEventListener(
    "mouseleave",
    ()=>{


        gsap.to(
        card,
        {

            rotateX:0,

            rotateY:0,

            duration:.5

        });


    });


});



/* =====================================================
   CONTACT FORM DEMO
===================================================== */


document
.querySelector(".contact-form")
.addEventListener(
"submit",
e=>{


    e.preventDefault();


    alert(
        "Спасибо! Сообщение подготовлено."
    );


});
