// //step 1: get DOM
// let nextDom = document.getElementById('next');
// let prevDom = document.getElementById('prev');

// let carouselDom = document.querySelector('.carousel');
// let SliderDom = carouselDom.querySelector('.carousel .list');
// let thumbnailBorderDom = document.querySelector('.carousel .thumbnail');
// let thumbnailItemsDom = thumbnailBorderDom.querySelectorAll('.item');
// let timeDom = document.querySelector('.carousel .time');

// thumbnailBorderDom.appendChild(thumbnailItemsDom[0]);
// let timeRunning = 3000;
// let timeAutoNext = 7000;

// nextDom.onclick = function(){
//     showSlider('next');    
// }

// prevDom.onclick = function(){
//     showSlider('prev');    
// }
// let runTimeOut;
// let runNextAuto = setTimeout(() => {
//     next.click();
// }, timeAutoNext)
// function showSlider(type){
//     let  SliderItemsDom = SliderDom.querySelectorAll('.carousel .list .item');
//     let thumbnailItemsDom = document.querySelectorAll('.carousel .thumbnail .item');
    
//     if(type === 'next'){
//         SliderDom.appendChild(SliderItemsDom[0]);
//         thumbnailBorderDom.appendChild(thumbnailItemsDom[0]);
//         carouselDom.classList.add('next');
//     }else{
//         SliderDom.prepend(SliderItemsDom[SliderItemsDom.length - 1]);
//         thumbnailBorderDom.prepend(thumbnailItemsDom[thumbnailItemsDom.length - 1]);
//         carouselDom.classList.add('prev');
//     }
//     clearTimeout(runTimeOut);
//     runTimeOut = setTimeout(() => {
//         carouselDom.classList.remove('next');
//         carouselDom.classList.remove('prev');
//     }, timeRunning);

//     clearTimeout(runNextAuto);
//     runNextAuto = setTimeout(() => {
//         next.click();
//     }, timeAutoNext)
// }

let nextDom = document.getElementById('next');
let prevDom = document.getElementById('prev');

let carouselDom = document.querySelector('.carousel');
let SliderDom = carouselDom.querySelector('.carousel .list');
let thumbnailBorderDom = document.querySelector('.carousel .thumbnail');
let thumbnailItemsDom = thumbnailBorderDom.querySelectorAll('.item');
let timeDom = document.querySelector('.carousel .time');

thumbnailBorderDom.appendChild(thumbnailItemsDom[0]);
let timeRunning = 3000;
let timeAutoNext = 7000;
let timeMoveThumbnail = 10000; // Time after which thumbnail is moved to the back

nextDom.onclick = function() {
    showSlider('next');
}

prevDom.onclick = function() {
    showSlider('prev');
}

let runTimeOut;
let runNextAuto = setTimeout(() => {
    nextDom.click();
}, timeAutoNext);

function showSlider(type) {
    let SliderItemsDom = SliderDom.querySelectorAll('.carousel .list .item');
    let thumbnailItemsDom = document.querySelectorAll('.carousel .thumbnail .item');
    
    if (type === 'next') {
        SliderDom.appendChild(SliderItemsDom[0]);
        thumbnailBorderDom.appendChild(thumbnailItemsDom[0]);
        carouselDom.classList.add('next');
    } else {
        SliderDom.prepend(SliderItemsDom[SliderItemsDom.length - 1]);
        thumbnailBorderDom.prepend(thumbnailItemsDom[thumbnailItemsDom.length - 1]);
        carouselDom.classList.add('prev');
    }
    clearTimeout(runTimeOut);
    runTimeOut = setTimeout(() => {
        carouselDom.classList.remove('next');
        carouselDom.classList.remove('prev');
    }, timeRunning);

    clearTimeout(runNextAuto);
    runNextAuto = setTimeout(() => {
        nextDom.click();
    }, timeAutoNext);
}

function moveThumbnailToEnd() {
    let thumbnailItemsDom = thumbnailBorderDom.querySelectorAll('.item');
    thumbnailBorderDom.appendChild(thumbnailItemsDom[0]);
}

setInterval(moveThumbnailToEnd, timeMoveThumbnail);


document.addEventListener("DOMContentLoaded", () => {
    const carousel = document.querySelector(".carousel");
    const list = carousel.querySelector(".list");
    const items = list.querySelectorAll(".item");
    const nextButton = carousel.querySelector("#next");
    const prevButton = carousel.querySelector("#prev");
    const timeBar = carousel.querySelector(".time");
    let currentIndex = 0;
    let isAnimating = false;

    function showItem(index) {
        isAnimating = true;
        items.forEach((item, i) => {
            item.classList.remove("show", "hide", "incoming");
            if (i === index) {
                item.classList.add("show");
            } else if (i === currentIndex) {
                item.classList.add("hide");
            } else {
                item.classList.add("incoming");
            }
        });
        currentIndex = index;
        timeBar.style.animation = "none";
        setTimeout(() => {
            timeBar.style.animation = "";
            timeBar.style.animation = "runningTime 3s linear 1 forwards";
        }, 0);
        setTimeout(() => {
            isAnimating = false;
        }, 500);
    }

    nextButton.addEventListener("click", () => {
        if (!isAnimating) {
            carousel.classList.add("next");
            let nextIndex = (currentIndex + 1) % items.length;
            showItem(nextIndex);
            setTimeout(() => {
                carousel.classList.remove("next");
            }, 500);
        }
    });

    prevButton.addEventListener("click", () => {
        if (!isAnimating) {
            carousel.classList.add("prev");
            let prevIndex = (currentIndex - 1 + items.length) % items.length;
            showItem(prevIndex);
            setTimeout(() => {
                carousel.classList.remove("prev");
            }, 500);
        }
    });

    // Initialize first item
    showItem(currentIndex);
});
