import classic from 'ember-classic-decorator';
import { tagName } from '@ember-decorators/component';
import { computed } from '@ember/object';
import Component from '@ember/component';

@classic
@tagName('')
export default class LocalTime extends Component {
  @computed('utcTime')
  get localTime() {
    return new Date(this.utcTime + 'Z');
  }
}
