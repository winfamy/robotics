$(document).ready(function() {

	io.socket.on('connect', function () {

		io.socket.post(window.location.pathname, function(data) {
			console.log(data);
			io.socket.on('meet_update', function(data) {
				console.log(data);
				data.rankings.forEach(function(value) {
					table_row_1 = $('.' + value.match + '_1');
					table_row_2 = $('.' + value.match + '_2');
					
					if(value.result.team != undefined) {
						if(table_row_1.children('._result').html() != value.result.score + " " + value.result.team) {
							table_row_1.children('._result').html(value.result.score + " " + value.result.team);
						}
					} else {
						if(value.result == "N/A")
							table_row_1.children('._result').html("N/A");
					}

					if(table_row_1.children('._red').html() != value.scores.red[0])
						table_row_1.html(value.scores.red[0]);
					if(table_row_2.children('._red').html() != value.scores.red[1])
						table_row_2.html(value.scores.red[1]);
					
					if(table_row_1.children('._blue').html() != value.scores.blue[0])
						table_row_1.html(value.scores.blue[0]);
					if(table_row_2.children('._blue').html() != value.scores.blue[1])
						table_row_2.html(value.scores.blue[1]);
				});
			});
		});

	});


});