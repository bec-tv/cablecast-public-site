import classic from 'ember-classic-decorator';
import { tagName } from '@ember-decorators/component';
import { computed } from '@ember/object';
import Component from '@ember/component';

@classic
@tagName('')
export default class ScheduleRow extends Component {
  @computed('item.{runDateTime,endDateTime}')
  get isOnAir() {
    let start = new Date(this.item.runDateTime);
    let end = new Date(this.item.endDateTime)
    let now = new Date();
    return start <= now && end > now;
  }
}
