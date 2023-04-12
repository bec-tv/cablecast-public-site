import classic from 'ember-classic-decorator';
import { tagName } from '@ember-decorators/component';
import { computed } from '@ember/object';
import Component from '@ember/component';
import ENV from 'cablecast-public-site/config/environment';

@classic
@tagName('')
export default class ChannelStub extends Component {
  @computed('otherSite.logo', 'otherSite.squareLogo')
  get logo() {
    return this.otherSite.logo || this.otherSite.squareLogo;
  }

  @computed
  get rootURL() {
    return ENV.rootURL;
  }
}
