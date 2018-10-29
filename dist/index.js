'use strict';

/*------------------------Slider--------------------------------------------------------*/

var slides = document.getElementsByClassName('slider-item'),
    pagginator = document.getElementById('pagginator'),
    childrens = pagginator.children,
    slider = document.getElementById('slider'),
    xDown = null,
    yDown = null,
    interval = setInterval(handleClickNext, 10000),
    prevButton = document.getElementById('prev-button'),
    nextButton = document.getElementById('next-button'),
    bagCount = document.getElementById('bag-count'),
    itemNumber = document.getElementById('item-number');

bagCount.textContent = localStorage.bagTotal || '';
itemNumber.textContent = localStorage.items ? JSON.parse(localStorage.items).length : 0;

function handleClickNext() {
    var current = void 0,
        next = void 0,
        id = void 0;
    for (var i = 0; i < slides.length; i++) {
        if (slides[i].classList.contains('current-slide')) {
            current = i;
            if (i !== slides.length - 1) next = i + 1;else next = 0;
        }
    }
    for (var _i = 0; _i < childrens.length; _i++) {
        if (childrens[_i].classList.contains('active-pagginator')) {
            if (_i !== childrens.length - 1) {
                id = _i + 1;
            } else {
                id = 0;
            }
            childrens[_i].classList.remove('active-pagginator');
            break;
        }
    }
    childrens[id].classList.add('active-pagginator');

    slides[current].style.animation = 'fade-out .5s ease forwards';
    slides[current].classList.remove('current-slide');
    slides[next].style.animation = 'fade-in .5s ease forwards';
    slides[next].classList.add('current-slide');
    clearInterval(interval);
    interval = setInterval(handleClickNext, 10000);
}

function handleClickPrev() {
    var current = void 0,
        prev = void 0,
        id = void 0;
    for (var i = 0; i < slides.length; i++) {
        if (slides[i].classList.contains('current-slide')) {
            current = i;
            if (i !== 0) prev = i - 1;else prev = slides.length - 1;
        }
    }
    for (var _i2 = 0; _i2 < childrens.length; _i2++) {
        if (childrens[_i2].classList.contains('active-pagginator')) {
            if (_i2 !== 0) {
                id = _i2 - 1;
            } else {
                id = childrens.length - 1;
            }
            childrens[_i2].classList.remove('active-pagginator');
            break;
        }
    }
    childrens[id].classList.add('active-pagginator');

    slides[current].style.animation = 'fade-out .5s ease forwards';
    slides[current].classList.remove('current-slide');
    slides[prev].style.animation = 'fade-in .5s ease forwards';
    slides[prev].classList.add('current-slide');
    clearInterval(interval);
    interval = setInterval(handleClickNext, 10000);
}

/*Add navigation buttons*/
for (var i = 0; i < slides.length; i++) {
    var li = document.createElement('li');
    if (i === 0) li.classList.add('active-pagginator');
    li.dataset.id = i;
    pagginator.appendChild(li);
}

function handlePagginator(e) {
    var target = e.target;

    if (target.tagName !== 'LI') return;

    var current = void 0,
        id = target.dataset.id;
    for (var _i3 = 0; _i3 < slides.length; _i3++) {
        if (slides[_i3].classList.contains('current-slide')) {
            current = _i3;
        }
    }
    for (var _i4 = 0; _i4 < childrens.length; _i4++) {
        if (childrens[_i4].classList.contains('active-pagginator')) {
            childrens[_i4].classList.remove('active-pagginator');
            break;
        }
    }
    childrens[id].classList.add('active-pagginator');

    slides[current].style.animation = 'fade-out .5s ease forwards';
    slides[current].classList.remove('current-slide');
    slides[id].style.animation = 'fade-in .5s ease forwards';
    slides[id].classList.add('current-slide');
    clearInterval(interval);
    interval = setInterval(handleClickNext, 10000);
}

function handleTouchStart(e) {
    xDown = e.touches[0].clientX;
    yDown = e.touches[0].clientY;
}

function handleTouchMove(e) {
    var target = e.target;

    if (target.classList.contains('image') === false) return;

    if (!xDown || !yDown) {
        return;
    }

    var xUp = e.touches[0].clientX,
        yUp = e.touches[0].clientY,
        xDiff = xDown - xUp,
        yDiff = yDown - yUp;

    if (Math.abs(xDiff) > Math.abs(yDiff)) {
        if (xDiff > 0) {
            handleClickNext();
        } else {
            handleClickPrev();
        }
    } else {
        return;
    }
    xDown = null;
    yDown = null;
}

slider.addEventListener('touchstart', handleTouchStart, false);
slider.addEventListener('touchmove', handleTouchMove, false);
pagginator.addEventListener('click', handlePagginator);
prevButton.addEventListener('click', handleClickPrev);
nextButton.addEventListener('click', handleClickNext);