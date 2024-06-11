import classic from 'ember-classic-decorator';
import { action, computed } from '@ember/object';
import { inject as service } from '@ember/service';
import moment from 'moment';

import Controller from '@ember/controller';
import ENV from 'cablecast-public-site/config/environment';

const currentDay = moment().format('YYYY-MM-DD');

@classic
export default class ScheduleController extends Controller {
  queryParams = ['currentDay'];
  currentDay = currentDay;

  @service
  fastboot;

  @computed
  get rootURL() {
    return ENV.rootURL;
  }

  @computed('model.scheduleItems.[]', 'currentDate',)
  get filteredRuns() {
    let runs = this.model.scheduleItems || [];
    let currentDate = this.currentDate;
    let nextDay = new Date(currentDate);
    nextDay.setDate(nextDay.getDate() + 1);
    if (runs && runs.length > 0) {
      let filteredRuns = runs.filter((run) => {
        let start = new Date(run.runDateTime);
        return start >= currentDate && start <= nextDay;
      });
      return filteredRuns.slice(0, 8);
    } else {
      return [];
    }
  }

  @computed('currentDay')
  get currentDate() {
    return moment(this.currentDay, 'YYYY-MM-DD').toDate();
  }

  @computed('currentDay')
  get prevDateString() {
    var current = moment(this.currentDay);
    return current.add(-1, 'days').format('YYYY-MM-DD');
  }

  @computed('currentDay')
  get nextDateString() {
    var current = moment(this.currentDay);
    return current.add(1, 'days').format('YYYY-MM-DD');
  }

  @action
  changeDate(date) {
    let current = moment(date);
    this.set('currentDay', current.format('YYYY-MM-DD'));
  }

  @action
  prevDay() {
    var current = moment(this.currentDay);
    current.add(-1, 'days');
    this.set('currentDay', current.format('YYYY-MM-DD'));
  }

  @action
  nextDay() {
    var current = moment(this.currentDay);
    current.add(1, 'days');
    this.set('currentDay', current.format('YYYY-MM-DD'));
  }
}
