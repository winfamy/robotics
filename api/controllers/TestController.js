module.exports = {

	test: (req, res) => {
		Meet.findOne({"name": "Grady's Meet"}).exec((err, meet) => {
			sails.sockets.broadcast(`meet_${meet.name}`, 'meet_update', meet);
		});
	}

}