/* globals PDFJS */
import ENV from 'cablecast-public-site/config/environment';

export default {
  name: 'init-pdfjs-workersrc',
  initialize: function () {
    if (typeof PDFJS !== 'undefined') {
      PDFJS.workerSrc = ENV.rootURL + 'resources/pdf.worker.js';
    }
  },
};
