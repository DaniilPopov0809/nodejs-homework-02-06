const path = require("path");
const Jimp = require("jimp");
const fs = require("fs/promises");
const { User } = require("../../models/user");
const { HttpError } = require("../../utils");

const updateAvatar = async (req, res, next) => {
    const avatarsDir = path.join(__dirname, "../", "../", "public", "avatars");
    const { _id } = req.user;
    const { path: tempUpload, originalname } = req.file;
    const convertImg = await Jimp.read(tempUpload);
    if (!convertImg) {
        throw HttpError(500, 'File not found');
    }
    convertImg.resize(250, 250).quality(60).write(tempUpload);

    const filename = `${_id}_${originalname}`;
    const resultUpload = path.join(avatarsDir, filename);

    await fs.rename(tempUpload, resultUpload);
    const avatarURL = path.join("avatars", filename);
    await User.findByIdAndUpdate(_id, { avatarURL });
 

  res.json({
    avatarURL,
  });
};

module.exports = updateAvatar;
