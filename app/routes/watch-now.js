import classic from 'ember-classic-decorator';
import { inject as service } from '@ember/service';
import { hash } from 'rsvp';
import Route from '@ember/routing/route';

@classic
export default class WatchNowRoute extends Route {
  @service
  headData;

  model(params) {
    return;
    /* TODO
    let { channel } = this.modelFor('application');

    return hash({
      futureRuns: this.futureRuns.fetch(channel),
      liveStream: this.store.findRecord('live-stream', params.stream_id),
    });
    */
  }
}
