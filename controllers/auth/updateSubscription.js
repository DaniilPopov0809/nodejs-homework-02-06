const { User } = require("../../models/user");

const { HttpError } = require("../../utils");

const updateSubscription = async (req, res) => {
    const { _id, subscription } = req.user;
    const {subscription: newSubscription} = req.body;

    if (subscription === newSubscription) {
        throw HttpError(409, "User using this subscription");
    }

    const data = await User.findByIdAndUpdate(_id, req.body , {new: true});
    
    if (!data) {
      throw HttpError(404, "Not found!");
    }
    res.json(data);
  };


module.exports = updateSubscription;