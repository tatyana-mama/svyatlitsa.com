/* form-validator.js v1.0 — LABS67
   Phone: country codes + search + format mask
   Name: letters only (Unicode), min 2 chars
   Service: must be selected
   Date: min today, max 6 months
   Confirmation: required checkbox before submit */

(function () {
  'use strict';

  /* ── Country codes ── */
  var COUNTRIES = [
    { code: '+48',  iso: 'PL', name: 'Polska',        mask: '### ### ###' },
    { code: '+375', iso: 'BY', name: 'Беларусь',      mask: '## ###-##-##' },
    { code: '+380', iso: 'UA', name: 'Україна',        mask: '## ### ## ##' },
    { code: '+7',   iso: 'RU', name: 'Россия',         mask: '### ###-##-##' },
    { code: '+49',  iso: 'DE', name: 'Deutschland',    mask: '### #######' },
    { code: '+33',  iso: 'FR', name: 'France',         mask: '# ## ## ## ##' },
    { code: '+44',  iso: 'GB', name: 'United Kingdom', mask: '#### ######' },
    { code: '+34',  iso: 'ES', name: 'Espana',         mask: '### ### ###' },
    { code: '+39',  iso: 'IT', name: 'Italia',         mask: '### ### ####' },
    { code: '+351', iso: 'PT', name: 'Portugal',       mask: '### ### ###' },
    { code: '+81',  iso: 'JP', name: 'Japan',          mask: '##-####-####' },
    { code: '+82',  iso: 'KR', name: 'Korea',          mask: '##-####-####' },
    { code: '+1',   iso: 'US', name: 'USA / Canada',   mask: '(###) ###-####' },
    { code: '+43',  iso: 'AT', name: 'Osterreich',     mask: '### #######' },
    { code: '+41',  iso: 'CH', name: 'Schweiz',        mask: '## ### ## ##' },
    { code: '+31',  iso: 'NL', name: 'Nederland',      mask: '# ########' },
    { code: '+46',  iso: 'SE', name: 'Sverige',        mask: '## ### ## ##' },
    { code: '+47',  iso: 'NO', name: 'Norge',          mask: '### ## ###' },
    { code: '+45',  iso: 'DK', name: 'Danmark',        mask: '## ## ## ##' },
    { code: '+358', iso: 'FI', name: 'Suomi',          mask: '## ### ####' },
    { code: '+420', iso: 'CZ', name: 'Cesko',          mask: '### ### ###' },
    { code: '+421', iso: 'SK', name: 'Slovensko',      mask: '### ### ###' },
    { code: '+36',  iso: 'HU', name: 'Magyarorszag',   mask: '## ### ####' },
    { code: '+40',  iso: 'RO', name: 'Romania',        mask: '### ### ###' },
    { code: '+359', iso: 'BG', name: 'Bulgaria',       mask: '### ### ###' },
    { code: '+370', iso: 'LT', name: 'Lietuva',        mask: '### #####' },
    { code: '+371', iso: 'LV', name: 'Latvija',        mask: '## ### ###' },
    { code: '+372', iso: 'EE', name: 'Eesti',          mask: '#### ####' },
    { code: '+90',  iso: 'TR', name: 'Turkiye',        mask: '### ### ## ##' },
    { code: '+972', iso: 'IL', name: 'Israel',         mask: '##-###-####' },
    { code: '+971', iso: 'AE', name: 'UAE',            mask: '## ### ####' },
    { code: '+61',  iso: 'AU', name: 'Australia',      mask: '### ### ###' },
    { code: '+55',  iso: 'BR', name: 'Brasil',         mask: '## #####-####' },
    { code: '+86',  iso: 'CN', name: 'China',          mask: '### #### ####' },
    { code: '+91',  iso: 'IN', name: 'India',          mask: '##### #####' }
  ];

  var DEFAULT_COUNTRY = '+48'; // Poland

  /* ── Helpers ── */
  function qs(sel, ctx) { return (ctx || document).querySelector(sel); }
  function qsa(sel, ctx) { return (ctx || document).querySelectorAll(sel); }
  function ce(tag, cls, html) {
    var el = document.createElement(tag);
    if (cls) el.className = cls;
    if (html) el.innerHTML = html;
    return el;
  }

  function findCountry(code) {
    for (var i = 0; i < COUNTRIES.length; i++) {
      if (COUNTRIES[i].code === code) return COUNTRIES[i];
    }
    return COUNTRIES[0];
  }

  /* ── Apply mask to digits ── */
  function applyMask(digits, mask) {
    var result = '', di = 0;
    for (var i = 0; i < mask.length && di < digits.length; i++) {
      if (mask[i] === '#') { result += digits[di++]; }
      else { result += mask[i]; }
    }
    // append remaining digits without mask
    if (di < digits.length) result += digits.substring(di);
    return result;
  }

  function digitsOnly(str) { return str.replace(/\D/g, ''); }

  /* ── Name validation: Unicode letters, spaces, hyphens, apostrophes, min 2 chars ── */
  // Matches letters from any script (Cyrillic, Latin, CJK, Arabic, etc.)
  var NAME_RE = /^[\p{L}\s'\-]{2,60}$/u;
  // Fallback for older browsers
  var NAME_RE_FALLBACK = /^[a-zA-Z\u00C0-\u024F\u0400-\u04FF\u0500-\u052F\u1100-\u11FF\u3040-\u309F\u30A0-\u30FF\u4E00-\u9FFF\uAC00-\uD7AF\u0600-\u06FF\s'\-]{2,60}$/;

  function isValidName(val) {
    var v = val.trim();
    if (v.length < 2) return false;
    // must not contain digits or special symbols
    if (/\d/.test(v)) return false;
    if (/[!@#$%^&*()_+=\[\]{};:"\\|,.<>?\/~`]/.test(v)) return false;
    try { return NAME_RE.test(v); }
    catch (e) { return NAME_RE_FALLBACK.test(v); }
  }

  /* ── Phone digit count validation per country ── */
  function getMinMaxDigits(country) {
    var map = {
      '+48': [9,9], '+375': [9,10], '+380': [9,9], '+7': [10,10],
      '+49': [10,11], '+33': [9,9], '+44': [10,10], '+34': [9,9],
      '+39': [9,10], '+351': [9,9], '+81': [10,10], '+82': [10,10],
      '+1': [10,10], '+43': [10,10], '+41': [9,9], '+31': [9,9],
      '+46': [9,9], '+47': [8,8], '+45': [8,8], '+358': [9,10],
      '+420': [9,9], '+421': [9,9], '+36': [9,9], '+40': [9,9],
      '+359': [9,9], '+370': [8,8], '+371': [8,8], '+372': [7,8],
      '+90': [10,10], '+972': [9,9], '+971': [9,9], '+61': [9,9],
      '+55': [10,11], '+86': [11,11], '+91': [10,10]
    };
    return map[country.code] || [7, 15];
  }

  function isValidPhone(digits, country) {
    var mm = getMinMaxDigits(country);
    return digits.length >= mm[0] && digits.length <= mm[1];
  }

  /* ── Build phone input UI ── */
  function initPhoneField(phoneInput) {
    var wrapper = ce('div', 'fv-phone-wrap');
    phoneInput.parentNode.insertBefore(wrapper, phoneInput);

    // Country selector button
    var selBtn = ce('button', 'fv-country-btn');
    selBtn.type = 'button';
    selBtn.setAttribute('aria-label', 'Select country code');
    var currentCountry = findCountry(DEFAULT_COUNTRY);
    selBtn.innerHTML = '<span class="fv-cc-iso">' + currentCountry.iso + '</span> <span class="fv-cc-code">' + currentCountry.code + '</span> <span class="fv-cc-arrow">&#9662;</span>';

    // Dropdown
    var dropdown = ce('div', 'fv-country-dropdown');
    var searchInput = ce('input', 'fv-country-search');
    searchInput.type = 'text';
    searchInput.placeholder = 'Search...';
    searchInput.autocomplete = 'off';
    dropdown.appendChild(searchInput);

    var listWrap = ce('div', 'fv-country-list');
    dropdown.appendChild(listWrap);

    function renderList(filter) {
      listWrap.innerHTML = '';
      var f = (filter || '').toLowerCase();
      COUNTRIES.forEach(function (c) {
        if (f && c.name.toLowerCase().indexOf(f) === -1 && c.code.indexOf(f) === -1 && c.iso.toLowerCase().indexOf(f) === -1) return;
        var item = ce('div', 'fv-country-item', '<span class="fv-ci-iso">' + c.iso + '</span> <span class="fv-ci-name">' + c.name + '</span> <span class="fv-ci-code">' + c.code + '</span>');
        item.setAttribute('data-code', c.code);
        item.addEventListener('click', function () {
          currentCountry = c;
          selBtn.innerHTML = '<span class="fv-cc-iso">' + c.iso + '</span> <span class="fv-cc-code">' + c.code + '</span> <span class="fv-cc-arrow">&#9662;</span>';
          dropdown.classList.remove('open');
          formatPhone();
          phoneInput.focus();
        });
        listWrap.appendChild(item);
      });
    }
    renderList('');

    searchInput.addEventListener('input', function () { renderList(this.value); });

    selBtn.addEventListener('click', function (e) {
      e.stopPropagation();
      var isOpen = dropdown.classList.contains('open');
      dropdown.classList.toggle('open');
      if (!isOpen) { searchInput.value = ''; renderList(''); searchInput.focus(); }
    });

    // Close dropdown on outside click
    document.addEventListener('click', function (e) {
      if (!wrapper.contains(e.target)) dropdown.classList.remove('open');
    });

    // Format phone on input
    function formatPhone() {
      var raw = digitsOnly(phoneInput.value);
      phoneInput.value = applyMask(raw, currentCountry.mask);
    }

    phoneInput.addEventListener('input', formatPhone);
    phoneInput.addEventListener('focus', function () {
      if (!phoneInput.value) formatPhone();
    });

    // Remove old placeholder, set dynamic
    phoneInput.removeAttribute('placeholder');
    phoneInput.setAttribute('placeholder', currentCountry.mask.replace(/#/g, '0'));

    wrapper.appendChild(selBtn);
    wrapper.appendChild(phoneInput);
    wrapper.appendChild(dropdown);

    // Expose for validation
    phoneInput._fvGetCountry = function () { return currentCountry; };
    phoneInput._fvGetDigits = function () { return digitsOnly(phoneInput.value); };

    return wrapper;
  }

  /* ── Build confirmation checkbox ── */
  function buildConfirmation(form, beforeEl) {
    var wrap = ce('div', 'fv-confirm-wrap');
    var cb = ce('input', 'fv-confirm-cb');
    cb.type = 'checkbox';
    cb.id = 'fv-confirm';
    var label = ce('label', 'fv-confirm-label');
    label.setAttribute('for', 'fv-confirm');
    label.setAttribute('data-i18n', 'form_confirm');
    label.textContent = 'I confirm the selected service and date';
    var errDiv = ce('div', 'form-error fv-confirm-err');
    errDiv.id = 'en5';
    errDiv.setAttribute('data-i18n', 'form_err_confirm');
    errDiv.textContent = 'Please confirm your booking';
    wrap.appendChild(cb);
    wrap.appendChild(label);
    wrap.appendChild(errDiv);
    form.insertBefore(wrap, beforeEl);
    return cb;
  }

  /* ── Init ── */
  function init() {
    var form = qs('#bf');
    if (!form) return;

    var nameInput = qs('#fn', form);
    var phoneInput = qs('#fp', form);
    var serviceSelect = qs('#fs', form);
    var dateInput = qs('#fd', form);
    var submitBtn = qs('.form-submit', form);
    var fok = qs('#fok');

    if (!nameInput || !phoneInput) return;

    // ── Phone field ──
    var phoneWrap = initPhoneField(phoneInput);

    // ── Date: min today, max 6 months ──
    var today = new Date();
    var maxDate = new Date(today);
    maxDate.setMonth(maxDate.getMonth() + 6);
    dateInput.setAttribute('min', today.toISOString().split('T')[0]);
    dateInput.setAttribute('max', maxDate.toISOString().split('T')[0]);

    // ── Confirmation checkbox ──
    var confirmCb = buildConfirmation(form, submitBtn);

    // ── Name: filter out non-letter input ──
    nameInput.addEventListener('input', function () {
      // Remove digits and special chars as user types
      this.value = this.value.replace(/[\d!@#$%^&*()_+=\[\]{};:"\\|,.<>?\/~`]/g, '');
    });

    // ── Override form submit ──
    // Remove existing submit listeners by cloning
    var newForm = form.cloneNode(false);
    while (form.firstChild) newForm.appendChild(form.firstChild);
    form.parentNode.replaceChild(newForm, form);
    form = newForm;

    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var valid = true;

      // Name
      var nameVal = nameInput.value.trim();
      var nameErr = qs('#en1');
      if (!isValidName(nameVal)) {
        nameErr.classList.add('show');
        nameInput.style.borderColor = 'var(--red)';
        valid = false;
      } else {
        nameErr.classList.remove('show');
        nameInput.style.borderColor = '';
      }

      // Phone
      var phoneDigits = phoneInput._fvGetDigits();
      var phoneCountry = phoneInput._fvGetCountry();
      var phoneErr = qs('#en2');
      if (!isValidPhone(phoneDigits, phoneCountry)) {
        phoneErr.classList.add('show');
        phoneInput.style.borderColor = 'var(--red)';
        valid = false;
      } else {
        phoneErr.classList.remove('show');
        phoneInput.style.borderColor = '';
      }

      // Service
      var serviceErr = qs('#en3');
      if (!serviceSelect.value) {
        serviceErr.classList.add('show');
        serviceSelect.style.borderColor = 'var(--red)';
        valid = false;
      } else {
        serviceErr.classList.remove('show');
        serviceSelect.style.borderColor = '';
      }

      // Date
      var dateErr = qs('#en4');
      var dateVal = dateInput.value;
      if (!dateVal || dateVal < today.toISOString().split('T')[0] || dateVal > maxDate.toISOString().split('T')[0]) {
        dateErr.classList.add('show');
        dateInput.style.borderColor = 'var(--red)';
        valid = false;
      } else {
        dateErr.classList.remove('show');
        dateInput.style.borderColor = '';
      }

      // Confirmation
      var confirmErr = qs('#en5');
      if (!confirmCb.checked) {
        confirmErr.classList.add('show');
        valid = false;
      } else {
        confirmErr.classList.remove('show');
      }

      if (!valid) return;

      // Submit animation
      submitBtn.disabled = true;
      submitBtn.textContent = '...';
      setTimeout(function () {
        form.style.display = 'none';
        if (fok) fok.classList.add('show');
      }, 800);
    });

    // Clear errors on input
    qsa('.form-input,.form-select', form).forEach(function (inp) {
      inp.addEventListener('input', function () {
        this.style.borderColor = '';
        var er = this.nextElementSibling;
        if (er && er.classList.contains('form-error')) er.classList.remove('show');
      });
    });
    confirmCb.addEventListener('change', function () {
      qs('#en5').classList.remove('show');
    });
  }

  /* ── CSS injection ── */
  function injectStyles() {
    var css = [
      '.fv-phone-wrap{position:relative;display:flex;gap:0;align-items:stretch}',
      '.fv-country-btn{display:flex;align-items:center;gap:4px;padding:0 10px;background:rgba(255,255,255,.06);border:1px solid rgba(255,255,255,.12);border-right:none;border-radius:8px 0 0 8px;color:inherit;font-size:13px;cursor:pointer;white-space:nowrap;min-height:48px;transition:border-color .2s}',
      '.fv-country-btn:hover{background:rgba(255,255,255,.1)}',
      '.fv-cc-iso{font-weight:600;font-size:12px;opacity:.7}',
      '.fv-cc-code{font-weight:500}',
      '.fv-cc-arrow{font-size:8px;opacity:.5;margin-left:2px}',
      '.fv-phone-wrap .form-input{border-radius:0 8px 8px 0!important;flex:1;min-width:0}',
      '.fv-country-dropdown{position:absolute;top:100%;left:0;width:280px;max-height:0;overflow:hidden;background:#1a1a1a;border-radius:8px;box-shadow:0 8px 32px rgba(0,0,0,.5);z-index:999;opacity:0;transition:max-height .25s,opacity .2s}',
      '.fv-country-dropdown.open{max-height:300px;opacity:1;overflow:visible;border:1px solid rgba(255,255,255,.12)}',
      '.fv-country-search{width:100%;padding:10px 12px;background:rgba(255,255,255,.06);border:none;border-bottom:1px solid rgba(255,255,255,.1);color:inherit;font-size:14px;outline:none;box-sizing:border-box}',
      '.fv-country-search::placeholder{color:rgba(255,255,255,.3)}',
      '.fv-country-list{max-height:230px;overflow-y:auto;scrollbar-width:thin}',
      '.fv-country-item{display:flex;align-items:center;gap:8px;padding:8px 12px;cursor:pointer;font-size:13px;transition:background .15s}',
      '.fv-country-item:hover{background:rgba(255,255,255,.08)}',
      '.fv-ci-iso{font-weight:600;font-size:11px;opacity:.5;width:24px}',
      '.fv-ci-name{flex:1}',
      '.fv-ci-code{opacity:.6;font-size:12px}',
      '.fv-confirm-wrap{display:flex;flex-wrap:wrap;align-items:center;gap:8px;margin:8px 0 4px}',
      '.fv-confirm-cb{width:18px;height:18px;accent-color:var(--gold,#C49A2D);cursor:pointer;flex-shrink:0}',
      '.fv-confirm-label{font-size:13px;opacity:.8;cursor:pointer;user-select:none}',
      '.fv-confirm-err{width:100%}',
      /* Light theme overrides */
      '@media(prefers-color-scheme:light){',
      '.fv-country-btn{background:rgba(0,0,0,.04);border-color:rgba(0,0,0,.15)}',
      '.fv-country-btn:hover{background:rgba(0,0,0,.08)}',
      '.fv-country-dropdown{background:#fff;box-shadow:0 8px 32px rgba(0,0,0,.15)}',
      '.fv-country-dropdown.open{border-color:rgba(0,0,0,.15)}',
      '.fv-country-search{background:rgba(0,0,0,.03);border-bottom-color:rgba(0,0,0,.1)}',
      '.fv-country-search::placeholder{color:rgba(0,0,0,.35)}',
      '.fv-country-item:hover{background:rgba(0,0,0,.05)}',
      '}'
    ].join('\n');
    var style = document.createElement('style');
    style.textContent = css;
    document.head.appendChild(style);
  }

  /* ── Boot ── */
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function () { injectStyles(); init(); });
  } else {
    injectStyles(); init();
  }
})();
