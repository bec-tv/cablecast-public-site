import classic from 'ember-classic-decorator';
import { action } from '@ember/object';
import { alias } from '@ember/object/computed';
import Controller from '@ember/controller';

@classic
export default class GalleryController extends Controller {
  queryParams = ['page'];
  page = 1;

  @alias('model.meta')
  meta;

  @alias('model.shows')
  shows;

  @action
  goToPage(page) {
    this.set('page', page);
  }
}
