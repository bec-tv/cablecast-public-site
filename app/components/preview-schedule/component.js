import classic from 'ember-classic-decorator';
import { tagName } from '@ember-decorators/component';
import { computed } from '@ember/object';
import Component from '@ember/component';

@classic
@tagName('')
export default class PreviewSchedule extends Component {
  @computed('runs.[]')
  get onAirRun() {
    return this.runs.find((item) => {
      let start = new Date(item.runDateTime);
      let end = new Date(item.endDateTime);
      let now = new Date();
      return start <= now && end > now;
    });
  }

  @computed('runs.[]')
  get filteredRuns() {
    let now = new Date();
    let endOfDay = new Date(now);
    endOfDay.setHours(23, 59, 59, 999); // Set to the end of the current day
    if (this.runs && this.runs.length > 0) {
      let filteredRuns = this.runs.filter((run) => {
        let start = new Date(run.runDateTime);
        return start >= now && start <= endOfDay;
      });
      return filteredRuns.slice(0, 8);
    } else {
      return [];
    }
  }
}
