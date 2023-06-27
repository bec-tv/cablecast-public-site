import classic from 'ember-classic-decorator';
import { tagName } from '@ember-decorators/component';
import { computed } from '@ember/object';
import Component from '@ember/component';
import ENV from 'cablecast-public-site/config/environment';

@classic
@tagName('')
export default class ShowStub extends Component {
  @computed
  get rootURL() {
    return ENV.rootURL;
  }

  @computed('search', 'show')
  get titleHighlight() {
    return this.show.title.replace(new RegExp(this.search, "gi"), (match) => `<mark class="show-hit-highlight">${match}</mark>`);
  }
}
