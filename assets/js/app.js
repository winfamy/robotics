$(document).ready(function() {

	io.socket.on('connect', function () {

		io.socket.post(window.location.pathname, function(data) {
			console.log(data);
			io.socket.on('meet_update', function(data) {

				data.rankings.forEach(function(value) {
					table_row_1 = $('.' + value.match + '_1');
					table_row_2 = $('.' + value.match + '_2');

					if(table_row_2.length && table_row_1.length) {
						if(value.result.team != undefined) {
							if(table_row_1.children('._result').html() != value.result.score + " " + value.result.team) {
								table_row_1.children('._result').html(value.result.score + " " + value.result.team);
							}
						} else {
							if(value.result == "N/A")
								table_row_1.children('._result').html("N/A");
						}

						if(table_row_1.children('._red').html() != value.scores.red[0])
							table_row_1.children('._red').html(value.scores.red[0]);
						if(table_row_2.children('._red').html() != value.scores.red[1])
							table_row_2.children('._red').html(value.scores.red[1]);
						
						if(table_row_1.children('._blue').html() != value.scores.blue[0])
							table_row_1.children('._blue').html(value.scores.blue[0]);
						if(table_row_2.children('._blue').html() != value.scores.blue[1])
							table_row_2.children('._blue').html(value.scores.blue[1]);
				
					} else {
						row = 	'<tr class="' + value.match + '_1">' +
										'<td data-title="Match" class="_match">' + value.match + '</td>' +
										'<td data-title="Result" class="_result">' + ((value.result.team != undefined)?value.result.score + " " + value.result.team:"N/A") + '</td>' +
										'<td data-title="Red" class="_red">' + value.scores.red[0] + '</td>' +
										'<td data-title="Blue" class="_blue">' + value.scores.blue[0] + '</td>' +
									'</tr>' + 
									'<tr class="' + value.match + '_2">' +
										'<td data-title="Match"></td>' +
										'<td data-title="Result"></td>' +
										'<td data-title="Red" class="_red">' + value.scores.red[1] + '</td>' +
										'<td data-title="Blue" class="_blue">' + value.scores.blue[1] + '</td>' +
									'</tr>'
						$('tr').last().after(row);						
					}
				});
			});
		});

	});


});