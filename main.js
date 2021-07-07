'use strict';
// arrow function 'scroll', () => {};

// Make navbar transparent when it is on the top
const navbar = document.querySelector('#navbar');
const navbarHeight = navbar.getBoundingClientRect().height;
document.addEventListener('scroll', () => {
    // console.log(window.scrollY);
    // console.log(`navbarHeight: ${navbarHeight}`);
    if(window.scrollY > navbarHeight) {
        navbar.classList.add('navbar--dark');
    } else {
        navbar.classList.remove('navbar--dark');   
    }
});


// 2021/7/6 오후 8시 30분
// Handle scrolling when tapping on the navbar menu
const navbarMenu = document.querySelector('.navbar__menu');
navbarMenu.addEventListener('click', (event) => {
    
    const target = event.target;
    const link = target.dataset.link;
    if(link == null) {
        return;
    }
    navbarMenu.classList.remove('open');
    // console.log(event.target.dataset.link);
    // const scrollTo = document.querySelector(link);
    // scrollTo.scrollIntoView( {behavior: 'smooth'});
    scrollIntoView(link);
});



// Navbar toggle button for small screen
const navbarToggleBtn = document.querySelector('.navbar__toggle-btn');
navbarToggleBtn.addEventListener('click', () => {
    navbarMenu.classList.toggle('open');
});


// Handle click on "contact me" button on home 2021/ 7/6
const homeContactBtn = document.querySelector('.home__contact');
homeContactBtn.addEventListener('click', () => {
    scrollIntoView('#contact');
});



// Make home slowly fade to transparent as the window scrolls down
const home = document.querySelector('.home__container');
const homeHeight = home.getBoundingClientRect().height;
document.addEventListener('scroll', () => {
    // console.log(homeHeight);
    // console.log(1 - window.scrollY / homeHeight);
    home.style.opacity = 1 - window.scrollY / homeHeight;
});


// Show "arrow up" button when scrolling down
const arrowUp = document.querySelector('.arrow-up');
document.addEventListener('scroll', () => {
    if (window.scrollY > homeHeight / 2) {
        arrowUp.classList.add('visible');
    } else {
        arrowUp.classList.remove('visible');
    }
});



// Handle click on the "arrow up" button
arrowUp.addEventListener('click', () => {
    scrollIntoView('#home');
});


// Projects
const workBtnContainer = document.querySelector('.work__categories');
const projectContainer = document.querySelector('.work__projects');
const projects = document.querySelectorAll('.project');
workBtnContainer.addEventListener('click', (e) => {
    const filter = e.target.dataset.filter || e.target.parentNode.dataset.filter;
    if(filter == null) {
        return;
    }
    // console.log(filter);

    // // 추가한거
    // // Remove selection from the previous item select the new one
    const active = document.querySelector('.category__btn.selected');
    active.classList.remove('selected');
    const target = 
      e. target.nodeName === 'BUTTON' ? e.target : e.target.parentNode; // 조건이 맞으면 왼쪽에 있는것을 실행
      // 아니면 오른쪽에 있는것을 실행
    target.classList.add('selected');
    // if로 실행
    // if (active != null) {
    //     active.classList.remove('selected');
    // }
    // e.target.classList.add('selected');

    
    projectContainer.classList.add('anim-out');
// setTimeout 추가
    setTimeout(() => {
      projects.forEach((project) => {
        console.log(project.dataset.type);
        if (filter ==='*' || filter === project.dataset.type) {
            project.classList.remove('invisible'); // 필터가 전부 다거나, 필터에 해당 된다면 안보여지는 거 삭제 = 보여지도록
        } else {
            project.classList.add('invisible'); // 필터에 해당이 안된다면 안보여지도록(안보여줘여 되는 클래스 등록해준다.)
        }
    });
    projectContainer.classList.remove('anim-out');
    // project~ 전체적으로 setTimeout안으로 옮김
    // setTimeout안에 있는것들은
    // 0.3초 이후에 호출되어진다(browser로부터)
  }, 300);
});





function scrollIntoView(selector) {
    const scrollTo = document.querySelector(selector);
    scrollTo.scrollIntoView({behavior: 'smooth'});
}





