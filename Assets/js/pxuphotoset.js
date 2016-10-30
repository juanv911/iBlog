/*!
    --------------------------------
    PXU Photoset Extended
    --------------------------------
    + https://github.com/PixelUnion/Extended-Tumblr-Photoset
    + http://pixelunion.net
    + Version 1.6.0
    + Copyright 2012 Pixel Union
    + Licensed under the MIT license
*/
(function(a) {
	a.fn.pxuPhotoset = function(b, f) {
		var e = {
			lightbox: true,
			highRes: true,
			rounded: "corners",
			borderRadius: "5px",
			exif: true,
			captions: true,
			gutter: "14px",
			photoset: ".photo-slideshow",
			photoWrap: ".photo-data",
			photo: ".pxu-photo"
		};
		var c = a.extend(e, b);
		if (c.lightbox) {
			a(".tumblr-box").on("click", function(i) {
				i.preventDefault();
				var h = a(this);
				var g = h.parents(c.photoset).attr("id");
				d(h, g)
			});
			var d = function(h, j) {
				var g = h.parents(c.photoWrap).find(c.photo + " img").data("count");
				var i = [];
				a("#" + j).find(c.photoWrap).each(function() {
					var m = a(this).find(c.photo + " img");
					var l = m.data("width");
					var k = m.data("height");
					var n = m.attr("src");
					var o = m.data("highres");
					var p = {
						width: l,
						height: k,
						low_res: n,
						high_res: o
					};
					i.push(p)
				});
				Tumblr.Lightbox.init(i, g)
			}
		}
		a(c.photoWrap).on("mouseenter", function() {
			a(this).find(".icons").css("visibility", "visible")
		}).on("mouseleave", function() {
			a(this).find(".icons").css("visibility", "hidden")
		});
		a("span.info").on("mouseenter", function() {
			var g = a(this);
			var h = g.children(".pxu-data");
			h.css("display", "block").stop(true, false).animate({
				opacity: 1
			}, 200)
		});
		a("span.info").on("mouseleave", function() {
			var g = a(this);
			var h = g.children(".pxu-data");
			h.stop(true, false).animate({
				opacity: 0
			}, 200, function() {
				a(this).css("display", "none")
			})
		});
		return this.each(function() {
			var r = a(this);
			var g = r.data("layout");
			var n = JSON.stringify(g).split("");
			var s = n.length;
			var w = r.find(c.photo + " img");
			for (l = 0; l < w.length; l++) {
				var k = w.eq(l);
				k.attr("data-count", l + 1)
			}
			var t = [];
			for (l = 1; l <= s; ++l) {
				var v = 0;
				for (var h = 0; h < l; ++h) {
					var u = parseInt(n[h], 10);
					v += u
				}
				var m = parseInt(n[l - 1], 10);
				t[l] = Array(l, m, v)
			}
			for (var l = 1; l <= s; l++) {
				var q;
				if (l === 1) {
					q = 0
				} else {
					q = t[l - 1][2]
				}
				r.find(c.photoWrap).slice(q, t[l][2]).addClass("count-" + t[l][1]).wrapAll('<div class="row clearit" />')
			}
			a(this).find(".row").css("margin-bottom", c.gutter);
			a(this).find(c.photoWrap + ":not(:first-child) " + c.photo + " img").css("margin-left", c.gutter);
			Array.min = function(i) {
				return Math.min.apply(Math, i)
			};

			function j(A) {
				var L = A.find(".row");
				var F = L.length;
				var E;
				var D;
				var H;
				var C;
				var p;
				for (var K = 0; K < F; K++) {
					currentRow = L.eq(K);
					images = currentRow.find(c.photoWrap + " img");
					photoCount = images.length;
					if (photoCount > 1) {
						var J = currentRow.find(c.photo + " img").map(function() {
							E = a(this);
							D = E.data("width");
							H = E.data("height");
							C = E.parent().width();
							p = (C / D) * H;
							E.data("new-height", p);
							return p
						}).get();
						var z = Array.min(J);
						currentRow.height(z).find(c.photo).height(z);
						for (l = 0; l < photoCount; l++) {
							var G = images.eq(l);
							var I = G.data("new-height");
							var i = z;
							if (I > i) {
								var B = (I - i) / 2;
								G.css("margin-top", -B)
							}
						}
					}
				}
			}
			j(r);
			a(window).resize(function() {
				j(r)
			});
			if (c.exif && c.captions) {
				r.find(c.photoWrap).each(function() {
					var F = a(this).find("img");
					var p;
					var z;
					if (F.hasClass("exif-yes")) {
						var E = F.data("camera") || "-";
						var A = F.data("iso") || "-";
						var B = F.data("aperture") || "-";
						var i = F.data("exposure") || "-";
						var C = F.data("focal") || "-";
						p = '<table class="exif"><tr><td colspan="2"><span class="label">Camera</span><br>' + E + '</td></tr><tr><td><span class="label">ISO</span><br>' + A + '</td><td><span class="label">Aperture</span><br>' + B + '</td></tr><tr><td><span class="label">Exposure</span><br>' + i + '</td><td><span class="label">Focal Length</span><br>' + C + "</td></tr></table>"
					} else {
						p = ""
					}
					if (F.hasClass("caption-yes")) {
						var D = F.data("caption");
						z = '<p class="pxu-caption">' + D + "</p>"
					} else {
						z = ""
					}
					if (z !== "" || p !== "") {
						a(this).find(".info").append('<div class="pxu-data">' + z + p + '<span class="arrow-down"></span></div>');
						if (p === "") {
							a(this).find(".pxu-data").addClass("caption-only")
						}
						a(this).find("span.info").css("display", "block")
					}
				})
			} else {
				if (c.exif) {
					r.find(c.photoWrap).each(function() {
						var C = a(this).find("img");
						if (C.hasClass("exif-yes")) {
							var p = C.data("camera") || "-";
							var i = C.data("iso") || "-";
							var D = C.data("aperture") || "-";
							var B = C.data("exposure") || "-";
							var A = C.data("focal") || "-";
							var z = '<table class="exif"><tr><td colspan="2"><span class="label">Camera</span><br>' + p + '</td></tr><tr><td><span class="label">ISO</span><br>' + i + '</td><td><span class="label">Aperture</span><br>' + D + '</td></tr><tr><td><span class="label">Exposure</span><br>' + B + '</td><td><span class="label">Focal Length</span><br>' + A + '</td></tr></table><span class="arrow-down"></span>';
							a(this).find(".info").append('<div class="pxu-data">' + z + "</div>");
							a(this).find("span.info").css("display", "block")
						}
					})
				} else {
					if (c.captions) {
						r.find(c.photoWrap).each(function() {
							var i = a(this).find("img");
							if (i.hasClass("caption-yes")) {
								var p = i.data("caption");
								var z = '<p class="pxu-caption" style="margin:0;">' + p + "</p>";
								a(this).find(".info").append('<div class="pxu-data caption-only">' + z + '<span class="arrow-down"></span></div>');
								a(this).find("span.info").css("display", "block")
							}
						})
					}
				}
			}
			if (c.highRes) {
				r.find(c.photoWrap).each(function() {
					var i = a(this).find(".photo img");
					var p = i.data("highres");
					i.attr("src", p)
				})
			}
			if (c.rounded == "corners") {
				var y = r.find(".row");
				if (s == 1) {
					y.find(c.photoWrap + ":first-child " + c.photo).css({
						borderRadius: c.borderRadius + " 0 0 " + c.borderRadius
					});
					y.find(c.photoWrap + ":last-child " + c.photo).css({
						borderRadius: "0 " + c.borderRadius + " " + c.borderRadius + " 0"
					})
				} else {
					for (var x = 0; x < s; x++) {
						var o;
						if (x === 0) {
							o = y.eq(x).find(c.photo).size();
							if (o == 1) {
								y.eq(x).find(c.photo).css({
									borderRadius: c.borderRadius + " " + c.borderRadius + " 0 0"
								})
							} else {
								y.eq(x).find(c.photoWrap + ":first-child " + c.photo).css({
									borderRadius: c.borderRadius + " 0 0 0"
								});
								y.eq(x).find(c.photoWrap + ":last-child " + c.photo).css({
									borderRadius: "0 " + c.borderRadius + " 0 0"
								})
							}
						}
						if (x == s - 1) {
							o = y.eq(x).find(c.photo).size();
							if (o == 1) {
								y.eq(x).find(c.photo).css({
									borderRadius: "0 0 " + c.borderRadius + " " + c.borderRadius
								})
							} else {
								y.eq(x).find(c.photoWrap + ":first-child " + c.photo).css({
									borderRadius: "0 0 0 " + c.borderRadius
								});
								y.eq(x).find(c.photoWrap + ":last-child " + c.photo).css({
									borderRadius: "0 0 " + c.borderRadius + " 0"
								})
							}
						}
					}
				}
			}
			if (c.rounded == "all") {
				r.find(c.photo).css({
					borderRadius: c.borderRadius
				})
			}
			if (!c.rounded) {
				r.find(c.photo).css({
					borderRadius: 0
				})
			}
			r.addClass("processed");
			if (typeof f == "function") {
				f.call(this)
			}
		})
	}
})(jQuery);