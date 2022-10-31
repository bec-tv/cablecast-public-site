import classic from 'ember-classic-decorator';
import Route from '@ember/routing/route';
import ENV from 'cablecast-public-site/config/environment';
import { inject as service } from '@ember/service';

const PAGE_SIZE=50;

@classic
export default class GalleryRoute extends Route {
  @service
  api;

  queryParams = {
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
    let api = this.get('api');
    let result = await api.fetch(`api/publicsitedata/galleries/${params.id}`, {offset: offset, page_size: PAGE_SIZE});
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
