/**
 * MeetController
 *
 * @description :: Server-side logic for managing meets
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {

    // handle homepage ?
    index: (req, res) => {
        Meet.find({}).exec((err, meets) => {
            if(err || !meets) return res.serverErrors();
            return res.view('index', {
                meets: (meets.length >= 1) ? meets : ['No meets found. :(']
            });
        });

    },

    view: (req, res) => {
        if(!req.param("name")) return res.badRequest();

        Meet.find({name: req.param("name")}).exec((err, meet) => {
            if(err || !meet) return res.serverError();
            return res.view('view', {
                meet: JSON.stringify(meet)
            });
        })
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
