(function () {
    let contentNav = document.getElementById('content__nav');
    let hireBtn = document.getElementById('hire-btn');
    let sections = document.getElementsByClassName('content__section');
    let sliderBtnLeft = document.getElementById('work__btn-left');
    let sliderBtnRight = document.getElementById('work__btn-right');
    let sliderContent = document.getElementById('slider__content');
    let sliderClicked = false;

    function hashSectionChange() {
        if (document.querySelector('.content__section.active')) {
            document.querySelector('.content__section.active').classList.remove('active');
        }
        if (document.querySelector('.content__item.active')) {
            document.querySelector('.content__item.active').classList.remove('active');
        }
        document.querySelector(`.content__section.${location.hash.substring(1)}`).classList.add('active');
        document.querySelectorAll(`.content__nav a[href='${location.hash}']`)[0].parentNode.classList.add('active');
        if (document.querySelectorAll(`.content__nav a[href='${location.hash}']`)[0].parentNode.id >= 1) {
            hireBtn.classList.add('active');
        } else {
            hireBtn.classList.remove('active');
        }
    }

    window.onhashchange = () => {
        hashSectionChange();
    }

    if (location.hash) {
        hashSectionChange();
    } else {
        document.querySelectorAll('.content__item')[0].classList.add('active');
        document.querySelectorAll('.content__section')[0].classList.add('active');
    }

    contentNav.addEventListener('click', (e) => {
        if (e.target.className == 'nav__number') {
            let activeContentNav = document.querySelector('.content__item.active');
            let activeContentSection = document.querySelector('.content__section.active');
            activeContentSection.classList.remove('active');
            activeContentNav.classList.remove('active');
            e.target.parentNode.classList.add('active');
            sections[e.target.parentNode.id].classList.add('active');
            if (e.target.parentNode.id >= 1) {
                hireBtn.classList.add('active');
            } else {
                hireBtn.classList.remove('active');
            }
        }
    });

    function workSlider(direction) {
        sliderContent.classList.add('hide');
        sliderClicked = true;
        setTimeout(() => {
            let works = Array.from(document.getElementsByClassName('works__item'));
            works[1].classList.remove('main');
            if (direction == 'right') {
                let lastElement = works.pop(); //get last element of array
                works.unshift(lastElement); // add last element to the beginning of an array
            } else if (direction == 'left') {
                let firstElement = works.shift(); //get first element of array
                works.push(firstElement); //add first element to the end of an array
            }
            works[1].classList.add('main');
            for (let i = 0; i < works.length; i++) {
                sliderContent.appendChild(works[i]);
            }
            sliderContent.classList.remove('hide');
            sliderClicked = false;
        }, 300);
    }

    sliderBtnLeft.addEventListener('click', () => {
        if (!sliderClicked) {
            workSlider('left');
        }
    });

    sliderBtnRight.addEventListener('click', () => {
        if (!sliderClicked) {
            workSlider('right');
        }
    });
})();