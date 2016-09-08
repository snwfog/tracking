(function () {
  var elqSiteID = '';
  var elqWDt = new Date(20020101);
  var elqDt = new Date();
  var elqMs = elqDt.getMilliseconds();
  var elqTzo = elqWDt.getTimezoneOffset();
  var winRef = window;
  var docRef = document;
  var elqOptInDisabled = 0;
  var elqOptInAllVisitor = 1;
  var elqOptInByCountry = 2;
  var elqVisitorGUID = '';
  var elqBKUUIDSwapTime = '';
  var elqFilePath = '/visitor/v200/svrGP';
  var elqDomain = 'eloqua.com';
  var elqCurE = '';
  var elqFirstPartyCookieDomain = '';

  function elqIsInvalid(obj) {
    return (typeof (obj) === 'undefined' || null === obj || obj === '');
  }

  function elqUriIsEncoded(uri) {
    try {
      return (typeof (uri) === 'string' && decodeURI(uri) !== uri);
    } catch (e) {
      return false;
    }
  }

  function elqSetReferrer(elqReferrer) {
    if (elqIsInvalid(elqReferrer)) {
      if (document.referrer) {
        elqReferrer = encodeURI(document.referrer);
      }
      else {
        elqReferrer = 'elqNone';
      }
    }

    return elqReferrer;
  }

  function elqDataLookup(elqDLKey, elqDLLookup) {
    if (!elqIsInvalid(elqCurE) && !elqIsInvalid(elqSiteID)) {
      var elqDataLookupSrc = elqCurE + '?pps=50&siteid=' + elqSiteID + '&DLKey=' + encodeURIComponent(elqDLKey) + '&DLLookup=' +  encodeURIComponent(elqDLLookup) + '&ms=' + elqMs + elqFirstPartyCookieDomain;

      if (!elqIsInvalid(elqVisitorGUID)) {
        elqDataLookupSrc += '&elqGUID=' + elqVisitorGUID;
      }

      var script = document.createElement("script");
      script.type = "text/javascript";
      script.src = elqDataLookupSrc;
      document.getElementsByTagName("head")[0].appendChild(script);
    }
  }

  function elqGetCustomerGUID() {
    if (!elqIsInvalid(elqCurE) && !elqIsInvalid(elqSiteID)) {
      var elqGetCustomerGUIDSrc = elqCurE + '?pps=70&siteid=' + elqSiteID + '&ref=' + encodeURI(document.referrer) + '&ms=' + elqMs + elqFirstPartyCookieDomain;

      if (!elqIsInvalid(elqVisitorGUID)) {
        elqGetCustomerGUIDSrc += '&elqGUID=' + elqVisitorGUID;
      }

      var script = document.createElement("script");
      script.type = "text/javascript";
      script.src = elqGetCustomerGUIDSrc;
      document.getElementsByTagName("head")[0].appendChild(script);
    }
  }

  function elqTrackPage(elqPageURL, elqReferrer, elqOptIn) {
    var elqOptInOption = '';

    if (!elqIsInvalid(elqCurE) && !elqIsInvalid(elqSiteID)) {
      if (elqFirstPartyCookieDomain != '') {
        var elqOptinCookie = elqGetCookie('OPTIN');
        if (elqOptinCookie != null) {
          if (elqOptinCookie == '0') {
            return;
          } else if (elqOptinCookie == '1') {
            elqOptInOption += '&isOptedIn=1';
          }
        }
      }

      elqReferrer = elqSetReferrer(elqReferrer);

      if (!elqIsInvalid(elqOptIn)) {
        if (elqOptIn === elqOptInByCountry) {
          elqOptInOption += '&optin=country';
        } else if (elqOptIn === elqOptInAllVisitor) {
          elqOptInOption += '&optin=all';
        } else if (elqOptIn === elqOptInDisabled) {
          elqOptInOption += '&optin=disabled';
        }
      }

      var img = new Image(1, 1);
      if (!elqIsInvalid(elqPageURL)) {
        var imgSrc = elqCurE + '?pps=3&siteid=' + elqSiteID +
          '&ref=' + encodeURI(elqPageURL) +
          '&ref2=' + elqReferrer +
          '&tzo=' + elqTzo +
          '&ms=' + elqMs +
          elqOptInOption +
          elqFirstPartyCookieDomain;

        if (!elqIsInvalid(elqVisitorGUID)) {
          imgSrc += '&elqGUID=' + elqVisitorGUID;
        }
        imgSrc += elqBlueKaiQueryString(elqBKUUIDSwapTime);
        img.src = imgSrc;
      } else {
        var imgSrc = elqCurE + '?pps=3&siteid=' + elqSiteID +
          '&ref2=' + elqReferrer +
          '&tzo=' + elqTzo +
          '&ms=' + elqMs +
          elqOptInOption +
          elqFirstPartyCookieDomain;

        if (!elqIsInvalid(elqVisitorGUID)) {
          imgSrc += '&elqGUID=' + elqVisitorGUID;
        }
        imgSrc += elqBlueKaiQueryString(elqBKUUIDSwapTime);
        img.src = imgSrc;
      }
    }
  }

  function elqTrackPageView(elqPageURL, elqReferrer) {
    elqTrackPage(elqPageURL, elqReferrer, elqOptInDisabled);
  }

  function elqTrackPageViewOptinByCountry(elqPageURL, elqReferrer) {
    elqTrackPage(elqPageURL, elqReferrer, elqOptInByCountry);
  }

  function elqTrackPageViewOptinAll(elqPageURL, elqReferrer) {
    elqTrackPage(elqPageURL, elqReferrer, elqOptInAllVisitor);
  }

  function elqOptAction(elqPps) {
    if (!elqIsInvalid(elqCurE) && !elqIsInvalid(elqSiteID) && !elqIsInvalid(elqPps)) {
      if (elqPps == 40 && elqFirstPartyCookieDomain != '') {
        var elqOptin = elqGetCookie('OPTIN');
        if (elqOptin != null) {
          if (elqOptin == '0') {
            return elqInsertInlineJs('function elqGetOptOutStatus(){ return 0; }');
          } else if (elqOptin == '1') {
            return elqInsertInlineJs('function elqGetOptOutStatus(){ return 1; }');
          }
        }
      }
      if ((elqPps != 43 && elqPps != 44) || elqFirstPartyCookieDomain == '') {
        elqOptActionSrc = elqCurE + '?pps=' + encodeURIComponent(elqPps) + '&siteid=' + elqSiteID + '&ref=' + encodeURI(location.href) + '&ms=' + elqMs + elqFirstPartyCookieDomain;

        if (!elqIsInvalid(elqVisitorGUID)) {
          elqOptActionSrc += '&elqGUID=' + elqVisitorGUID;
        }

        var script = document.createElement('script');
        script.type = 'text/javascript';
        script.src = elqOptActionSrc;
        document.getElementsByTagName('head')[0].appendChild(script);
      }
    }
  }

  function elqInsertInlineJs(code) {
    var script = document.createElement('script');
    script.type = 'text/javascript';
    script.appendChild(document.createTextNode(code));
    document.getElementsByTagName('head')[0].appendChild(script);
  }

  function elqDisplayOptInBannerForThirdPartyCookieTracking(elqOptInByCountryOption, elqPageURL, elqReferrer) {
    if (!elqIsInvalid(elqCurE) && !elqIsInvalid(elqSiteID)) {
      if (elqFirstTimeVisitSite()) {
        elqSetCookie('ELQSITEVISITED', 'YES');

        elqDisplayOptInBanner(elqOptInByCountryOption, elqPageURL, elqReferrer);
      } else {
        if (elqOptInByCountryOption == elqOptInByCountry) {
          elqTrackPageViewOptinByCountry(elqPageURL, elqReferrer);
        } else {
          elqTrackPageViewOptinAll(elqPageURL, elqReferrer);
        }
      }
    }
  }

  function elqDisplayOptInBannerForFirstPartyCookieTracking(elqOptInByCountryOption, elqPageURL, elqReferrer) {
    if (!elqIsInvalid(elqCurE) && !elqIsInvalid(elqSiteID)) {
      var elqOptin = elqGetCookie('OPTIN');
      if (elqOptin != null) {
        if (elqOptin == '0') {
          return;
        } else if (elqOptin == '1') {
          elqTrackPage(elqPageURL, elqReferrer, elqOptInByCountryOption);
        }
      }
      else {
        if (elqFirstTimeVisitSite()) {
          elqSetCookie('ELQSITEVISITED', 'YES');
          if (elqOptInByCountryOption == elqOptInByCountry) {
            elqDisplayOptInBanner(elqOptInByCountryOption, elqPageURL, elqReferrer);
          } else {
            elqCreateOptInBanner();
          }
        } else {
          if (elqOptInByCountryOption == elqOptInByCountry) {
            elqTrackPage(elqPageURL, elqReferrer, elqOptInByCountryOption);
          }
        }
      }
    }
  }

  function elqDisplayOptInBanner(elqOptInByCountryOption, elqPageURL, elqReferrer) {
    elqReferrer = elqSetReferrer(elqReferrer);
    var elqDisplayOptInBannerSrc = elqCurE + '?pps=45&siteid=' + elqSiteID + elqFirstPartyCookieDomain;

    if (!elqIsInvalid(elqPageURL)) {
      elqDisplayOptInBannerSrc += '&ref=' + encodeURI(elqPageURL);
    }

    elqDisplayOptInBannerSrc += '&ref2=' + elqReferrer + '&tzo=' + elqTzo + '&ms=' + elqMs;

    if (elqOptInByCountryOption == elqOptInByCountry) {
      elqDisplayOptInBannerSrc += '&optin=country';
    } else {
      elqDisplayOptInBannerSrc += '&optin=all';
    }

    if (!elqIsInvalid(elqVisitorGUID)) {
      elqDisplayOptInBannerSrc += '&elqGUID=' + elqVisitorGUID;
    }

    var script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = elqDisplayOptInBannerSrc;
    document.getElementsByTagName('head')[0].appendChild(script);
  }

  function elqTrackPageViewDisplayOptInBannerByCountry(elqPageURL, elqReferrer) {
    if (elqFirstPartyCookieDomain != '') {
      elqDisplayOptInBannerForFirstPartyCookieTracking(elqOptInByCountry, elqPageURL, elqReferrer);
    } else {
      elqDisplayOptInBannerForThirdPartyCookieTracking(elqOptInByCountry, elqPageURL, elqReferrer);
    }
  }

  function elqTrackPageViewDisplayOptInBannerForAll(elqPageURL, elqReferrer) {
    if (elqFirstPartyCookieDomain != '') {
      elqDisplayOptInBannerForFirstPartyCookieTracking(elqOptInAllVisitor, elqPageURL, elqReferrer);
    } else {
      elqDisplayOptInBannerForThirdPartyCookieTracking(elqOptInAllVisitor, elqPageURL, elqReferrer);
    }
  }

  function elqSetCookie(name, value) {
    document.cookie = name + '=' + value;
    document.cookie += ';path=/; secure; HttpOnly; ';
  }

  function elqGetValue(keyValuePair, key) {
    if (keyValuePair == '') {
      return null;
    }
    var posEquals = keyValuePair.indexOf('=');
    if (posEquals > 0) {
      var x = keyValuePair.substr(0, posEquals);
      if (x.trim() == key) {
        return keyValuePair.substr(posEquals + 1);
      }
    }
    return null;
  }

  function elqGetCookie(name) {
    var cookies = document.cookie.split(';');
    for (var i = 0; i < cookies.length; i++) {
      elqCookieValue = elqGetValue(cookies[i], name)
      if (elqCookieValue != null) {
        return unescape(elqCookieValue);
      }
    }
    return null;
  }

  function elqGetSubCookieValue(name, subCookieName) {
    var elqCookieValue = elqGetCookie(name);
    if (elqCookieValue != null) {
      var elqSubCookies = elqCookieValue.split('&');
      for (var i = 0; i < elqSubCookies.length; i++) {
        elqCookieValue = elqGetValue(elqSubCookies[i], subCookieName)
        if (elqCookieValue != null) return elqCookieValue;
      }
    }
    return null;
  }

  function elqFirstTimeVisitSite() {
    var sitevisited = elqGetCookie('ELQSITEVISITED');
    return sitevisited == null || sitevisited != 'YES';
  }

  function elqBlueKaiQueryString(elqBKUUIDSwapTime) {
    var qs = '';

    if (!elqIsInvalid(elqBKUUIDSwapTime)) {
      qs += '&bkuuidSwapTime=' + encodeURIComponent(elqBKUUIDSwapTime);
    }
    return qs;
  }

  function isInt(value) {
    return !isNaN(value) &&
      parseInt(Number(value)) == value &&
      !isNaN(parseInt(value, 10));
  }

  var elqQueue = function () {
    this.push = function () {
      for (var i = 0; i < arguments.length; i++) {
        try {
          if (typeof arguments[i] === "function") arguments[i]();
          else {
            switch (arguments[i][0]) {
              case 'elqSetRootDomain':
                elqDomain = encodeURIComponent(arguments[i][1]);
                var elqPort;
                if (arguments[i][2] != undefined && isInt(arguments[i][2])) {
                  elqPort = arguments[i][2];
                  elqDomain = elqDomain + ':' + elqPort;
                }
                elqCurE = ('https:' == document.location.protocol ? 'https://' : 'http://') + 's' + elqSiteID + '.t.' + elqDomain + elqFilePath;
                break;
              case 'elqSetSiteId':
                elqSiteID = encodeURIComponent(arguments[i][1]);
                elqCurE = ('https:' == document.location.protocol ? 'https://' : 'http://') + 's' + elqSiteID + '.t.' + elqDomain + elqFilePath;
                break;
              case 'elqTrackPageView':
                // arg 1 is to override the page url to track
                // arg 2 is to override the referring url
                elqTrackPageView.apply(this, arguments[i].slice(1));
                break;
              case 'elqVisitorGuid':
                elqVisitorGUID = encodeURIComponent(arguments[i][1]);
                break;
              case 'elqTrackPageViewOptinByCountry':
                elqTrackPageViewOptinByCountry.apply(this, arguments[i].slice(1));
                break;
              case 'elqTrackPageViewOptinAll':
                elqTrackPageViewOptinAll.apply(this, arguments[i].slice(1));
                break;
              case 'elqTrackPageViewDisplayOptInBannerByCountry':
                elqTrackPageViewDisplayOptInBannerByCountry.apply(this, arguments[i].slice(1));
                break;
              case 'elqTrackPageViewDisplayOptInBannerForAll':
                elqTrackPageViewDisplayOptInBannerForAll.apply(this, arguments[i].slice(1));
                break;
              case 'elqDataLookup':
                // arg 1 is data lookup key
                // arg 2 is the data lookup value
                elqDataLookup.apply(this, arguments[i].slice(1));
                break;
              case 'elqGetCustomerGUID':
                elqGetCustomerGUID.apply(this);
                break;
              case 'elqOptStatus':
                elqOptAction(40);
                break;
              case 'elqOptIn':
                elqOptAction(41);
                break;
              case 'elqOptOut':
                elqOptAction(42);
                break;
              case 'elqGlobalOptIn':
                elqOptAction(43);
                break;
              case 'elqGlobalOptOut':
                elqOptAction(44);
                break;
              case 'elqUseFirstPartyCookie':
                elqFirstPartyCookieDomain = '&firstPartyCookieDomain=' + encodeURIComponent(arguments[i][1]);
                var elqCookieVisitorGuid = elqGetSubCookieValue('ELOQUA', 'GUID');
                if (elqCookieVisitorGuid != null) {
                  elqVisitorGUID = encodeURIComponent(elqCookieVisitorGuid);
                }
                elqBKUUIDSwapTime = elqGetCookie('BKUT');
                break;
              default:
            }
          }
        }
        catch (e) {
        }
      }
    };
  };

  // get the existing _elqQ array
  var _old_elqQ = winRef._elqQ;

  // create a new _elqQ object
  winRef._elqQ = new elqQueue();

  // execute all of the queued up events - apply() turns the array entries into individual arguments
  winRef._elqQ.push.apply(winRef._elqQ, _old_elqQ);

  function _trackEvent(redirectUrl, customQs, referrer) {
    if (!elqIsInvalid(elqCurE) && !elqIsInvalid(elqSiteID) && !elqIsInvalid(redirectUrl)) {
      referrer = elqSetReferrer(referrer);

      var url = elqCurE + '?pps=17&siteid=' + elqSiteID +
        '&elq=' + encodeURIComponent(customQs || "") +
        '&ref=' + encodeURI(redirectUrl) +
        '&ref2=' + referrer +
        '&ms=' + elqMs;

      if (!elqIsInvalid(elqVisitorGUID)) {
        url += '&elqGUID=' + elqVisitorGUID;
      }
      url += elqBlueKaiQueryString(elqBKUUIDSwapTime);

      if (url.length <= 2036) {
        var img = new Image(1, 1);
        img.src = url;
      }
      else {
        try {
          var ifr = docRef.createElement("iframe");
        }
        catch (e) {
          ifr = "<iframe src='" + url + "' width='0' height='0' style='display:none;visibility:hidden;'></iframe>";
          docRef.body.innerHTML += ifr;
          return;
        }

        ifr.height = "0";
        ifr.width = "0";
        ifr.style.display = "none";
        ifr.style.visibility = "hidden";

        docRef.body.appendChild(ifr);
        ifr.src = url;
      }
    }
  }

  winRef._elq = {
    trackEvent: function (redirectUrl, customQs, referrer) {
      _trackEvent(redirectUrl, customQs, referrer);
    },
    trackOutboundLink: function (anchorObj, customQs, referrer) {
      _trackEvent(anchorObj.href, customQs, referrer);
      var redirectUrl = elqUriIsEncoded(anchorObj.href) ? anchorObj.href : encodeURI(anchorObj.href);
      var redirectCall;
      var target = anchorObj.getAttribute('target');
      if (elqIsInvalid(target)) {
        redirectCall = 'document.location = "' + redirectUrl + '"';
      } else {
        redirectCall = 'window.open("' + redirectUrl + '", "' + encodeURIComponent(target) + '")';
      }
      setTimeout(redirectCall, 1000);
    }
  };
})();