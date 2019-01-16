(function () {
    let contentNav = document.getElementById('content__nav');
    let hireBtn = document.getElementById('hire-btn');
    let sections = document.getElementsByClassName('content__section');
    let activePage = 0;
    let sliderBtnLeft = document.getElementById('work__btn-left');
    let sliderBtnRight = document.getElementById('work__btn-right');
    let sliderContent = document.getElementById('slider__content');
    let sliderClicked = false;
    let navBtn = document.getElementById('nav-btn');
    let perspective = document.getElementById('perspective');
    let main = document.getElementById('main');
    let navActive = false;
    let navCloseBtn = document.getElementById('nav-close');

    function hashSectionChange() {
        if (document.querySelector('.content__section.active')) {
            document.querySelector('.content__section.active').classList.remove('active');
        }
        if (document.querySelector('.content__item.active')) {
            document.querySelector('.content__item.active').classList.remove('active');
        }
        if (document.querySelector('.nav__link a.active')) {
            document.querySelector('.nav__link a.active').classList.remove('active');
        }
        document.querySelector(`.content__section.${location.hash.substring(1)}`).classList.add('active');
        document.querySelectorAll(`.content__nav a[href='${location.hash}']`)[0].parentNode.classList.add('active');
        document.querySelectorAll(`.nav__link a[href='${location.hash}']`)[0].classList.add('active');
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
            activePage = parseInt(e.target.parentNode.id);
            e.target.parentNode.classList.add('active');
            sections[e.target.parentNode.id].classList.add('active');
            if (e.target.parentNode.id >= 1) {
                hireBtn.classList.add('active');
            } else {
                hireBtn.classList.remove('active');
            }
        }
    });

    function changePageOnScroll(direction) {
        let activeContentNav = document.querySelector('.content__item.active');
        let activeContentSection = document.querySelector('.content__section.active');
        let allContentNav = document.querySelectorAll('.content__item');
        let allContentSection = document.querySelectorAll('.content__section');
        let url = '';
        let sectionPositionStyle = getComputedStyle(allContentSection[0]).getPropertyValue('position');
        if (sectionPositionStyle == 'absolute') {
            switch(direction) {
                case 'up':
                    activeContentSection.classList.remove('active');
                    activeContentNav.classList.remove('active');
                    activePage -= 1;
                    if (activePage < 0) {
                        activePage = 4;
                    }
                    allContentNav[activePage].classList.add('active');
                    allContentSection[activePage].classList.add('active');
                    url = document.querySelector(`[id="${activePage}"]`).childNodes[1].href;
                    location.hash = url.split('#')[1];
                    break;
                case 'down':
                    activeContentSection.classList.remove('active');
                    activeContentNav.classList.remove('active');
                    activePage += 1;
                    if (activePage > 4) {
                        activePage = 0;
                    }
                    url = document.querySelector(`[id="${activePage}"]`).childNodes[1].href;
                    location.hash = url.split('#')[1];
                    allContentNav[activePage].classList.add('active');
                    allContentSection[activePage].classList.add('active');
                    break;
                default: break;
            }
        }
    }

    document.addEventListener('wheel', (e) => {
        if (!navActive) {
            if (e.deltaY > 0 ) {
                changePageOnScroll('down');
            } else {
                changePageOnScroll('up');
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

    navBtn.addEventListener('click', () => {
        perspective.classList.add('active');
        main.classList.add('active');
        setTimeout(() => {
            navActive = true;
        }, 300);
    });

    navCloseBtn.addEventListener('click', () => {
        if (navActive) {
            main.classList.remove('active');
            setTimeout(() => {
                perspective.classList.remove('active');
                navActive = false;
            }, 300);
        }
    })

    main.addEventListener('click', () => {
        if (navActive) {
            main.classList.remove('active');
            setTimeout(() => {
                perspective.classList.remove('active');
                navActive = false;
            }, 300);
        }
    });
})();