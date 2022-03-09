import classic from 'ember-classic-decorator';
import { tagName } from '@ember-decorators/component';
import { computed } from '@ember/object';
import Component from '@ember/component';

@classic
@tagName('')
export default class ScheduleRow extends Component {
  @computed('item.{runDateTime,endDateTime}')
  get isOnAir() {
    return false;
    let runStart = new Date(item.runDateTime + 'Z');
    let runEnd = new Date(item.endDateTime + 'Z')
    let now = new Date();
    return start <= now && end > now;
  }
}
