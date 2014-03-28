define(function(require) {

  var Config = require('lavaca/util/Config'),
      Promise = require('lavaca/util/Promise'),
      Connectivity = require('lavaca/net/Connectivity'),
      StringUtils = require('lavaca/util/StringUtils');

  // private vars
  var _apiURL, _applicationId, _restApiKey;

  // private functions

  function _makeRequest(endpoint, params, type) {
    var promise = new Promise(),
        data,
        url;

    _apiURL = Config.get('linkedIn');
    _applicationSecret = Config.get('linkedInSecret');
    _restApiKey = Config.get('linkedInKey');

    params = params || {};

    url = StringUtils.format(_apiURL, endpoint);
    type = type || 'GET';

    if (type === 'GET') {
      data = params;
    } else {
      data = JSON.stringify(params);
    }
      // if (localStorage.getItem('sessionToken', 'sessionToken')) {
      //   requestHeaders['X-Parse-Session-Token'] = "'"+ localStorage.getItem('sessionToken', 'sessionToken').toString() +"'";
      // }

    Connectivity.ajax({
      url: url,
      dataType: 'json',
      type: type,
      data: data,
      dataFilter: function(data, type) {
        if (!data && type === 'json') {
          return 'null';
        }
        return data;
      },
      success: function(response, status) {
        if (status === 'success') {
          promise.resolve(response);
        } else {
          promise.reject(response);
        }
      },
      error: function() {
        var args = Array.prototype.slice.call(arguments, 0);
          promise.reject.apply(promise, args);
      }
    });
    return promise;
  }

  return {
    makeRequest: _makeRequest
  };

});