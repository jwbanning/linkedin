define(function(require) {
  var Collection = require('lavaca/mvc/Collection'),
      debounce = require('mout/function/debounce'),
      individualPersonModel = require('app/models/individualPersonModel'),
      APIdoc = require('app/data/APIdoc'),
      stateModel = require('app/models/StateModel');

  var MatchCollection = Collection.extend(function MatchCollection() {
    Collection.apply(this, arguments);
    _fetch.call(this);
    this.apply({
      currentIndex: 0,
      currentContact: _currentContact,
      nextContact: _nextContact,
      thirdContact: _thirdContact
    });
  }, {
      TModel: individualPersonModel
  });

    function _fetch() {
       APIdoc.getPeople().then(function(data) {
         this.clearModels();
         this.add(data.values);
         this.trigger('change');
       }.bind(this));
      }


// Computed properties
    function _currentContact() {
      var currentIndex = this.get('currentIndex'),
          currentModel = this.itemAt(currentIndex);
      if (currentModel) {
        return currentModel.toObject();
      }
  }

  function _nextContact() {
      var getIndex = this.get('currentIndex'),
          nextIndex = getIndex + 1,
          nextModel = this.itemAt(nextIndex);
      if (nextModel) {
        return nextModel.toObject();
      }
  }
  function _thirdContact() {
      var getIndex = this.get('currentIndex'),
          nextIndex = getIndex + 2,
          nextModel = this.itemAt(nextIndex);
      if (nextModel) {
        return nextModel.toObject();
      }
  }



 return MatchCollection;
});