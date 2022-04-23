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
      let end = new Date(item.endDateTime)
      let now = new Date();
      return start <= now && end > now;
    });
  }

  @computed('runs.[]')
  get filteredRuns() {
    let now = new Date();
    let runs = this.runs || [];
    let filteredRuns = runs.filter((run) => {
      let end = new Date(run.endDateTime);
      return end >= now;
    });
    return filteredRuns.slice(0, 8);
  }
}
