import 'normalize.css';
import '../css/style.css';
import '@fortawesome/fontawesome-free/css/all.css';
import 'fslightbox';

const $ = function (selector) {
    return document.querySelector(selector);
};

window.addEventListener('scroll', () => {
    const scrollPosition = window.scrollY;
    const headerHeight = $('.header').clientHeight;

    if (scrollPosition >= headerHeight) {
        $('.header').classList.add('header--scrolled');
    } else {
        $('.header').classList.remove('header--scrolled');
    }
});

$(".nav-toggle").addEventListener("click", () => {
    $(".header").classList.toggle("header--open");
});

const navLinks = Array.from(document.querySelectorAll(".nav a"));

for (const navLink of navLinks) {
    navLink.addEventListener("click", () => {
        $(".header").classList.remove("header--open");
    });
}

$('.js-load-more').addEventListener('click', function (event) {
    event.preventDefault();

    const href = this.getAttribute('href');
    const container = $('.js-container');

    fetch(href)


        .then((r) => r.text()).then((text) => {
            const parser = new DOMParser();
            const html = parser.parseFromString(text, 'text/html');
            const items = Array.from(html.querySelectorAll('.js-item'));
            const nextURL = html.querySelector('.js-load-more').getAttribute('href');

            for (const item of items) {
                container.appendChild(item)
            }

            this.setAttribute('href', nextURL);
        })
})



