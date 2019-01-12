(function () {
    let contentNavButtons = document.querySelectorAll('.content__item');
    let contentNav = document.getElementById('content__nav');

    contentNav.addEventListener('click', (e) => {
        if (e.target.className == 'nav__number') {
            let activeContentNav = document.querySelector('.content__item.active');
            activeContentNav.classList.remove('active');
            e.target.parentNode.classList.add('active');
        }
    });
})();