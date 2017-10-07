(function (w) {
  'use strict'

  init({timeout: null});

  function init(context) {
    var videos = w.document.querySelectorAll("iframe[src^='https://www.youtube.com']");

    videos.forEach(function (iframe) {
      iframe.setAttribute('data-aspect-ratio', iframe.getAttribute('height') / iframe.getAttribute('width'))
      iframe.removeAttribute('height');
      iframe.removeAttribute('width');
    });

    resize(videos);

    w.addEventListener('resize', p(resizeThrottler, 12, context, p(resize, videos)));
  }

  function resizeThrottler(fps, context, handler, event) {
    if (context.timeout) {
      return;
    }

    context.timeout = setTimeout(function () {
      context.timeout = null;
      handler(event);
    }, 1000 / fps);
  }

  function resize(videos, event) {
    videos.forEach(function (iframe) {
      var width = iframe.parentNode.clientWidth;

      iframe.style.width = width + 'px';
      iframe.style.height = (width * parseFloat(iframe.getAttribute('data-aspect-ratio'), 10)) + 'px';
    });
  }

  function p(f) {
    var count = arguments.length;
    var index = 1;
    var args = new Array(count - 1);

    while (index < count) args[index - 1] = arguments[index++];

    return f.bind.apply(f, [null].concat(args));
  }
})(window);
