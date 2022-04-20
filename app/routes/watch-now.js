import classic from 'ember-classic-decorator';
import { inject as service } from '@ember/service';
import Route from '@ember/routing/route';

@classic
export default class WatchNowRoute extends Route {
  @service headData;

  @service api;

  async model() {
    let api = this.get('api');
    let model = this.modelFor('application');
    let currentDay = (new Date()).toISOString();
    let result = await api.fetch(`api/publicsitedata/schedule`, {
      currentDay: currentDay
    });
    let json = await result.json();
    
    return {
      scheduleItems: json,
      embedCode: model.liveEmbedCode
    };
  }
}
