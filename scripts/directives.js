/**
 * directives.js
 * application directives
 */

angular.module('app')



    // ------------------
    // Preloader
    // ------------------

    .directive('section', [

        'Event',

        function(Event) {

            return function(scope, element) {

                var length = 0;
                var loaded = 0;
                var images = [];

                function success() {
                    loaded++;
                    if (loaded === length) {
                        Event.trigger('template:end');
                        !scope.$$phase && scope.$apply();
                    }
                }

                function error() {
                    console.log('cannot load', this.src);
                    success();
                }

                function bind() {
                    for (var i = 0; i < length; i++) {
                        images[i].onload = success;
                        images[i].onerror = error;
                    }
                }

                function reset() {
                    images = element.find('img');
                    length = images.length;
                    loaded = 0;
                    !length && Event.trigger('template:end');
                }

                scope.$on('$includeContentLoaded', function() {
                    reset();
                    bind();
                });
            }

        }

    ])



    // ------------------
    // Scroll
    // ------------------

    .directive('scroll', [

        '$document',
        '$window',
        'Event',

        function($document, $window, Event) {

            var section;
            var cards = [];

            var offset = $window.innerHeight / 5;
            var anchor = null;

            var animation = {
                start: false,
                duration: 1000,
                to: 0,
                from: 0,
                stop: false
            };

            if (!$window.requestAnimationFrame) {
                $window.requestAnimationFrame = (function() {
                    return $window.webkitRequestAnimationFrame ||
                        $window.mozRequestAnimationFrame ||
                        $window.oRequestAnimationFrame ||
                        $window.msRequestAnimationFrame ||
                        function(callback) {
                            $window.setTimeout(callback, 1000 / 60);
                        };
                })();
            }

            function animate() {
                var t = Math.min((Date.now() - animation.start) / animation.duration, 1);
                var k = t * (2 - t);
                section.scrollTop = animation.from + (animation.to - animation.from) * k;
                if (t === 1) animation.stop = true;
                if (!animation.stop) $window.requestAnimationFrame(animate);
            }


            function save(value) {
                anchor = value;
            }

            function stop() {
                animation.stop = true;
            }

            function play() {
                var div = $document[0].getElementById(anchor);
                animation.stop = false;
                animation.start = Date.now();
                animation.to = div.offsetTop - 80;
                animation.from = section.scrollTop;
                anchor = null;
                animate();
            }

            function start() {
                section.scrollTop = 0;
                anchor ? play() : scroll();
            }

            function scroll() {
                for (var i = 0; i < cards.length; i++) {
                    if (cards[i].offsetTop < section.offsetHeight) angular.element(cards[i]).addClass('active');
                    else angular.element(cards[i]).toggleClass('active', section.scrollTop + section.offsetHeight - cards[i].offsetTop > offset);
                }
            }

            function resize() {
                offset = $window.innerHeight / 5;
            }

            Event.on('router:end', start);
            Event.on('router:start', stop);
            Event.on('service:save', save);
            Event.on('service:move', play);
            angular.element($window).on('resize', resize);

            return function(scope, element) {
                section = element[0];
                cards = element.children();
                element.on('scroll', scroll);
            }

        }

    ])



    // ------------------
    // Wheel
    // ------------------

    .directive('wheel', [

        function() {

            return function(scope, element, attr) {

                var startY;

                function move(event) {
                    var y = event.touches[0].pageY;
                    if (y >= startY || !scope[attr.wheel]) return;
                    scope[attr.wheel]();
                    !scope.$$phase && scope.$apply();
                }

                function start(event) {
                    startY = event.touches[0].pageY;
                }

                function wheel() {
                    scope[attr.wheel] && scope[attr.wheel]();
                    !scope.$$phase && scope.$apply();
                }

                element.on('touchstart', start);
                element.on('touchmove', move);
                element.on('wheel', wheel);
            }

        }

    ])



    // ------------------
    // Cover
    // ------------------

    .directive('cover', [

        '$window',

        function($window) {

            return function(scope, element) {

                var image = element[0];
                var card = element.parent()[0];

                function css(width, height) {
                    element.css({
                        width: width,
                        height: height
                    })
                }

                function resize() {
                    var w = card.offsetWidth / image.naturalWidth;
                    var h = card.offsetHeight / image.naturalHeight;
                    if (w < h) css('auto', '100%');
                    else css('100%', 'auto');
                }

                function init() {
                    angular.element($window)
                        .on('resize', resize)
                        .triggerHandler('resize');
                }

                element.on('load', init)


            }

        }

    ])



    // ------------------
    // Header
    // ------------------

    .directive('header', [

        '$timeout',
        '$window',

        function($timeout, $window) {
            return function(scope, element) {
                $timeout(function() {
                    var scroll = $window.innerWidth - element[0].offsetWidth;
                    element
                        .css('right', scroll + 'px')
                        .next()
                        .css('margin-left', -(scroll / 2 + 15) + 'px');
                });

            }
        }

    ])



    // ------------------
    // Navigate
    // ------------------

    .directive('navigate', [

        '$location',

        function($location) {

            return function(scope, element, attr) {
                element.on('click', function() {
                    $location.path(attr.navigate);
                    !scope.$$phase && scope.$apply();
                })

            }
        }

    ]);
