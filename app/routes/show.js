import classic from 'ember-classic-decorator';
import { inject as service } from '@ember/service';
import Route from '@ember/routing/route';
import fetch from 'fetch';
import ENV from 'cablecast-public-site/config/environment';

@classic
export default class ShowRoute extends Route {
  @service headData;

  @service fastboot;

  setHeadData(show) {
    let data = {
      type: 'video.episode',
      card: 'summary_large_image',
      description: show.description || show.title,
      image: show.thumbnail
    };
    let headData = this.headData;
    headData.set('socialMedia', data);

    this.appendJsonLD(data, show);
  }

  findAThumbnailUrl(show) {
    let thumbnail = show.get('showThumbnails').findBy('quality', 'Large');
    if (!thumbnail) {
      thumbnail = show.get('showThumbnails.firstObject');
    }
    if (thumbnail) {
      return encodeURI(thumbnail.get('url'));
    }
    return this.get('headData.socialMedia.image');
  }

  appendJsonLD(data, show) {
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
    let host = '';
    if (this.get('fastboot.isFastBoot')) {
      let headers = this.get('fastboot.request.headers');
      host = headers.get('x-ccs-host');
    }
    else {
      host = window.location.host
    }

    let base = ENV.CCSServer;
    if (ENV.environment === 'development') {
      base = "http://localhost:5000";
      host = "d31lcq7208ihag.cloudfront.net";
    }
    let result = await fetch(`${base}/api/publicsitedata/shows/${params.id}?host=${host}`);
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
