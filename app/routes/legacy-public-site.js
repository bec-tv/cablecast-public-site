import classic from 'ember-classic-decorator';
import { inject as service } from '@ember/service';
import Route from '@ember/routing/route';

@classic
export default class LegacyWatchNow extends Route {
  @service router;

  beforeModel(transition) {
    this.router.replaceWith(transition.to.params.path); // Implicitly aborts the on-going transition.
  }
}
