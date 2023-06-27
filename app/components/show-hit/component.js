import classic from 'ember-classic-decorator';
import { computed } from '@ember/object';
import Component from '@ember/component';

@classic
export default class ShowHit extends Component {
  @computed('hit', 'search')
  get text() {
    let base = this.hit.text;
    let textShort = (base.length > 150) ? base.slice(0, 149) + '&hellip;' : base;
    return textShort.replace(new RegExp(this.search, "gi"), (match) => `<mark class="show-hit-highlight">${match}</mark>`);
  }
}
