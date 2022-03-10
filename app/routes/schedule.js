import classic from 'ember-classic-decorator';
import Route from '@ember/routing/route';
import ENV from 'cablecast-public-site/config/environment';
import fetch from 'fetch';

@classic
export default class ScheduleRoute extends Route {
  queryParams = {
    currentDay: {
      refreshModel: true,
    }
  };

  async model(params) {
    let host = this.modelFor('application').host;

    let base = ENV.CCSServer;
    if (ENV.environment === 'development') {
      base = "http://localhost:5000";
      host = "d31lcq7208ihag.cloudfront.net";
    }

    let site = '1';
    let currentSite = this.paramsFor('application').siteId;
    if (currentSite) {
      site = currentSite;
    }

    let result = await fetch(`${base}/api/publicsitedata/schedule?host=${host}&siteId=${site}&currentDay=${params.currentDay}`);
    let json = await result.json();
    
    return json;
  }
}
