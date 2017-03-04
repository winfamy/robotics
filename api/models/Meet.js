/**
 * Meet.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {
	attributes: {
		name: {
			type: 'string'
		},
		rankings: {
			type: 'json',
			defaultsTo: null
		}
	},
	

	// Model events
	afterUpdate: (model, next) => {
		sails.sockets.broadcast(`meet_${model.name}`, 'meet_update', model);
		next();
	}
};

