import classic from 'ember-classic-decorator';
import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';

@classic
export default class IndexRoute extends Route {
  @service fastboot;

  async model(params) {
    return this.modelFor('application');
  }
}
