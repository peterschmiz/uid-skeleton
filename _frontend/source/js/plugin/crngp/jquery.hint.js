(function ($) {
	'use strict';
	$.fn.hint = function (options) {

		var defaultsettings = {
				autoWidth: false, // fix width should be in css, but sometimes autowidth may useful
				follow: true, // hint follows the mouse cursor or stay aligned with object hovered
				align: 'n', // possible values: n | ne | e | se | s | sw | w | nw
				//align: 't', // possible values: t | tr | r | br | b | bl | l | tl
				force: false, // force to show hint even $('body').hasClass('no-hint')
				cssClass: '', // additional className for div.hint
				content: '', // hint content, obj.title by default, or can be function with string result
				attr: null // attribute if content is function
			},
			timer = null,
			clearTimer = function () {
				clearTimeout(timer);
			};

		return this.each(function () {

			var settings = $.extend(true, {}, defaultsettings, options),
				$body = $('body'),
				$this = $(this),
				$obj = $('<div class="hint ' + (settings.autoWidth ? 'autowidth ' : ' ') + (settings.follow ? 'follow ' : ' ') + settings.align + ' ' + settings.cssClass + '" id="hint"><div class="bg"><b></b></div><div class="inner">' + '' + '</div></div>'),
				align = {
					x: (String(' w nw sw ').indexOf(' ' + settings.align + ' ') >= 0) ? -1 : (String(' n s ').indexOf(' ' + settings.align + ' ') >= 0) ? -0.5 : 0,
					y: (String(' n nw ne ').indexOf(' ' + settings.align + ' ') >= 0) ? -1 : (String(' w e ').indexOf(' ' + settings.align + ' ') >= 0) ? -0.5 : 0
				},
				pos = {x: 0, y: 0},
				follow = settings.follow,
				content = settings.content || $this.attr('title') || '',
				attr = settings.attr,
				force = settings.force;

			$this.attr('title', '');

			$this
				.mouseenter(function (e) {
					e.stopPropagation();
					var mycontent = ( 'function' === typeof(content) ) ? content(attr, $this) : content;
					if ('' === mycontent) {
						return false;
					}
					if (($body.hasClass('no-hint')) && (!force)) {
						return false;
					}
					$('#hint').remove();
					timer = setTimeout(function () {
						$obj.find('.inner').html(mycontent);
						$body.append($obj);
						pos.x = -$body.offset().left + align.x * $obj.width() + ((follow) ? e.pageX : $this.offset().left + (1 + align.x) * $this.innerWidth());
						pos.y = -$body.offset().top + align.y * $obj.height() + ((follow) ? e.pageY : $this.offset().top + (1 + align.y) * $this.innerHeight());
						$obj.css({'left': ~~(pos.x) + 'px', 'top': ~~(pos.y) + 'px'});
					}, 5);
				})
				.mouseleave(function () {
					clearTimer();
					$('#hint').remove();
				});

			if (follow) {
				$this.mousemove(function (e) {
					if (($body.hasClass('no-hint')) && (!force)) {
						return false;
					}
					pos.x = -$body.offset().left + align.x * $obj.width() + e.pageX;
					pos.y = -$body.offset().top + align.y * $obj.height() + e.pageY;
					$obj.css({'left': ~~(pos.x) + 'px', 'top': ~~(pos.y) + 'px'});
				});
			}
		});
	};

}(jQuery));