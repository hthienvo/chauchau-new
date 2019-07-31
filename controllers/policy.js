/**
 * GET /
 * Policy page.
 */
const Policy = require('../models/Policy');


exports.index = (req, res) => {
    Policy.find({},  (err, policies) => {
    console.log("Policy", policies)
    res.render('policy/policies', {policies: policies});
  });

};

/**
 * POST /signup
 * Create a new local account.
 */
exports.createPolicy = (req, res, next) => {

    const policy = new Policy({
      policyNumber: req.body.policyNumber,
      attribute: req.body.attribute,
      status: req.body.status,
      clientNumber: req.body.clientNumber,
      agentNumber: req.body.agentNumber,
      created: req.body.created,
      statusUpdateDate: req.body.statusUpdateDate,
      note: req.body.note,
      type: req.body.type,
      
    });
  
    Policy.findOne({ policyNumber: req.body.policyNumber }, (err, existingPoicy) => {
      if (err) { return next(err); }
      if (existingPoicy) {
        req.flash('errors', { msg: 'Policy already exists.' });
        return res.redirect('/policy');
      }
      policy.save((err) => {
        if (err) { return next(err); }
        // req.flash('success', { msg: 'Success! New user created with userid '+ req.body.email });
        return res.redirect('/policy');
        // req.logIn(user, (err) => {
        //   if (err) {
        //     return next(err);
        //   }
        //   res.redirect('/');
        // });
      });
    });
  };