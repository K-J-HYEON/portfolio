'use strict';
// arrow function 'scroll', () => {};

// Make navbar transparent when it is on the top
const navbar = document.querySelector('#navbar');
const navbarHeight = navbar.getBoundingClientRect().height;
document.addEventListener('scroll', () => {
    // console.log(window.scrollY);
    // console.log(`navbarHeight: ${navbarHeight}`);
    if (window.scrollY > navbarHeight) {
        navbar.classList.add('navbar--dark');
    } else {
        navbar.classList.remove('navbar--dark');
    }
});


// 2021/7/6 오후 8시 30분
// Handle scrolling when tapping on the navbar menu
const navbarMenu = document.querySelector('.navbar__menu');



// navbarmenu을 클릭하게 되면
navbarMenu.addEventListener('click', (event) => {

    const target = event.target;
    const link = target.dataset.link;
    if (link == null) {
        return;
    }
    navbarMenu.classList.remove('open');


    // console.log(event.target.dataset.link);
    // const scrollTo = document.querySelector(link);
    // scrollTo.scrollIntoView( {behavior: 'smooth'});

    // 해당하는 곳으로 이동하게 되있다.
    scrollIntoView(link);
    //21/7/8 추가

    // 수동적으로 선택되게 되어있다.
    // selectNavItem(target);
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
    if (filter == null) {
        return;
    }
    // console.log(filter);

    // // 추가한거
    // // Remove selection from the previous item select the new one
    const active = document.querySelector('.category__btn.selected');
    active.classList.remove('selected');
    const target =
        e.target.nodeName === 'BUTTON' ? e.target : e.target.parentNode; // 조건이 맞으면 왼쪽에 있는것을 실행
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
            if (filter === '*' || filter === project.dataset.type) {
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

// 버튼 클릭스 활성화 처리
// function 자리를 옮김





// 1. 모든 섹션 요소들과 메뉴아이템들을 가지고 온다.
// 2. IntersectionObserve를 이용해서 모든 섹션들을 관찰한다.
// 3. 보여지는 섹션에 해당하는 메뉴 아이템을 활성화 시킨다.

// 각각의 아이디를 가지고 있는 배열

// sectionIds 배열에 우리가 사용하는 모든 아이디를 문자열로
// 배열로 저장해둠
const sectionIds = [
    '#home',
    '#about',
    '#skills',
    '#work',
    '#testimonials',
    '#contact'
];


// map
// 모든 섹션 요소들을  sections라는 배열에 할당해 두었고
const sections = sectionIds.map(id => document.querySelector(id));
// 동일한 내비게이션 메뉴아이템 요소들을 navItems로 할당해 두었다.
const navItems = sectionIds.map(id =>
    document.querySelector(`[data-link="${id}"]`)
);


// 현재 선택된 메뉴인덱스와 메뉴요소를 변수에 저장해 둠
let selectedNavIndex = 0;
let selectedNavItem = navItems[0];
function selectNavItem(selected) { // 새로운 메뉴아이템을 선택할 때 마다
    selectedNavItem.classList.remove('active'); // 이전에 활성화된 아이를 지워주고 
    // selectedNavItem = navItems[selectedIndex];/
    selectedNavItem = selected; // 다시 새롭게 할당하고 나서 
    selectedNavItem.classList.add('active') // active를 지정해 주었다.
}


// 버튼 클릭스 활성화 처리
// function 자리 옮겼음

// 스크롤이 되면 위에서 선언된
//scrollIntoView라는 함수를 호출한다면
// 그 안에 내부적으로 처리가 되기 때문에
// 더 이상 빠진 게 없는지 걱정하지 않아도 된다.
function scrollIntoView(selector) {
    const scrollTo = document.querySelector(selector);
    scrollTo.scrollIntoView({ behavior: 'smooth' });
    // navItems 인덱스를 전달해 주면 된다.
    // sections라는 배열안에 우리가 사용하는 모든 아이디의 이름들이 들어있다.
    selectNavItem(navItems[sections.indexOf(selector)]);
}


const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.3
}





// 콜백안에서 해당하는 섹션을 찾아서 navbar메뉴를 활성화 시키기
const observerCallback = (entries, observer) => {
    entries.forEach(entry => {
        if (!entry.isIntersecting && entry.intersectionRatio > 0) {
            // console.log(entry);
            const index = sectionIds.indexOf(`#${entry.target.id}`); //인터섹션 옵저버를 이용해서
            // let selectedIndex;
            // console.log(index, entry.target.id);

            // 스크롤링이 아래로 되어서 페이지가 올라옴
            if (entry.boundingClientRect.y < 0) { //섹션이 밖으로 나갈때 마다 
                selectedNavIndex = index + 1; // 그 다음에 해당하는 인덱스를 계산해서 할당해 둠
            } else {
                selectedNavIndex = index - 1;
            }
        }
    });
};



const observer = new IntersectionObserver(observerCallback, observerOptions);
sections.forEach(section => observer.observe(section));



// 스크롤링 될때마다 해당하는 메뉴선택되게하기
window.addEventListener('scroll', () => { //위에 인덱스를 활용해서 스크롤이 사용자가 스크롤링 할 때
    if (window.scrollY === 0) {
        selectedNavIndex = 0; // 스크롤이 제일 위라면 제일 위에 있는 인덱스를 설정하고
    } else if (
        Math.round(window.scrollY + window.innerHeight) >=
        document.body.clientHeight
    ) {
        selectedNavIndex = navItems.length - 1; // 제일 아래라면 마지막의 메뉴 아이템을 선택
    } // 중간에 있는 거라면 인터섹션 옵저버에서 계산된 navIndex를 이용해서 메뉴 아이템을 찾았다.
    selectNavItem(navItems[selectedNavIndex]);
})