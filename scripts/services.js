/**
 * services.js
 * application services
 */

angular.module('app')



    // ------------------
    // Router
    // ------------------

    .factory('Router', [

        '$rootScope',
        '$location',
        'Event',

        function($rootScope, $location, Event) {

            var routes = [];
            var disabled = true;

            return {

                route: function() {
                    for (var i = 0; i < routes.length; i++) {
                        if (routes[i].location === $location.path()) return routes[i];
                    }
                },

                update: function(event) {
                    if (disabled) return event.preventDefault();
                    var route = this.route();
                    if (!route) return $location.path('/');
                    this.disable();
                    Event.trigger('router:start', route);
                },

                enable: function() {
                    disabled = false;
                },

                disable: function() {
                    disabled = true;
                },

                config: function(value) {
                    routes = value;
                    $rootScope.$on('$locationChangeStart', this.update.bind(this));
                    Event.on('router:end', this.enable);
                }

            }

        }

    ])



    // ------------------
    // Timings
    // ------------------

    .factory('Timing', [

        '$timeout',

        function($timeout) {

            var Timing = {
                'intro:show': 700,
                'intro:hide': 400,
                'loader:show': 2150,
                'loader:hide': 650
            };

            return function(key, callback) {
                $timeout(callback, Timing[key]);
            }

        }

    ])



    // ------------------
    // Event
    // ------------------

    .factory('Event', [

        function() {

            var events = {};

            return {

                on: function(event, callback) {
                    events[event] = events[event] || [];
                    events[event].push(callback);
                },

                off: function(event, callback) {
                    for (var i = 0; i < events[event].length; i++) {
                        events[event][i] === callback && events[event].splice(i, 1);
                    }
                },

                trigger: function(event, value) {
                    for (var i = 0; i < events[event].length; i++) {
                        events[event][i](value);
                    }
                }

            }

        }

    ]);