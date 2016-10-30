$(window).width(); // returns width of browser viewport
$(document).width(); // returns width of HTML document
jQuery(window).resize(function() {
	if (jQuery(window).width() < 1000) {
		jQuery(".post.sidebar").appendTo(".res_side_content");
	}
	if (jQuery(window).width() > 1000) {
		jQuery(".post.sidebar").appendTo(".sidebar_container");
	}
});
$('#res_side a').live('click', function() {
	$('#res_side').addClass('active');
});
$('#res_side.active a').live('click', function() {
	$('#res_side').removeClass('active');
});
$('.menu ul span.search a').live('click', function() {
	$('.menu ul span.search a').addClass('active');
	$(".menu ul span div.search_form").css("display", "block");
});
$('.menu ul span.search a.active').live('click', function() {
	$('.menu ul span.search a').removeClass('active');
	$(".menu ul span div.search_form").css("display", "none");
});
$('#res_drop a').live('click', function() {
	$('#res_drop').addClass('active');
});
$('#res_drop.active a.fa.fa-bars').live('click', function() {
	$('#res_drop').removeClass('active');
});
$('.sub_link').live('click', function() {
	$('.sub_menu').css('display', "block");
	$('.sub_link').addClass("active");
});
$('.sub_link.active').live('click', function() {
	$('.sub_menu').css('display', "none");
	$('.sub_link').removeClass("active");
});
$(".menu ul span div ul span:first a").mouseenter(function() {
	$(".menu ul span div.before").addClass("active");
});
$(".menu ul span div ul span:first a").mouseleave(function() {
	$(".menu ul span div.before").removeClass("active");
});
$(function() {
	var url = window.location.pathname;
	var navitems = $('.menu ul span a');
	var pathArray = url.split('/').pop();
	$.each(navitems, function(i, e) {
		if ($(this).attr('href') == url) {
			$(this).parent().addClass('active');
		}
	});
});
$(window).scroll(function() {
	if ($(window).scrollTop() <= ($(document).height() - 100) - $(window).height()) {
		if (!taskFired) {
			taskFired = true;
		}
	}
});
$('.social ul li.pinterest a').hide();
$('.social ul li.pinterest a:first-child').show();
$.fn.spotify = function () {
// Find all iframes
var $iframes = $( "iframe.spotify_audio_player" );

// Find & save the aspect ratio for all iframes
$iframes.each(function () {
  $( this ).data( "ratio", this.height / this.width )    
});
// Resize the iframes when the window is resized
$( window ).resize( function () {
    if ($(window).width() >= 620){	
  $iframes.each( function() {
    // Get the parent container's width
    var width = $( this ).parent().width();
    $( this ).width( width )
      .height( width * $( this ).data( "ratio" ) );
  });
}
  if ($(window).width() <= 615 && $(window).width() >= 420){	
  $iframes.each( function() {
    // Get the parent container's width
    var width = $( this ).parent().width();
    $( this ).width( width )
      .height( width * 1.05* $( this ).data( "ratio" ) );
  });
    } 
    if ($(window).width() <= 420){	
  $iframes.each( function() {
    // Get the parent container's width
    var width = $( this ).parent().width();
    $( this ).width( width )
      .height( width * 1.2* $( this ).data( "ratio" ) );
  });
    }     
// Resize to fix all iframes on page load.
}).resize(); 
};
$('#res_drop a').live('click', function() {
    $('#res_drop').addClass('active');
});	
$('#res_drop.active a.fa.fa-bars').live('click', function() {
	$('#res_drop').removeClass('active');
});