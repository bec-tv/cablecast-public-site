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
    let now = new Date();
    let startOfDay = new Date(now);
    let endOfDay = new Date(now);
    startOfDay.setHours(0, 0, 0, 0); // Set to the start of the current day
    endOfDay.setHours(23, 59, 59, 999); // Set to the end of the current day
    let schedule = this.get('model.scheduleItems') || [];
    let todaysSchedule = schedule.filter((item) => {
      let start = new Date(item.runDateTime);
      let end = new Date(item.endDateTime);
      return end >= startOfDay && start <= endOfDay;
    });
    return todaysSchedule.length > 0;
  }
}
