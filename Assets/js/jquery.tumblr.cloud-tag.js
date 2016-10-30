/**
*	Create cloud tag for your tumblr blog
**/
$.fn.cloudTag = function(options){	
	var settings = $.extend({
		tumblrSite: location.hostname,
		showCount: false,
		countDelimeterLeft: '(',
		countDelimeterRight: ')',
		sortBy: 'name',
		autoSize: false,
	}, options );

	var self = this,
		totalPosts = 0,
		totalTags = 0;

	/**
	*	Fetch posts and get unique list of tags
	**/
	var getTagList = function(){	
		var counter = 0,
			internalCounter = 20,
			tagList = [];
					
		// Disable AJAX caching because of Firefox
		$.ajaxSetup({
			cache: false
		});
		
		prepareTags = function(data)
		{			
			var posts = data.response.posts;
		
			for( var i = 0; i < posts.length; i++ )
			{
				var tags = posts[i].tags;
				
				for( var j = 0; j < tags.length; j++ )
				{
					var temp_tag = tags[j];

					if( !JSON.stringify(tagList).match(temp_tag) ) // Tag doesn't exist so add it
					{
						tagList.push({name: temp_tag, count: 1});
					}
					else // Increment count for the current tag
					{
						for(var obj in tagList )
						{
							if( tagList[obj].name == temp_tag )
							{
								tagList[obj].count++
							}
						}
					}
					
					totalTags++;
				}
			}
				
			if( internalCounter >= totalPosts ) // Show tags if everythig is fetched and prepared
			{	
				$(self).html(displayTags(tagList));
			}
			else
			{
				internalCounter += 20;
			}
			
		}

		while( counter < totalPosts )
		{
			$.ajax({
				type: 'GET',
				url: 'http://api.tumblr.com/v2/blog/' + settings.tumblrSite + '/posts',
				dataType: 'jsonp',
				
				data:{
					api_key: settings.apiKey,
					offset: counter,
					jsonp: 'prepareTags'
				}
			});
			
			counter += 20;
		}
	}

	/**
	*	Display list of tags
	**/
	var displayTags = function(tags)
	{
		if( settings.sortBy == 'count' )
		{
			// Sort tags by count and name
			tags.sort(function(a, b){
				if( a.count > b.count )
				{
					return -1;
				}
				if( a.count < b.count )
				{
					return 1;
				}
				
				// Sort by name
				if( a.name < b.name )
				{
					return -1;
				}
				else
				{
					return 0;
				}
			});
		}
		else if( settings.sortBy == 'name' )
		{
			// Sort tags by name
			tags.sort(function(a, b){
				if( a.name < b.name )
				{
					return -1;
				}
				if( a.name > b.name )
				{
					return 1;
				}
					
				return 0;
			});
		}
		
		var tagList = '',
			totalCounts = 0;
		
		for( var i = 0; i < tags.length; i++ )
		{
			totalCounts += tags[i].count;
		}

		for( var i = 0; i < tags.length; i++ )
		{
			var tag = tags[i],
				tagName = tag.name,
				tagCount = tag.count,
				frequency = '';
		  		
			if( settings.autoSize )
			{
				var percentage = (100/totalCounts) * tagCount;
			
				if( percentage < 20 )
				{
					frequency = 'freq-1';
				}
				else if( percentage < 40 )
				{
					frequency = 'freq-2';
				}
				else if( percentage < 60 )
				{
					frequency = 'freq-3';
				}
				else if( percentage < 80 )
				{
					frequency = 'freq-4';
				}
				else if( percentage < 100 )
				{
					frequency = 'freq-5';
				}
			}
			
			var showCount = (settings.showCount) ? ' ' + settings.countDelimeterLeft + tagCount + settings.countDelimeterRight : '';
			
			tagList += '<li><a href="/tagged/' + tagName.replace(/\s+/g, '-') + '" class="' + frequency + '">' + tagName + showCount + '</a></li>';
		}

		return tagList;
	}

	// Disable AJAX caching because of Firefox
	$.ajaxSetup({
		cache: false
	});
	
	getPosts = function(data)
	{
		totalPosts = data.response.blog.posts;
		
		getTagList();
	}
	
	$.ajax({
		type: 'GET',
		url: 'http://api.tumblr.com/v2/blog/' + settings.tumblrSite + '/info',
		dataType: 'jsonp',
		data: {
			api_key: settings.apiKey,
			jsonp: 'getPosts'
		}
	});
};
