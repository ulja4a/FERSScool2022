


const burger = document.querySelector(".hamburger");
const burgerPets = document.querySelector(".hamburger__linepets");
const stop = document.querySelector(".stop");
const menu = document.querySelector(".header__navigation");
const headerLink = document.querySelectorAll(".header__link");
const headerLinkLite = document.querySelectorAll(".header__link-lite");

console.log(burger);
console.log(stop);
window.onload = function () {

}
(function () {
    burger.addEventListener('click', ()=>{
        menu.classList.toggle('header__navigation_activ');
        stop.classList.toggle('noscroll');
        burger.classList.remove('hamburger_pets');
        burger.classList.toggle('hamburger_close');
        burgerPets.classList.remove('hamburger__linepets');
        burgerPets.classList.add('hamburger__line');
        
    })
    
    
}());

if (window.innerWidth < 768)
    {
        for (let i=0; i<headerLink.length; i++) {
            headerLink[i].addEventListener('click', ()=>{
                menu.classList.remove('header__navigation_activ');
                stop.classList.remove('noscroll');
                burger.classList.remove('hamburger_close');
            })
        }
        for (let i=0; i<headerLinkLite.length; i++) {
            headerLinkLite[i].addEventListener('click', ()=>{
                menu.classList.remove('header__navigation_activ');
                stop.classList.remove('noscroll');
                burger.classList.remove('hamburger_close');
            })
        }
    };