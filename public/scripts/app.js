/**
 * app.js
 * application config and launcher
 */

angular.module('app', [])

    .run([

        'Router',

        function(Router) {

            Router.config([
              {
                location: '/',
                template: 'templates/home.html'
            }, {
                location: '/over',
                template: 'templates/over-mediascheppers.html'
            }, {
                location: '/contact',
                template: 'templates/contact-mediascheppers.html'
            }, {
                location: '/services',
                template: 'templates/services.html'
            }, {
                location: '/projecten',
                template: 'templates/projecten.html'
            }, {
                location: '/projecten/travelbuddy',
                template: 'templates/projects/travelbuddy.html'
            }, {
                location: '/projecten/anouk-van-emmerik',
                template: 'templates/projects/anouk-van-emmerik.html'
            }, {
                location: '/projecten/helloprint-drukzo',
                template: 'templates/projects/helloprint-drukzo.html'
            }, {
                location: '/projecten/bano-benelux',
                template: 'templates/projects/bano-benelux.html'
            }, {
                location: '/projecten/eerstvergelijken-nl',
                template: 'templates/projects/eerstvergelijken-nl.html'
            }, {
                location: '/projecten/overstappen-nl',
                template: 'templates/projects/overstappen-nl.html'
            }, {
                location: '/social-media-ebook',
                template: 'templates/social-media-ebook.html'
            }




          ]);

        }

    ]);
