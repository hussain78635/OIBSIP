/* ==========================
   TYPING EFFECT
========================== */


const typed = new Typed(".typing", {

    strings: [

        "Java Full Stack Developer",
        "Spring Boot Developer",
        "AI & ML Enthusiast",
        "Generative AI Learner",
        "Python Developer",
        "Problem Solver"

    ],

    typeSpeed:100,

    backSpeed:60,

    backDelay:1000,

    loop:true

});



/* ==========================
   SCROLL REVEAL ANIMATION
========================== */


ScrollReveal({

    reset:true,

    distance:'80px',

    duration:2000,

    delay:200

});


ScrollReveal().reveal(
    '.home-content,.heading',
    {
        origin:'top'
    }
);


ScrollReveal().reveal(
    '.home-img,.skills-container,.projects-container',
    {
        origin:'bottom'
    }
);


ScrollReveal().reveal(
    '.about-img',
    {
        origin:'left'
    }
);


ScrollReveal().reveal(
    '.about-content,.education-container',
    {
        origin:'right'
    }
);



/* ==========================
   ACTIVE NAVBAR ON SCROLL
========================== */


let sections = document.querySelectorAll("section");

let navLinks = document.querySelectorAll("header nav a");


window.onscroll = () => {


    sections.forEach(sec => {


        let top = window.scrollY;

        let offset = sec.offsetTop - 150;

        let height = sec.offsetHeight;

        let id = sec.getAttribute("id");


        if(top >= offset && top < offset + height){


            navLinks.forEach(link=>{


                link.classList.remove("active");


                document
                .querySelector(
                    "header nav a[href*=" + id + "]"
                )
                .classList.add("active");


            });


        }


    });


};



/* ==========================
   HEADER SHADOW
========================== */


let header = document.querySelector(".header");


window.addEventListener("scroll",()=>{


    if(window.scrollY > 50){

        header.style.boxShadow =
        "0 0 20px rgba(0,171,240,.4)";

    }

    else{

        header.style.boxShadow="none";

    }


});



/* ==========================
   CONTACT FORM MESSAGE
========================== */


const form = document.querySelector("form");


form.addEventListener("submit",(e)=>{


    e.preventDefault();


    alert(
        "Thank you for contacting me! I will reply soon."
    );


    form.reset();


});