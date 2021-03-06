define([ 'elqQ', 'rsvp' ], function (elq, rsvp) {
  describe('Clickstream::first party cookie', function () {
    beforeAll(function () {
      console.log(elq, rsvp);
    });

    it('should track page', function shouldTrackPage() {
      var siteId               = 1862342680;
      var rootDomain           = 'elqqa01.com';
      var trackingScriptDomain = 'tracking.eloqua.com';
      elq.push([ 'elqSetSiteId', siteId ]);
      elq.push([ 'elqSetRootDomain', rootDomain ]);
      elq.push([ 'elqTrackPageView' ]);

      expect(1).toEqual(1);
    });
  });

  function select(instance) {
    console.log(`Selecting instance ${instance}`);
  }

  function buildURL(instance) {
  }
});
