import classic from 'ember-classic-decorator';
import Route from '@ember/routing/route';
import ENV from 'cablecast-public-site/config/environment';
import fetch from 'fetch';

@classic
export default class SearchRoute extends Route {
  queryParams = {
    query: {
      refreshModel: true,
    },
    page: {
      refreshModel: true,
    },
  };

  async model(params) {
    let offset = params.page - 1;
    let search = params.query;

    let host = this.modelFor('application').host;

    let base = ENV.CCSServer;
    if (ENV.environment === 'development') {
      host = "d31lcq7208ihag.cloudfront.net";
    }

    let result = await fetch(`${base}/api/publicsitedata/shows?host=${host}&offset=${offset}&search=${search}`);
    let json = await result.json();
    return json;
  }

  setupController(controller, model) {
    controller.set('model', model);
    controller.set('tempQuery', this.paramsFor(this.routeName).query);
  }

  deactivate() {
    super.deactivate(...arguments);
    this.controller.set('page', 1);
  }
}
