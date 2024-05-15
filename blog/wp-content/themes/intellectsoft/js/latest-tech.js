;(function () {
  if(document.querySelector('.latest-teach') && window.innerWidth >= 768) {
    const parentElem = document.querySelector('.teach-items');
    const items = parentElem.querySelectorAll('.teach-item');

    let heightList = 1;
    Array.prototype.forEach.call(items, (item) => {
      parentElem.style.marginBottom = item.clientHeight + 20 + 'px';
      if (heightList < item.clientHeight) {
        heightList = item.clientHeight;
      }
      let targetElem = item.querySelector('.preview');
      targetElem.addEventListener('click', () => {
        items.forEach((oldItem) => {
          oldItem.classList.remove('active');
        });
        parentElem.style.marginBottom = targetElem.clientHeight + 20 + 'px';
        item.classList.add('active');
      })
    });

    Array.prototype.forEach.call(items, (item) => {
      let preview = item.querySelector('.preview');
      preview.style.height = heightList + 'px';
    });
  }

  if(document.querySelector('.capabilities')) {
    const parentElem = document.querySelector('.capabilities-block');
    const items = parentElem.querySelectorAll('.dev-description');

    Array.prototype.forEach.call(items, (item) => {
      item.addEventListener('click', (e) => {
        if (/active/.test(item.classList)) {
          item.classList.remove('active');
        } else {
          item.classList.add('active');
        }
      })
    });
  }
})();