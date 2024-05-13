import Conversation from "../models/conversation.model.js";
import Message from "../models/message.model.js";
// import bcrypt from "bcryptjs";
// import User from "../models/user.model.js";
// import generateTokenAndSetCookie from "../utils/generateToken.js";

// import Conversation from "../models/conversation.model.js";

export const sendMessage = async (req, res) => {
  // console.log("Message route, and message sent!", req.params.id);
  // res.send(req.params.id);
  try {
    const { message } = req.body;
    const { id: receiverId } = req.params;
    const senderId = req.user._id;

    let conversation = await Conversation.findOne({
      participants: { $all: [senderId, receiverId] },
    });

    if (!conversation) {
      conversation = await Conversation.create({
        participants: [senderId, receiverId],
      });
    }

    const newMessage = new Message({
      senderId,
      receiverId,
      message,
    });

    if (newMessage) {
      conversation.messages.push(newMessage._id);
    }
    // Instead of the below,

    // await conversation.save();
    // await newMessage.save();

    // Do this instead
    // This works without waiting for one to save before moving to next
    await Promise.all([conversation.save(), newMessage.save()]);

    res.status(201).json(newMessage);
  } catch (error) {
    console.log("Error in sendMessage controller", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const getMessages = async (req, res) => {
  // console.log("Message route, and message sent!", req.params.id);
  // res.send(req.params.id);
  try {
    const { id: userToChatId } = req.params;
    const senderId = req.user._id;

    const conversation = await Conversation.findOne({
      participants: {
        $all: [senderId, userToChatId],
      },
    }).populate("messages");

    if (!conversation) return res.status(200).json([]);

    res.status(200).json(conversation.messages);
  } catch (error) {
    console.log("Error in getMessages controller", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
