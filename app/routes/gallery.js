import classic from 'ember-classic-decorator';
import Route from '@ember/routing/route';
import ENV from 'cablecast-public-site/config/environment';
import { inject as service } from '@ember/service';

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
    let offset = params.page - 1;

    let result = await api.fetch(`$api/publicsitedata/galleries/${params.id}`, {offset: offset});
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
