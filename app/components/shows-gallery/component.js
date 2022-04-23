import classic from 'ember-classic-decorator';
import { tagName } from '@ember-decorators/component';
import { action, computed } from '@ember/object';
import { inject as service } from '@ember/service';
import Component from '@ember/component';

@classic
@tagName('')
export default class ShowsGallery extends Component {
  @service store;

  collapsed = false;

  @action
  collapseGallery() {
    this.toggleProperty('collapsed');
  }

  @computed('gallery.shows.[]')
  get trimmedShows() {
    let gallery = this.gallery;
    let limit = gallery.displayLimit || 24;
    return gallery.shows.slice(0, limit);
  }
}
