require([ 'elqQ', 'rsvp' ], function (elq, rsvp) {
  describe('Clickstream', function () {
    context('First party cookie', function () {
      before(function (done) {
        console.log(elq, rsvp);
      });

      it('should track page', function shouldTrackPage(done) {
//         var siteId               = 1862342680;
//         var rootDomain           = 'elqqa01.com';
//         var trackingScriptDomain = 'tracking.eloqua.com';
//         _elqQ.push([ 'elqSetSiteId', siteId ]);
//         _elqQ.push([ 'elqSetRootDomain', rootDomain ]);

        expect(1).toEqual(1);
      });
    });
  });

  function select(instance) {
    console.log(`Selecting instance ${instance}`);
  }

  function buildURL(instance) {
  }

});
