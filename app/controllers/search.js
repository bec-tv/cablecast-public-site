import classic from 'ember-classic-decorator';
import { action, computed } from '@ember/object';
import { alias } from '@ember/object/computed';
import Controller from '@ember/controller';

@classic
export default class SearchController extends Controller {
  queryParams = ['query', 'page'];
  page = 1;
  query = null;
  tempQuery = null;
  useFullText = false;

  @computed('query')
  get search() {
    return this.get('query');
  }

  @alias('model.meta')
  meta;

  @alias('model.shows')
  shows;

  @action
  submitSearch(query) {
    this.set('query', query);
  }

  @action
  goToPage(page) {
    this.set('page', page);
  }
}
