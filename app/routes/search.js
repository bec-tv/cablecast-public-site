import classic from 'ember-classic-decorator';
import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';

@classic
export default class SearchRoute extends Route {
  @service api;

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
    let api = this.get('api');
    
    let result = await api.fetch(`api/publicsitedata/shows`, {
      search: search,
      offset: offset
    });
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
