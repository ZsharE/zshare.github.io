$(document).ready(function(){

	// Populate portfolio on ready
	$.get('db/portfolioDB.json').done(showPortfolio);

	// Render portfolio items
	function showPortfolio(data) {

		var years = [];

		$(data.Projects).each(function(index){
			var id = data.Projects[index].id,
				name = data.Projects[index].name,
				description = data.Projects[index].description,
				image = data.Projects[index].image,
				year = data.Projects[index].project_content.date;

			var template = '<div class="item col-md-4 mb-4 active" data-term="'+year+'">'+
						'<div class="card">'+
							'<a href="https://stanescueduard.seomat.com/project/'+id+'" alt="'+name+'">'+
							'<img class="card-img-top" src="https://stanescueduard.seomat.com/assets/portfolio/'+image+'" alt="'+name+'">'+
							'<div class="card-body">'+
								'<h5 class="card-title">'+name+'</h5>'+
								'<p class="card-text">'+description+'</p>'+
							'</div>'+
							'</a>'+
						'</div>'+
					'</div>';

			if ($.inArray(year, years) === -1) {
				years.push(year);
				$('.portfolio-root-categories').append('<li class="portfolio-category-item"><a href="#" data-term="'+year+'">'+year+'</a></li>');
			}

			$('.portfolio .container .row').append(template);
		});

		// Event listener
		$('.portfolio-root-categories a').on('click', function(){
			var data_year = $(this).attr('data-term');
			$('.portfolio-root-categories a').parent().removeClass('active');
			$(this).parent().addClass('active');

			if(data_year === "*") {
				$('.portfolio .item').addClass('active');
			} else {
				$('.portfolio .item').removeClass('active');
				$('.portfolio .item[data-term="'+ data_year +'"]').addClass('active');
			}
		});

	}

});
