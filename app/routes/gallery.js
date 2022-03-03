import classic from 'ember-classic-decorator';
import Route from '@ember/routing/route';
import fetch from 'fetch';
import ENV from 'cablecast-public-site/config/environment';

@classic
export default class GalleryRoute extends Route {
  queryParams = {
    page: {
      refreshModel: true,
    },
  };

  async model(params) {
    let offset = params.page - 1;
    let host = this.modelFor('application').host;

    let base = ENV.CCSServer;
    if (ENV.environment === 'development') {
      base = "http://localhost:5000";
      host = "d31lcq7208ihag.cloudfront.net";
    }
    let result = await fetch(`${base}/api/publicsitedata/galleries/${params.id}?offset=${offset}&host=${host}`);
    let json = await result.json();
    
    return json;
  }

  setupController(controller, model) {
    super.setupController(...arguments);
    controller.set('model', model);
  }

  deactivate() {
    super.deactivate(...arguments);
    this.controller.set('page', 1);
  }
}
