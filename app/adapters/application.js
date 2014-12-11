import DS from 'ember-data';

export default DS.FirebaseAdapter.extend({
  firebase: new Firebase("https://amber-torch-3759.firebaseio.com")
});
