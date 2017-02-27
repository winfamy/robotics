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

    create: (req, res) => {
        // sort json and shit, create rankings
    }
};

