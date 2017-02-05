/**
 * controller.js
 * application controllers
 */

angular.module('app')



    // ------------------
    // Body
    // ------------------

    .controller('Body', [

        '$scope',
        'Event',

        function($scope, Event) {

            $scope.disabled = true;

            function hide() {
                $scope.disabled = false;
            }

            function show() {
                $scope.disabled = true;
            }

            function toggle(value) {
                $scope.disabled = value;
            }

            function init() {
                $scope.disabled = false;
                Event.on('router:start', show);
                Event.on('router:end', hide);
            }

            Event.on('run', init);
            Event.on('disable', toggle);
        }

    ])



    // ------------------
    // Intro
    // ------------------

    .controller('Intro', [

        '$scope',
        '$window',
        'Router',
        'Event',
        'Timing',

        function($scope, $window, Router, Event, Timing) {

            function done() {
                Event.off('router:start', load);
                Event.off('template:end', show);
                Event.trigger('router:end');
                Event.trigger('run');
            }

            function hide() {
                $scope.hide = null;
                $scope.animation = 'hide';
                Timing('intro:hide', done);
            }

            function bind() {
                $scope.hide = hide;
            }

            function show() {
                $scope.animation = 'show';
                Timing('intro:show', bind);
            }

            function load() {
                Event.trigger('template:start');
            }

            function init() {
                Event.on('router:start', load);
                Event.on('template:end', show);
                Router.enable();
                Router.update();
                $scope.$apply();
            }

            angular.element($window).on('load', init);

        }

    ])



    // ------------------
    // Header
    // ------------------

    .controller('Header', [

        '$scope',
        'Event',

        function($scope, Event) {

            $scope.ready = false;
            $scope.opened = false;

            $scope.switch = function() {
                $scope.opened = !$scope.opened;
                Event.trigger('disable', $scope.opened);
            };

            function hide() {
                $scope.opened = false;
            }

            function init() {
                $scope.ready = true;
            }

            Event.on('run', init);
            Event.on('router:start', hide);

        }

    ])



    // ------------------
    // Loader
    // ------------------

    .controller('Loader', [

        '$scope',
        'Event',
        'Timing',

        function($scope, Event, Timing) {

            function hide() {
                $scope.active = false;
                Event.trigger('router:end');
            }

            function load() {
                Event.trigger('template:start');
            }

            function show() {
                $scope.active = true;
                Timing('loader:show', load);
            }

            function init() {
                $scope.ready = true;
                Event.on('router:start', show);
                Event.on('template:end', hide);
            }

            Event.on('run', init);

        }

    ])



    // ------------------
    // Section
    // ------------------

    .controller('Section', [

        '$scope',
        '$location',
        'Event',

        function($scope, $location, Event) {

            $scope.route = null;
            $scope.hide = false;

            $scope.service = function(value) {
                Event.trigger('service:save', value);
                if ($location.path() === '/services') {
                    Event.trigger('service:move');
                }
                else {
                    Event.trigger('service:save', value);
                    $location.path('/services');
                }
            };

            function show() {
                $scope.hide = false;
            }

            function load() {
                $scope.template = $scope.route.template;
            }

            function hide(route) {
                $scope.hide = true;
                $scope.route = route;
            }

            Event.on('router:start', hide);
            Event.on('template:start', load);
            Event.on('template:end', show);

        }

    ]);

