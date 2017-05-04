// 1. lets first listen for the scroll event
(function($) {
    function mScrollTop(element, settings) {

        var _ = this,
            breakpoint;
        var scrollTo = 0;

        _.btnClass = '.material-scrolltop';
        _.revealClass = 'reveal';
        _.btnElement = $(_.btnClass);

        _.initial = {
            revealElement: 'body',
            revealPosition: 'top',
            padding: 0,
            duration: 600,
            easing: 'swing',
            onScrollEnd: false
        }

        _.options = $.extend({}, _.initial, settings);

        _.revealElement = $(_.options.revealElement);
        breakpoint = _.options.revealPosition !== 'bottom' ? _.revealElement.offset().top : _.revealElement.offset().top + _.revealElement.height();
        scrollTo = element.offsetTop + _.options.padding;

        $(document).scroll(function() {
            if (breakpoint < $(document).scrollTop()) {
                _.btnElement.addClass(_.revealClass);
            } else {
                _.btnElement.removeClass(_.revealClass);
            }
        });

        _.btnElement.click(function() {
            var trigger = true;
            $('html, body').animate({
                scrollTop: scrollTo
            }, _.options.duration, _.options.easing, function() {
                if (trigger) { // Fix callback triggering twice on chromium
                    trigger = false;
                    var callback = _.options.onScrollEnd;
                    if (typeof callback === "function") {
                        callback();
                    }
                }
            });
            return false;
        });
    }

    $.fn.materialScrollTop = function() {
        var _ = this,
            opt = arguments[0],
            l = _.length,
            i = 0;
        if (typeof opt == 'object' || typeof opt == 'undefined') {
            _[i].materialScrollTop = new mScrollTop(_[i], opt);
        }
        return _;
    };
}(jQuery));
// 2. lets create the button
<script>
    $('body').materialScrollTop();
</script>

// 3. lets create the css properties
.material-scrolltop {
    display: block;
    position: fixed;
    width: 0;
    height: 0;
    bottom: 23px;
    right: 23px;
    padding: 0;
    overflow: hidden;
    outline: none;
    border: none;
    border-radius: 2px;
    box-shadow: 0 3px 10px rgba(0, 0, 0, 0.5);
    cursor: hand;
    border-radius: 50%;
    background: #4caf50;
    -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
    -webkit-transition: all 0.3s cubic-bezier(0.25, 0.25, 0, 1);
    -ms-transition: all 0.3s cubic-bezier(0.25, 0.25, 0, 1);
    -moz-transition: all 0.3s cubic-bezier(0.25, 0.25, 0, 1);
    -o-transition: all 0.3s cubic-bezier(0.25, 0.25, 0, 1);
    transition: all 0.3s cubic-bezier(0.25, 0.25, 0, 1);
}

.material-scrolltop:hover {
    background-color: #4caf50;
    text-decoration: none;
    box-shadow: 0 3px 10px rgba(0, 0, 0, 0.5), 0 3px 15px rgba(0, 0, 0, 0.5);
}

.material-scrolltop::before {
    position: absolute;
    top: 50%;
    left: 50%;
    -webkit-transform: translate(-50%, -50%);
    -ms-transform: translate(-50%, -50%);
    -moz-transform: translate(-50%, -50%);
    -o-transform: translate(-50%, -50%);
    transform: translate(-50%, -50%);
    content: "";
    width: 0;
    border-radius: 100%;
    background: #66bb6a;
}

.material-scrolltop:active::before {
    width: 120%;
    padding-top: 120%;
    -webkit-transition: all 0.2s ease-out;
    -ms-transition: all 0.2s ease-out;
    -moz-transition: all 0.2s ease-out;
    -o-transition: all 0.2s ease-out;
    transition: all 0.2s ease-out;
}

.material-scrolltop.reveal {
    width: 56px;
    height: 56px;
}

.material-scrolltop span {
    display: block;
    font-size: 25px;
    color: #fff;
}

.material-scrolltop,
.material-scrolltop::before {
    background-image: url(icons/top-arrow.svg);
    background-position: center 50%;
    background-repeat: no-repeat;
}
/*# sourceMappingURL=material-scrolltop.css.map */

// 4. lets create the on click
$('#top').click(function () {
    $('body,html').animate({

      // position you want to scroll to
      scrollTop: 0
    }, 500);

    // stop anchor link behavior
    return false;
});
<!--scss-->
// ==========================================================================
//   Mixins for material-scrolltop
// ==========================================================================

@mixin prefixer($name, $argument) {
    -webkit-#{$name}: #{$argument};
    -ms-#{$name}: #{$argument};
    -moz-#{$name}: #{$argument};
    -o-#{$name}: #{$argument};
    #{$name}: #{$argument};
}

@mixin centerer {
    position: absolute;
    top: 50%;
    left: 50%;
    @include prefixer(transform, translate(-50%, -50%));
}

// ==========================================================================
//   Stylesheet
// ==========================================================================

.material-scrolltop {
    display: block;
