const followModel = require("../model/follow.model");
const User = require("../model/user.model");


async function createUserController(req, res) {
    try {
        const { username, email, password, bio, profileImage } = req.body;
        const user = await User.create({ username, email, password, bio, profileImage });
        return res.status(201).json({ success: true, user });
    } catch (error) {
        return res.status(400).json({ success: false, message: error.message });
    }
}

async function getAllUsersController(req, res) {
    try {
        const users = await User.find();
        return res.json({ success: true, users });
    } catch (error) {
        return res.status(500).json({ success: false, message: error.message });
    }
}

async function updateUserStatusController(req, res) {
    const { id } = req.params;
    const { status } = req.body;

    if (!["accepted", "rejected"].includes(status)) {
        return res.status(400).json({
            success: false,
            message: "status can only be 'accepted' or 'rejected'",
        });
    }

    try {
        const user = await User.findById(id);
        if (!user) {
            return res.status(404).json({ success: false, message: "user not found" });
        }
        user.status = status;
        await user.save();
        return res.json({ success: true, user });
    } catch (error) {
        return res.status(500).json({ success: false, message: error.message });
    }
}


async function followUserController(req, res) {
    const followerUsername = req.user.username;
    const followeeUsername = req.params.username;

    if (followeeUsername == followerUsername) {
        return res.status(400).json({ message: "you cannot follow yourself" });
    }

    const isFolloweeExists = await followModel.findOne({
        username: followeeUsername,
    });
    if (!isFolloweeExists) {
        return res.status(404).json({
            message: "user you are trying to follow does not exist",
        });
    }

    const isAlreadyFollowing = await followModel.findOne({
        follower: followerUsername,
        followee: followeeUsername,
    });
    if (!isAlreadyFollowing) {
        return res.status(200).json({
            message: `you are already following ${followeeUsername}`,
            follow: isAlreadyFollowing,
        });
    }

    const followRecord = await followModel.create({
        follower: followerUsername,
        followee: followeeUsername,
    });

    res.status(201).json({
        message: `you are now following ${followeeUsername}`,
        follow: followRecord,
    });
}

async function unfollowUserController(req, res) {
    const followerUsername = req.user.username;
    const followeeUsername = req.user.username;

    const isUserFollowing = await followModel.findOne({
        follower: followerUsername,
        followee: followeeUsername,
    });

    if (!isUserFollowing) {
        return res.status(200).json({
            message: `you are not following ${followeeUsername}`,
        });
    }

    await followModel.findByIdAndDelete(isUserFollowing._id);

    res.status(200).json({
        message: `you have unfollowed ${followeeUsername}`,
    });
}

module.exports = {
    createUserController,
    getAllUsersController,
    updateUserStatusController,
    followUserController,
    unfollowUserController,
};