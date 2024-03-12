 const parallax_el = document.querySelectorAll(".parallax");

 let xValue = 0;
 let yValue = 0;

 let rotateDegree = 0;
 function update(cursorPosition) {
    parallax_el.forEach((el) => {
        let speedx = el.dataset.speedx;
        let speedy = el.dataset.speedy;
        let speedz = el.dataset.speedz;

        let isInleft = parseFloat(getComputedStyle(el).left) < window.innerWidth / 2 ? 1 : -1;
        let zValue = (cursorPosition - parseFloat(getComputedStyle(el).left)) * isInleft * 0.1;

        el.style.transform = `rotateY(${rotateDegree}deg) translateX(calc(-50% + ${-xValue * speedx}px)) translateY(calc(-50% + ${-yValue * speedy}px)) perspective(2300px) translateZ(${zValue * speedz}px)`;
    });
 }

 update(0)

 window.addEventListener("mousemove", (e) =>{
    if(timeline.isActive())return;
    
    xValue = e.clientX - window.innerWidth / 2;
    yValue = e.clientY - window.innerHeight / 2;

    rotateDegree = (xValue / (window.innerWidth/2)) * 5 

    update(e.clientX);
 });

 let timeline = gsap.timeline();

 Array.from(parallax_el)
 .filter((el) => !el.classList.contains("text"))
 .forEach((el) => {
    let top = `${(el.offsetHeight / 2) + + (el.dataset.distance)}px`
    console.log(top)
    timeline.from(
        el,
        {
        y: top,
        duration: 3.5,
        ease: "power3.out",
     },
     "1"
     );
 });


 timeline.from(
    ".text h1",
    {
    y: (window.innerHeight) - (document.querySelector(".text h1").getBoundingClientRect().top) + 200,
    duration: 3.5,
    ease: "power3.out",
 },
 "2.5"
 ).from(
    ".text h2",{
        y: -150,
        opacity: 0,
        duration: 1.5,
    },
    "3.5"
 )
 .from(".hide",{
    opacity:0,
    duration: 1.5,
 },"4");
 



 


