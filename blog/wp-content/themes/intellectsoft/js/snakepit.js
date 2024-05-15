if (window.NodeList && !NodeList.prototype.forEach) { // Should be moved to separate file.
  NodeList.prototype.forEach = function (callback, argument) {
    argument = argument || window
    for (let i = 0; i < this.length; i++) {
      callback.call(argument, this[i], i, this)
    }
  }
}

const owlContainer = $('.snakepit__list');

window.addEventListener("orientationchange", function () {
  handleSnakepit(owlContainer)
})

if (owlContainer.length){
  let windowPrevWidth = window.innerWidth;

  window.addEventListener('resize', () => {
    const windowWidth = window.innerWidth;
    if(windowPrevWidth < windowWidth && windowWidth > 1023) {
      location.reload();
    }
    if(windowPrevWidth > windowWidth && windowWidth < 1023){
      location.reload();
    }
  })
}

handleSnakepit(owlContainer)

if (/Android|webOS|iPhone|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
  $('.snakepit__item').each(function() {
    $(this).on('click', function() {
      window.location = $(this).find('a').attr('href');
      return false;
    })
  });
}

function handleSnakepit (owl) {
  if (owl.length > 0) {
    if (window.innerWidth <= 1023) {
      owl.owlCarousel({
        loop: true,
        autoplay: false,
        autoplayHoverPause: true,
        margin: 10,
        nav: true,
        navText: ['',''],
        center: true,
        onInitialized(event) {
          event.target.style.opacity = 1
        },
        responsive: {
          0: {
            items: 1
          },
          768: {
            items: 2
          }
        }
      })
    } else {
      owl.trigger('destroy.owl.carousel')
      initSnakepitDesktop()
    }
  }
}

function initSnakepitDesktop () {
  const snakepitList = document.querySelectorAll('.snakepit__item')
  const phoneImage = document.querySelector('.snakepit__phone')

  snakepitList.forEach(item => {
    item.addEventListener('click', ({ target }) => {
      if (target.tagName.toLowerCase() !== 'a') {
        snakepitList.forEach(item => {
          if (item.classList.contains('js-active')) {
            item.classList.remove('js-active')
          }
        })
        target.classList.add('js-active')
        phoneImage.style.backgroundImage = `url(${target.querySelector('img').getAttribute('src').replace('.jpg', '-m.png')})`
      }
    })
  })
}

const images = document.querySelectorAll('.snakepit img')
const imagesBg = document.querySelectorAll('[data-bg]')

setTimeout(() => {
  images.forEach(img => {
    const asyncImage = new Image()
    asyncImage.onload = () => {
      img.src = asyncImage.src
    }
    asyncImage.src = img.getAttribute('src')
  })

  imagesBg.forEach(img => {
    const asyncImage = new Image()
    asyncImage.onload = () => {
      img.style.backgroundImage = `url(${asyncImage.src})`
      img.style.opacity = 1
    }
    asyncImage.src = img.getAttribute('data-bg')
  })
}, 0)
