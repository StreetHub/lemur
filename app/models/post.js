import DS from 'ember-data';
import Ember from 'ember';

export default DS.Model.extend({
    type: DS.attr(),
    title: DS.attr(),
    body: DS.attr(),
    link: DS.attr(),
    author: DS.attr(),
    tags: DS.attr(),

    isText: Ember.computed.equal('type', 'text'),
    isQuote: Ember.computed.equal('type', 'quote'),
    isLink: Ember.computed.equal('type', 'link'),
    isPicture: Ember.computed.equal('type', 'picture'),
    isVideo: Ember.computed.equal('type', 'video'),

    displayTitle: function() {

        if (this.get('isText')) {
            return this.get('title');
        }

        if (this.get('isQuote')) {
            return '&#8220;' + this.get('title') + '&#8221;';
        }

        if (this.get('isLink')) {
            return ["<a href='", this.get('link'), "'>", this.get('title'), "</a>"].join('');
        }

        if (this.get('isPicture')) {
            return ["<img class='image' height='300' src='", this.get('link'), "'>"].join('');
        }

        if (this.get('isVideo')) {
            return ["<iframe width='370' height='300' src='//www.youtube.com/embed/", this.get('link'), "' frameborder='0' allowfullscreen></iframe>"].join('');
        }
        //www.youtube.com/embed/6HeGQvjYbfY
    }.property('title'),

    displayDescription: function() {

        if (this.get('isText')) {
            return this.get('body');
        }

        if (this.get('isQuote')) {
            return '';
        }

        if (this.get('isLink')) {
            return this.get('link');
        }

        if (this.get('isPicture')) {
            return this.get('body');
        }

        if (this.get('isVideo')) {
            return this.get('body');
        }
    }.property('body', 'link')
});
