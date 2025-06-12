document.addEventListener('DOMContentLoaded', () => {
     "use strict";
     const colorsButton = document.querySelectorAll('.color-circle');
     const ImageTitle = document.getElementById('colourTitle');
     colorsButton.forEach(button => {
          const { name, imagesrc, imgid } = button.dataset;
          if (ImageTitle) {
               if (button.classList.contains('active')) {
                    ImageTitle.innerText = name;
               }
          }
          let image;
          button.addEventListener('click', () => {
               if (imgid) { image = document.getElementById(imgid); }
               colorsButton.forEach(btn => btn.classList.remove('active'));
               button.classList.add('active');
               if (ImageTitle) {
                    ImageTitle.innerText = name;
               }
               if (imagesrc && image) {
                    image.setAttribute('src', imagesrc);
               }

          });
     });
     // set bottom header active tabs
     const bottomHeaderBottomLinks = document.querySelectorAll('.header-bottom-link');
     const removeActiveClass = () => {
          bottomHeaderBottomLinks.forEach(link => link.classList.remove('active'));
     };

     const setActiveLink = () => {
          const currentHash = window.location.hash;
          bottomHeaderBottomLinks.forEach(link => {
               if (link.getAttribute('href') === currentHash) {
                    link.classList.add('active');
               }
          });
     };
     setActiveLink();
     bottomHeaderBottomLinks.forEach(link => {
          link.addEventListener('click', () => {
               removeActiveClass();
               link.classList.add('active');
          });
     });

     window.addEventListener('hashchange', setActiveLink);

     // hide bottom header on scroll top
     let lastScrollTop = 100;
     const hideitem = document.getElementById('headerBottom');
     if (!hideitem) { return; }
     window.addEventListener('scroll', () => {
          const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
          if (scrollTop > lastScrollTop) {
               hideBottomheader();
          } else {
               hideitem.classList.remove('hide');
          }

          lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
     });
     function hideBottomheader() {
          hideitem.classList.add('hide');
     }
});

