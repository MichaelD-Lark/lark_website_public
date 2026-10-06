/* Lark Vineyard — site behaviour
   Redirect from landing page to home page after 2 seconds. */

(function () {
  'use strict';

  var ENTRY_PAGE = 'index.html';
  var SITE_PAGE = 'home.html';

  /* Check if we're on the landing page and redirect after 2 seconds */
  var currentPage = window.location.pathname.split('/').pop() || 'index.html';

  if (currentPage === ENTRY_PAGE || currentPage === '') {
    function initLandingRedirect() {
      var logo = document.querySelector('.landing__logo');

      /* Fade out the logo after 0.5 seconds, then redirect */
      if (logo) {
        setTimeout(function () {
          logo.classList.add('landing__logo--fade-out');
        }, 500);
      }

      setTimeout(function () {
        window.location.href = SITE_PAGE;
      }, 2000);
    }

    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', initLandingRedirect);
    } else {
      initLandingRedirect();
    }
  }
})();
