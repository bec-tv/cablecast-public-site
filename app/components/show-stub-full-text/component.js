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

  @computed('search', 'show', 'show.hit', 'terms')
  get titleHighlight() {
    if (this.show.hit.recordType === 2) {
      var title = this.show.title;
      if (this.terms) {
        var allTerms = this.terms.join('|');
        return title.replace(new RegExp(allTerms, "gi"), (match) => `<mark class="show-hit-highlight">${match}</mark>`);
      }
    }
    
    return this.show.title;
  }
}
