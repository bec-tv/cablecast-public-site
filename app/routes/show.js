import classic from 'ember-classic-decorator';
import { inject as service } from '@ember/service';
import Route from '@ember/routing/route';

@classic
export default class ShowRoute extends Route {
  @service headData;

  @service fastboot;

  @service api;

  setHeadData(show) {
    let config = this.modelFor('application');
    let data = {
      type: 'video.episode',
      card: 'summary_large_image',
      description: show.description || show.title,
      title: show.title,
      image: `${config.siteBaseUrl}${show.thumbnailUrl}`,
    };
    let headData = this.headData;
    headData.set('socialMedia', data);

    this.appendJsonLD(data, show);
  }

  appendJsonLD(data) {
    let jsonLD = {
      '@context': 'http://schema.org',
      '@type': 'TVClip',
    };
    if (data.image) {
      jsonLD.thumbnailUrl = data.image;
    }
    // TODO date
    // let eventDate = show.get('eventDateString');
    // if (eventDate) {
    //   jsonLD.datePublished = eventDate;
    // }
    if (data.title) {
      jsonLD.headline = data.title;
    }
    let headData = this.headData;
    headData.set('jsonLD', JSON.stringify(jsonLD));
  }

  async model(params) {
    let api = this.get('api');
    let result = await api.fetch(`api/publicsitedata/shows/${params.id}`);
    let json = await result.json();

    return json;
  }

  afterModel(model) {
    this.setHeadData(model);
  }

  resetController(controller) {
    controller.set('activeTab', 'details');
    controller.set('seekto', null);
  }
}
