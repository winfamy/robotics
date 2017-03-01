/**
 * MeetController
 *
 * @description :: Server-side logic for managing meets
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {

    // handle homepage ?
    index: (req, res) => {
        return res.view();
    },

    // Subscribe to meet updates
    subscribe: (req, res) => {
        if(!req.isSocket) return res.badRequest();
        Meet.findOne({ id: req.param("id") }).exec((err, meet) => {
            if(err || !meet) return res.serverError();

            sails.sockets.join(req,`meet_${req.param("id")}`, () => {
                return res.json(meet);
            });
        });
    },

    rankings: (req, res) => {
        Meet.findOrCreate({ 
            name: req.body.meet,
            rankings: req.body.rankings
        }, {
            name: req.body.meet,
            rankings: req.body.rankings    
        }).exec((err, meet) => {
            if(err || !meet) return res.serverError();
            meet.rankings = req.body.rankings;
            meet.save((err) => {
                if(err) return res.serverError();
            })
        });
    }
};
