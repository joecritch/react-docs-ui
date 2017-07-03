const supportPageOffset = window.pageXOffset !== undefined;
const isCSS1Compat = (document.compatMode || '') === 'CSS1Compat';

const getScrollTop = () => {
  return supportPageOffset
    ? window.pageYOffset
    : isCSS1Compat
      ? document.documentElement.scrollTop
      : document.body.scrollTop;
};

const getOffsetTop = function(node) {
  return node.getBoundingClientRect().top + getScrollTop();
};

let ticking = false;
let hasScrolled = false;

let prevScrollTop = null;
let isSticky = false;
let isAtBottom = false;

let nav = null;
let navOuter = null;
let navInner = null;
let navBounds = null;
let header = null;

let navHeight;
let windowHeight;
let navTopRect;
let navInnerHeight;
let navOuterWidth;
let navBoundsHeight;
let headerHeight;
let navBoundsTopRect;

const update = (evt) => {
  if (hasScrolled === false) {
    hasScrolled = true;
  }

  const diff = scrollTop - prevScrollTop;
  const navOffsetTop = getOffsetTop(nav);
  const navBottom = navOffsetTop + navHeight;
  const navPositionTop = parseInt(navInner.style.top || headerHeight, 10);
  const navIsLarger = navHeight > windowHeight;
  const navBoundsBottom = getOffsetTop(navBounds) + navBoundsHeight;
  const shouldBeAtBottom = (scrollTop + navInnerHeight + navPositionTop) > navBoundsBottom;
  const shouldBeSticky = navOffsetTop < (scrollTop + headerHeight);

  console.log('diff', diff);

  prevScrollTop = scrollTop;

  if (shouldBeSticky && shouldBeAtBottom === false) {
    if (isSticky === false) {
      nav.style.height = navInnerHeight + 'px';
      nav.style.width = navOuterWidth + 'px';
      nav.classList.add('is-sticky');
      isSticky = true;
    }
  } else {
    if (isSticky === true) {
      nav.style.height = null;
      nav.style.width = null;
      nav.classList.remove('is-sticky');
      isSticky = false;
    }
  }

  if (shouldBeAtBottom === true) {
    if (isAtBottom === false) {
      nav.classList.add('is-at-bottom');
      isAtBottom = true;
      navInner.style.top = null;
    }
  } else {
    if (isAtBottom === true) {
      nav.classList.remove('is-at-bottom');
      isAtBottom = false;
    }
  }

  if (navIsLarger && isSticky) {
    const minOffset = 0 - ((navHeight) - windowHeight);
    const maxOffset = headerHeight;
    let newTop = (navPositionTop - diff);
    newTop = Math.max(minOffset, newTop);
    newTop = Math.min(maxOffset, newTop);
    navInner.style.top = newTop + 'px';
  }

  // Allow further rAFs to be called
  ticking = false;
};

const cacheDimensions = () => {
  navHeight = nav.offsetHeight;
  windowHeight = window.innerHeight;
  navTopRect = nav.getBoundingClientRect().top;
  navInnerHeight = navInner.offsetHeight;
  navOuterWidth = navOuter.offsetWidth;
  navBoundsHeight = navBounds.offsetHeight;
  navBoundsTopRect = navBounds.getBoundingClientRect().top;
  headerHeight = header.offsetHeight;
};

const destroy = () => {
  prevScrollTop = null;
  isSticky = false;
  isAtBottom = false;
  navInner.style.top = null;
  nav.style.height = null;
  nav.style.width = null;
  ticking = false;
  console.log('destroyed');
};

const requestTick = () => {
  if (!ticking) {
    requestAnimationFrame(update);
    ticking = true;
  }
};

const handleWindowScroll = () => {
  scrollTop = getScrollTop();
  requestTick();
};

const handleWindowLoad = () => {
  cacheDimensions();
  if (hasScrolled === false) {
    handleWindowScroll();
  }
};

const handleWindowResize = () => {
  cacheDimensions();
  destroy();
  handleWindowScroll();
};

ready(() => {
  nav = document.getElementById('nav');
  navOuter = document.getElementById('nav_outer');
  navInner = document.getElementById('nav_inner');
  navBounds = document.getElementById('nav_bounds');
  header = document.getElementById('header');
  window.addEventListener('scroll', handleWindowScroll);
  window.addEventListener('resize', debounce(handleWindowResize, 200));
  window.addEventListener('load', handleWindowLoad);
  cacheDimensions();
});
