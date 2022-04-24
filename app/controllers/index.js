import classic from 'ember-classic-decorator';
import { computed } from '@ember/object';
import { alias } from '@ember/object/computed';
import Controller, { inject as controller } from '@ember/controller';

@classic
export default class IndexController extends Controller {
  @controller
  application;

  @alias('application.model.channel')
  channel;

  @computed('model.scheduleItems.[]')
  get showSchedule() {
    return this.get('model.scheduleItems') && this.get('model.scheduleItems.length') > 0;
  }
}
