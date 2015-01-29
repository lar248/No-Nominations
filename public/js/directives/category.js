(function() {
	var app = angular.module('edit-category', []);
	app.directive('editCategory', function() {
		return {
			restrict: 'A',
			link: function(scope, elem, attrs) {
				var category = elem;
				 
				$(elem).click(function() {
					var dialog = $( "#dialog-form" ).dialog({
						autoOpen: false,
						width: 600,
						modal: true,
						open: function(event) {
							console.log("event", event)
							console.log('THIS elem', category)
							console.log('next elem', category.next())
							var categoryNoms = elem.next().children();
							var heading = document.createElement("tr");
							var movie = "<th>Movie</th>";
							var detail = "<th>Details</th>";
							var imdb = "<th>IMDB Link</th>";
							$(heading).append(movie);
							$(heading).append(detail);
							$(heading).append(imdb);
							$('table').append(heading);
							$(categoryNoms).each(function() {
								var row = document.createElement('tr');
								var currentMovie = "<td><input type='text' name='movie' value='" + $(this).children("input").val() + "'></td>";
								if ($(this).children("span").html() != null) {
									var currentDetail = "<td><input type='text' name='detail' value='" + $(this).children("span").html().trim() + "'></td>";
								}
								var currentIMDB = "<td><input type='text' name='imdb' value='" + $(this).children("a").attr("href") + "'></td>";
								$(row).append(currentMovie);
								$(row).append(currentDetail);
								$(row).append(currentIMDB);
								$('table').append(row);
							});	
						}, 
						buttons: {
							
							Cancel: function() {
								$('#modal-background').css('display', 'none');
							  	dialog.dialog("close");
							  	$('#modal').empty();
							}
						}
				    });
				    $('#modal').append('<table></table>');
					dialog.dialog("open");
					$('#modal-background').css('display', 'block');
				});
			}
		}
	});

})();