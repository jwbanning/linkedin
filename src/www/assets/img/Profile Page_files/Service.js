define(function(require) {

  var Config = require('lavaca/util/Config'),
      Promise = require('lavaca/util/Promise'),
      Connectivity = require('lavaca/net/Connectivity'),
      StringUtils = require('lavaca/util/StringUtils');

  // constants
  var _UNDEFINED;

  // private vars
  var _apiURL,
      _mockURL,
      _artificialDelay;

  // private functions
  function _makeRequest(useMock, endpoint, params, type) {
    var promise = new Promise(),
        data,
        url;

    if (!_apiURL) {
      _apiURL = Config.get('api_url');
    }
    if (!_mockURL) {
      _mockURL = Config.get('mock_url');
    }
    if (_artificialDelay === _UNDEFINED) {
      _artificialDelay = Config.get('artificial_network_delay') || false;
    }

    params = params || {};

    url = StringUtils.format(useMock ? _mockURL : _apiURL, endpoint);
    type = useMock ? 'GET' : type || 'GET';
    if (type === 'GET') {
      data = params;
    } else {

      data = JSON.stringify(params);
    }
    Connectivity.ajax({
      url: url,
      dataType: 'json',
      type: type,
      data: data,
    
      success: function(response, status) {
        if (status === 'success') {
          if (useMock && _artificialDelay) {
            setTimeout(function() {
              promise.resolve(response);
            }, _artificialDelay);
          } else {
            promise.resolve(response);
          }
        } else {
          promise.reject(response);
        }
      },
      error: function() {
        var args = Array.prototype.slice.call(arguments, 0);
        if (useMock && _artificialDelay) {
          setTimeout(function() {
            promise.reject.apply(promise, args);
          }, _artificialDelay);
        } else {
          promise.reject.apply(promise, args);
        }
      }
    });
    return promise;
  }
 

  return {
    makeRequest: _makeRequest
  };

});