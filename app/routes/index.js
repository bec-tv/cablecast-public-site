import Ember from 'ember';
import SetPageTitle from 'public/mixins/set-page-title';
import GetFutureRuns from 'public/mixins/channel-future-runs-promise';
import ResetScroll from 'public/mixins/reset-scroll';

function filterShows(shows) {
	return shows.filter(function(show) {
		return Ember.get(show, 'showThumbnails.length') > 0 && Ember.get(show, 'cgExempt') === false;
	});
}

export default Ember.Route.extend(SetPageTitle, GetFutureRuns, ResetScroll, {

	model() {
		let channel = this.modelFor('application').channel;

    let carouselShows = channel.get('publicSite.carouselSavedSearch').then((search)=>{
      if(search){
        return this.store.query('show',{
          ids: search.get('results').slice(0,20),
          include: 'thumbnail,vod,category,project,producer,reel',
        }).then(filterShows);
      }
    });

    return Ember.RSVP.hash({
      carouselShows,
      futureRuns:this.getFutureRuns(channel),
      defaultShows: this.store.query('show',{page_size: 24, location: channel.get('primaryLocation')}).then(filterShows),
      categories: this.store.findAll('category'),
      projects: this.store.findAll('project'),
      producers: this.store.findAll('producer')
    });
  },

	afterModel() {
		var channel = this.modelFor('application').channel;
		let name = channel.get('publicSite.siteName') || channel.get('name');
		this.setTitle(name);
	}
});
