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
                meets: (meets.length >= 1) ? _.map(meets, (meet) => { return meet.name; }) : ['No meets found. :(']
            });
        });

    },

    view: (req, res) => {
        if(!req.param("name")) return res.badRequest();

        Meet.findOne({name: req.param("name")}).exec((err, meet) => {
            if(err || !meet) return res.serverError();
            console.log(meet.rankings[0].result);
            return res.view('view', {
                meet: meet
            });
        })
    },

    // Subscribe to meet updates
    subscribe: (req, res) => {
        console.log('req');
        if(!req.isSocket) return res.badRequest();
        if(!req.param("name")) return res.badRequest();

        console.log(req.param("name"));

        Meet.findOne({ name: req.param("name") }).exec((err, meet) => {
            if(err || !meet) return res.serverError();

            sails.sockets.join(req,`meet_${req.param("name")}`, () => {
                console.log('subscribed');
                return res.json(meet);
            });
        });
    },

    rankings: (req, res) => {
        console.log('request');
        Meet.findOrCreate({ 
            name: req.body.meet,
            rankings: req.body.rankings
        }, {
            name: req.body.meet,
            rankings: req.body.rankings    
        }).exec((err, meet) => {
            console.log(meet);
            if(err || !meet) return res.serverError();
            meet.rankings = req.body.rankings;
            meet.save((err) => {
                if(err) return res.serverError();
                res.send('ok');
            })
        });
    }
};
