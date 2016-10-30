//Start Instagram API
(function ( $ ) {
$.fn.instagram = function(options) {
    var settings = $.extend({
        // These are the defaults.
        username: '',
        clientID: '',
        accessToken: '',
	limit:1,
    }, options);

    $.ajax({
        url: 'https://api.instagram.com/v1/users/search?q=' + settings.username,
        dataType: 'jsonp',
        type: 'GET',
        data: {access_token: settings.accessToken},
        success: function(data) {
            var ID = data.data[0].id;
            $.ajax({
                url: "https://api.instagram.com/v1/users/" + ID + "/media/recent",
                dataType: 'jsonp',
                type: 'GET',
                data: {access_token: settings.accessToken },
                success: function(data) {
                    for (var i = 0; i < settings.limit; i++) {
                        var images = $("<img/>").attr("src", data.data[i].images.low_resolution.url);
                        var link = $("<a class='link' target='_blank'>").attr("href", data.data[i].link).append(images);
                        $("<div class='item'>").append(link).appendTo("#instagram_pic");
                    }
                    //Start Owl Carousel
                    $(document).ready(function() {
                        $("#instagram_pic").owlCarousel({
                            navigation: true,
                            pagination: true,
                            singleItem: true,
                            autoHeight: true,
                            navigationText: [
                                "<i class='fa fa-chevron-left'></i>",
                                "<i class='fa fa-chevron-right'></i>"
                            ],
                        });
                    });
                    //End Owl Carousel           
                }
            });
        }
    });
};
}( jQuery ));
//End Instagram API

//Start Pinterest API
(function ( $ ) {
$.fn.pinterest = function(options) {
    var settings = $.extend({
        // These are the defaults.
        username: '',
        board: '',
	limit:1,
    }, options);

$.ajax({
    url: 'https://api.pinterest.com/v3/pidgets/boards/'+settings.username+'/'+settings.board+'/pins',
    dataType: 'jsonp',
    type: 'GET',
    success: function(data) { 
    var size = '237x'; 
    for (var i = 0; i < settings.limit; i++) {
      var url_237x = data.data.pins[i].images[size].url;
      var original = url_237x.replace('237x','736x');
      var images = $("<img/>").attr("src",original);
      var pin_id = 'https://www.pinterest.com/pin/'+data.data.pins[i].id;
      var link = $("<a class='link' target='_blank'>").attr("href",pin_id).append(images);
      $("<div class='item'>").append(link).appendTo("#pinterest_pic"); 
      }
    //Owl carousel
    $(document).ready(function() {
        $("#pinterest_pic").owlCarousel({
            navigation: true,
            pagination:true,
          	singleItem:true,
          	autoHeight:true,
          	navigationText: [
      "<i class='fa fa-chevron-left'></i>",
      "<i class='fa fa-chevron-right'></i>"
      ],          	
        });
    });
    //End Owl       
    } 
});
};
}( jQuery ));
//End Pinterest API

//Start Dribbble API
(function ( $ ) {
$.fn.dribbble = function(options) {
    var settings = $.extend({
        // These are the defaults.
        username: '',
        accessToken: '',
	limit:1,
    }, options);

$.ajax({
    url: 'https://api.dribbble.com/v1/users/'+settings.username+'/shots?access_token='+settings.accessToken,
    dataType: 'json',
    type: 'GET',
    success: function(data) {  
    for (var i = 0; i < settings.limit; i++) {
    var image = data[i].images.normal;
    var images = $("<img/>").attr("src", image);
    var link = $("<a class='link' target='_blank'>").attr("href",data[i].html_url).append(images);
    $("<div class='item' id=id_"+i+">").append(link).appendTo("#dribbble_pic");
    }
    //Owl carousel
    $(document).ready(function() {
        $("#dribbble_pic").owlCarousel({
            navigation: true,
            pagination:true,
          	singleItem:true,
          	autoHeight:true,
          	navigationText: [
      "<i class='fa fa-chevron-left'></i>",
      "<i class='fa fa-chevron-right'></i>"
      ],
        });
    });
    //End Owl
    } 
});
};
}( jQuery ));
//End Dribbble API

//Start Flickr API
(function ( $ ) {
$.fn.flickr = function(options) {
    var settings = $.extend({
        // These are the defaults.
        id: '',
	limit:1,
    }, options);

$.ajax({
  url: "https://api.flickr.com/services/feeds/photos_public.gne?jsoncallback=?",
  type: "GET",
  dataType: "json",
  data: {
    'id': settings.id,
    'format': 'json'
  },
  success: function(data) {
for (var i = 0; i < settings.limit; i++) {
        var image = data.items[i].media.m.replace('_m', '_z');
        var images = $("<img class='img'/>").attr("src", image);
        var link = $("<a class='link' target='_blank'>").attr("href",data.items[i].link).append(images);      
        var item = $("<div class='item'>").append(link).appendTo('#flickr_pic');  
}    
      //Owl carousel
    $(document).ready(function() {
        $("#flickr_pic").owlCarousel({
            navigation: true,
            pagination:true,
          	singleItem:true,
          	autoHeight:true,
          	navigationText: [
      "<i class='fa fa-chevron-left'></i>",
      "<i class='fa fa-chevron-right'></i>"
      ],
        });
    });
    //End Owl
    } 
});
};
}( jQuery ));
//End Flickr API