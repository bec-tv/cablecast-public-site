import classic from 'ember-classic-decorator';
import { inject as service } from '@ember/service';
import { alias } from '@ember/object/computed';
import { action, computed } from '@ember/object';
import Controller, { inject as controller } from '@ember/controller';

@classic
export default class ShowController extends Controller {
  @service
  site;

  activeTab = 'details';

  @controller
  application;

  @alias('model.runs')
  runs;

  @alias('application.channel')
  currentChannelId;

  // TODO - fix later
  /* eslint-disable getter-return */
  @computed('model.show.vods.firstObject.{chapters.@each.deleted,chaptersPublished}')
  get vodChapters() {
    return [];
    if (!this.get('model.show.vods.firstObject.chaptersPublished')) {
      return [];
    }
    let chapters = this.get('model.show.vods.firstObject.chapters') || [];
    return chapters.rejectBy('deleted').rejectBy('quickAdded').sortBy('offset');
  }
  /* eslint-enable getter-return */

  queryParams = ['seekto'];
  seekto = null;

  @computed ('model.fieldDisplays.@each.{widget,value}', 'store')
  get embediFrame() {
    let iframeDisplays = this.get('model.fieldDisplays').sortBy('order').filterBy('widget', 'iframe');
    for (let i = 0; i < iframeDisplays.length; i++) {
      let iframeDisplay = iframeDisplays[i];
      if (iframeDisplay.value) {
          return {
            url: iframeDisplay.value
          };
      }
    }
  }

  //TODO - fix this code later
  /* eslint-disable getter-return */
  @computed('model.fieldDisplays.@each.{widget,value}', 'store')
  get embededPdf() {
    let pdfDisplays = this.get('model.fieldDisplays')
      .sortBy('order')
      .filterBy('widget', 'pdf');

    if (pdfDisplays.length) {
      return {
        url: pdfDisplays[pdfDisplays.length -1].value,
        fieldDisplay: pdfDisplays[pdfDisplays.length -1]
      };
    } else {
      return null;
    }
  }
  /* eslint-enable getter-return */

  @action
  showChapters() {
    this.set('activeTab', 'chapters');
  }

  @action
  showDetails() {
    this.set('activeTab', 'details');
  }

  @action
  setSeekTo(chapterId) {
    this.set('seekto', chapterId);
  }
}
