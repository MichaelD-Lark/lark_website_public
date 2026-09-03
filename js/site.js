/* Lark Vineyard — site behaviour
   1. Access guard for pages behind the secret code.
   2. The secret-code prompt on the landing page.

   NOTE: this is a soft gate, not security. The code below is readable by
   anyone who views source, so it keeps the site out of casual sight only —
   it must not be relied on to protect anything sensitive. */

(function () {
  'use strict';

  var ACCESS_CODE = 'LarkAbout';
  var ERROR_MESSAGE = 'You broke the cork!';
  var STORAGE_KEY = 'lark-access';
  var ENTRY_PAGE = 'index.html';
  var SITE_PAGE = 'home.html';

  function readAccess() {
    try {
      return sessionStorage.getItem(STORAGE_KEY) === 'granted';
    } catch (err) {
      // Storage blocked (private mode, cookies disabled). Fail open rather
      // than lock a legitimate visitor out of the site entirely.
      return true;
    }
  }

  function grantAccess() {
    try {
      sessionStorage.setItem(STORAGE_KEY, 'granted');
    } catch (err) {
      /* Nothing to do — navigation still proceeds. */
    }
  }

  /* --- Guard -------------------------------------------------------------
     Runs before <body> is parsed (the script is not deferred) so a protected
     page never flashes its content before redirecting. */
  if (document.documentElement.getAttribute('data-requires-code') === 'true' && !readAccess()) {
    window.location.replace(ENTRY_PAGE);
    return;
  }

  /* --- Secret-code prompt ----------------------------------------------- */
  function initGate() {
    var trigger = document.querySelector('[data-code-trigger]');
    var dialog = document.querySelector('[data-code-dialog]');

    if (!trigger || !dialog) {
      return;
    }

    var form = dialog.querySelector('[data-code-form]');
    var input = dialog.querySelector('#gate-code');
    var error = dialog.querySelector('[data-code-error]');
    var cancel = dialog.querySelector('[data-code-cancel]');

    function open() {
      error.textContent = '';
      form.reset();

      if (typeof dialog.showModal === 'function') {
        dialog.showModal();
      } else {
        dialog.setAttribute('open', ''); // Browsers without showModal().
      }

      input.focus();
    }

    function close() {
      if (typeof dialog.close === 'function') {
        dialog.close();
      } else {
        dialog.removeAttribute('open');
      }
    }

    trigger.addEventListener('click', open);
    cancel.addEventListener('click', close);

    form.addEventListener('submit', function (event) {
      event.preventDefault();

      if (input.value.trim() === ACCESS_CODE) {
        grantAccess();
        window.location.href = SITE_PAGE;
        return;
      }

      error.textContent = ERROR_MESSAGE;
      input.select();
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initGate);
  } else {
    initGate();
  }
})();
