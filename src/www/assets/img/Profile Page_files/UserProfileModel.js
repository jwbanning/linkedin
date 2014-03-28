define(function(require) {

  var Model = require('lavaca/mvc/Model'),
      APIdoc = require('app/data/APIdoc'),
      Promise = require('lavaca/util/Promise');

  var UserProfileModel = Model.extend(function UserProfileModel() {
    Model.apply(this, arguments);
    _fetch.call(this).then(function() {

    }.bind(this));
  });

//Private functions
  function _fetch() {
    var promise = new Promise();
    IN.API.Profile("me").fields('id','skills','educations','first-name', 'last-name', 'headline', 'location:(name)','distance','summary','specialties','positions', 'picture-urls::(original)','num-recommenders').result(function(result) {
      this.set('data', result.values[0]);
      promise.resolve();
    }.bind(this));

    return promise;
  }

  return UserProfileModel;
});
