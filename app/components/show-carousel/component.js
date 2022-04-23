import classic from 'ember-classic-decorator';
import { tagName } from '@ember-decorators/component';
import { computed } from '@ember/object';
import { inject as service } from '@ember/service';
import jQuery from 'jquery';
import Component from '@ember/component';

@classic
@tagName('')
export default class ShowCarousel extends Component {
  @service
  fastboot;

  didInsertElement() {
    super.didInsertElement(...arguments);
    jQuery('#carousel').carousel('cycle');
  }

  @computed('shows.[]')
  get trimmedShows() {
    return this.get('shows').slice(0, 12);
  }
}
