import classic from 'ember-classic-decorator';
import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';

const PAGE_SIZE=50;

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
    let page = params.page ?? 1;
    let offset = 0;
    if (page > 1) {
      offset = (page - 1) * PAGE_SIZE;
    }
    let search = params.query;
    let api = this.get('api');

    let config = this.modelFor('application');
    let useFullText = config.useFullTextIndex;
    
    let result;
    if (useFullText && useFullText == true) {
      result = await api.fetch(`api/publicsitedata/shows/search`, {
        search: search,
        offset: offset,
        page_size: PAGE_SIZE
      });
    }
    else {
      result = await api.fetch(`api/publicsitedata/shows`, {
        search: search,
        offset: offset,
        page_size: PAGE_SIZE
      });
    }
    let json = await result.json();
    return json;
  }

  setupController(controller, model) {
    let config = this.modelFor('application');

    let useFullText = config.useFullTextIndex;
    if (!useFullText) {
      useFullText = false;
    }

    controller.set('useFullText', useFullText);
    controller.set('model', model);
    controller.set('tempQuery', this.paramsFor(this.routeName).query);
  }

  deactivate() {
    super.deactivate(...arguments);
    this.controller.set('page', 1);
  }
}
