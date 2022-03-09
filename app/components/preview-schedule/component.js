import classic from 'ember-classic-decorator';
import { tagName } from '@ember-decorators/component';
import { action, computed } from '@ember/object';
import Component from '@ember/component';

@classic
@tagName('')
export default class PreviewSchedule extends Component {
  @computed('runs.[]')
  get onAirRun() {
    return this.runs.find((item) => {
      return false;
      let runStart = new Date(item.runDateTime + 'Z');
      let runEnd = new Date(item.endDateTime + 'Z')
      let now = new Date();
      return start <= now && end > now;
    });
  }
}
