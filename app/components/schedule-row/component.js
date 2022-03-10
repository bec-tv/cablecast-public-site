import classic from 'ember-classic-decorator';
import { tagName } from '@ember-decorators/component';
import { computed } from '@ember/object';
import Component from '@ember/component';

@classic
@tagName('')
export default class ScheduleRow extends Component {
  @computed('item.{runDateTime,endDateTime}')
  get isOnAir() {
    let start = new Date(this.item.runDateTime + 'Z');
    let end = new Date(this.item.endDateTime + 'Z')
    let now = new Date();
    return start <= now && end > now;
  }
}
