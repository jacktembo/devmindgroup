if (document.querySelector('.case-fixed__item')) {

  controller = new ScrollMagic.Controller();
  fixedScene = {};
  scene1 = {};
  scene2 = {};
  scene3 = {};

  initilizationScroll();

  function destroing() {
    if (inited) {
      inited = false;
      controller.destroy(true);
      scene1.destroy(true);
      scene2.destroy(true);
      scene3.destroy(true);
    }
  }

  function init() {
    inited = true;
    fixedScene = new ScrollMagic.Scene({
      triggerElement: "#pinned-trigger1", // point of execution
      duration: getFixedOffset() - getItemHeight(),
      triggerHook: 0,
      pushFollowers: 0,
      // pin the element for a total of 400px
    })
        .setPin("#pinned-element") // the element we want to pin
        .addTo(controller);

    scene1 = new ScrollMagic.Scene({
      triggerElement: '#solution',
      duration: getItemHeight(),
    })
        .on('enter', function () {
          toggleVisibility('solution');
        })
        .on('leave', function () {

        })
        .addTo(controller);

    scene2 = new ScrollMagic.Scene({
      triggerElement: '#impact',
      duration: getItemHeight(),
    })
        .on('enter', function () {
          toggleVisibility('impact');
        })
        .on('leave', function () {
        })
        .addTo(controller);

    scene3 = new ScrollMagic.Scene({
      triggerElement: '#pinned-trigger1',
      duration: getItemHeight(),
    })
        .on('enter', function () {
          toggleVisibility('challenge');
        })
        .on('leave', function () {
        })
        .addTo(controller);
  }


  function initilizationScroll() {
    const imgCont = document.querySelector('#pinned-trigger1 .img');
    let windowPrevWidth = $(window).width();
    let windowPrevHeight = $(window).height();
    if (window.outerWidth > 1024) {
      init();
    } else {
      imgCont.classList.remove('img');
      imgCont.classList.add('img-container');
    }

    $(window).resize(() => {
      if (($(window).width() != windowPrevWidth) || ($(window).height() != windowPrevHeight)) {
        windowPrevWidth = $(window).width();
        windowPrevHeight = $(window).height();
        if ($(window).width() > 1024) {
          window.location.reload(true);
        } else {
          imgCont.classList.remove('img');
          imgCont.classList.add('img-container');
          destroing();
        }
      }
    })
  }

  function toggleVisibility(visibleElement) {
    const images = document.querySelectorAll('#pinned-element img');

    images.forEach((item) => {
      if (item.dataset['item'] === visibleElement) {
        item.classList.remove('case-fixed__hidden-image');
      } else {
        item.classList.add('case-fixed__hidden-image');
      }
    })
  }

  function getFixedOffset() {
    const blocks = Array.prototype.slice.call(document.querySelectorAll('.case-fixed__item'));

    return blocks.reduce((result, item) => {
      return result + item.offsetHeight;
    }, 0)
  }

  function getItemHeight() {
    const block = document.querySelector('.case-fixed__item');
    return block.offsetHeight;
  }
}
