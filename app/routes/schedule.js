import classic from 'ember-classic-decorator';
import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';

@classic
export default class ScheduleRoute extends Route {
  @service
  api;

  queryParams = {
    currentDay: {
      refreshModel: true,
    },
  };

  async model(params) {
    let api = this.get('api');
    let result = await api.fetch(`api/publicsitedata/schedule`, {
      currentDay: params.currentDay,
    });
    let json = await result.json();

    return json;
  }
}
