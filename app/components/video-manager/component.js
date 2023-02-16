import classic from 'ember-classic-decorator';
import { classNames } from '@ember-decorators/component';
import jQuery from 'jquery';
import { bind } from '@ember/runloop';
import Component from '@ember/component';

@classic
@classNames('video-manager')
export default class VideoManager extends Component {
  didInsertElement() {
    super.didInsertElement(...arguments);
    this._messageHandler = bind(this, 'processMessage');
    window.addEventListener('message', this._messageHandler, false);
  }

  willDestroyElement() {
    super.willDestroyElement(...arguments);
    if (this._messageHandler) {
      window.removeEventListener('message', this._messageHandler);
    }
  }

  processMessage(event) {
    if (event.data.message === 'ready' && this.seekto) {
      this.seekTo(this.seekto);
    }

    if (event.data.message === 'seek' && event.data.seconds >= 0) {
      this.seekTo(event.data.seconds);
    }
  }

  sendMessage(message) {
    var player = jQuery('iframe')[0];
    if (player) {
      player.contentWindow.postMessage(message, '*');
    }
  }

  seekTo(offset) {
    var message = {
      type: 'player-cue',
      value: offset,
    };
    this.sendMessage(message);
  }
}
