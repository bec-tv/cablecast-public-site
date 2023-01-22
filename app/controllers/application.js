import classic from 'ember-classic-decorator';
import { action, computed } from '@ember/object';
import Controller from '@ember/controller';
import { inject as service } from '@ember/service';

@classic
export default class ApplicationController extends Controller {
  queryParams = ['site', 'channel'];
  site = null;
  channel = null;
  showOtherChannels = true;

  @service
  fastboot;

  @computed('model.channel.primaryLocation.id', 'model.projects')
  get projects() {
    return this.model.projects;
  }

  @computed('store')
  get allChannels() {
    return this.store.peekAll('channel');
  }

  @computed('allChannels.[]')
  get publicChannels() {
    return this.allChannels
      .filterBy('publicSite.includeInIndex', true)
      .sortBy('publicSite.siteName');
  }

  @action
  navSearch(query) {
    this.transitionToRoute('search', { queryParams: { query: query } });
  }
}
