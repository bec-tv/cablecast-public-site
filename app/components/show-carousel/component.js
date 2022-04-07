import classic from 'ember-classic-decorator';
import { tagName } from '@ember-decorators/component';
import { inject as service } from '@ember/service';
import jQuery from 'jquery';
import Component from '@ember/component';

@classic
@tagName('')
export default class ShowCarousel extends Component {
  @service
  fastboot;

  didInsertElement() {
    super.didInsertElement(...arguments);
    
    //4-7-2022:BM:
    //  This throws an exception and causes the app to stop loading.
    //  I'd rather have the page load than the carousel auto-rotate,
    //  So I'm commenting this out for now

    // jQuery('#carousel').carousel('cycle');
  }
}
