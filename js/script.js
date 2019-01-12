(function () {
    let contentNav = document.getElementById('content__nav');
    let sections = document.getElementsByClassName('content__section');

    if (location.hash) {
        document.querySelector(`.content__section.${location.hash.substring(1)}`).classList.add('active');
        document.querySelectorAll(`a[href='${location.hash}']`)[0].parentNode.classList.add('active');
    } else {
        document.querySelectorAll('.content__item')[0].classList.add('active');
        document.querySelectorAll('.content__section')[0].classList.add('active');
    }

    contentNav.addEventListener('click', (e) => {
        if (e.target.className == 'nav__number') {
            let activeContentNav = document.querySelector('.content__item.active'),
                activeContentSection = document.querySelector('.content__section.active');
            activeContentSection.classList.remove('active');
            activeContentNav.classList.remove('active');
            e.target.parentNode.classList.add('active');
            sections[e.target.parentNode.id].classList.add('active');
        }
    });
})();