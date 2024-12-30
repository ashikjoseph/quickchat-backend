const Conversation = require('../models/conversationSchema');
const Message = require('../models/messageSchema');
const { getReceiverId, io } = require('../socket/socket');



exports.sendMessage = async (req, res) => {
    try {
        const { message: messageContent } = req.body;
        const { id: receiverId } = req.params;
        const senderId = req.payload;
        console.log(senderId);

        let conversation = await Conversation.findOne({
            participants: { $all: [senderId, receiverId] }
        });

        if (!conversation) {
            conversation = await Conversation.create({
                participants: [senderId, receiverId],
            });
        }

        const newMessage = new Message({
            senderId: senderId,
            receiverId: receiverId,
            message: messageContent,
        });
        if (newMessage) {
            conversation.messages.push(newMessage._id);
            console.log(newMessage);
        }
        //socket

        // await newMessage.save();
        // await conversation.save();
        await Promise.all([conversation.save(), newMessage.save()])
        const receiverSocketId = getReceiverId(receiverId)
        console.log('receiveed', receiverSocketId);
        if (receiverSocketId) {
            io.to(receiverSocketId).emit("newMessage", newMessage)
        }

        return res.status(200).json(newMessage);

    } catch (err) {
        console.error('Error in sendMessage:', err);
        return res.status(401).json('Unable to send messages due to:', err);
    }
};

exports.getMessage = async (req, res) => {
    try {
        const { id: userChatId } = req.params;
        const senderId = req.payload;

        // Find conversation between the sender and userChatId (receiver)
        const conversation = await Conversation.findOne({
            participants: { $all: [senderId, userChatId] }
        }).populate("messages");

        // Check if conversation exists
        if (!conversation) {
            return res.status(200).json([]);  // No conversation, return an empty array
        }

        // If conversation exists, send messages
        const messages = conversation.messages;
        res.status(200).json(messages);

    } catch (err) {
        console.log('Error in get messages', err);
        res.status(500).json('Failed to retrieve messages');
    }
};
