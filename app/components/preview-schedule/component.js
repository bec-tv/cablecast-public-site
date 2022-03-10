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
      let start = new Date(item.runDateTime + 'Z');
      let end = new Date(item.endDateTime + 'Z')
      let now = new Date();
      return start <= now && end > now;
    });
  }
}
