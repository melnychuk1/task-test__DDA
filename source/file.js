
// Animation
const myString = "Prof. Dr. Jochem Müller";
let myArray = myString.split("");
let loopTimer;

function looper() {
    if(myArray.length > 0){
        document.getElementById("header-title").innerHTML += myArray.shift();
    } else {
        clearTimeout(loopTimer);
    }
    loopTimer = setTimeout('looper()', 100);
}
looper();

// drop-down menu
const menu = document.getElementById('menu');
const icon = document.getElementById('icon');
icon.addEventListener('click', e => {
    if (menu.style.display === 'block'){
        menu.style.display = 'none'
    } else {
        menu.style.display = 'block';
    }
});


// Slider
$('.slider').slick({
    arrows: true,
    dots: false,
    responsive: [
        {
            breakpoint: 763,
            settings: {
                arrows: false,
                dots: true,
            }
        }
    ]
});





