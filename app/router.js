import EmberRouter from '@ember/routing/router';
import ENV from 'cablecast-public-site/config/environment';

class Router extends EmberRouter {
  location = ENV.locationType;
  rootURL = ENV.rootURL;
}

Router.map(function () {
  this.route('podcasts');
  this.route('schedule');
  this.route('show', { path: 'show/:id' });
  this.route('watch-now');
  this.route('legacy-watch', { path: 'watch/*' });
  this.route('search');
  this.route('gallery', { path: 'gallery/:id' });
  this.route('legacy-public-site', { path: 'CablecastPublicSite/:path' });
});

export default Router;
