// TODO :- [Ashish]// TODO :- [Ashish]

import { Schema, model } from "mongoose";

export const chatSchema = new Schema({
    chatName: {
        type: String,
        required: true,
        true: true
    },
    isGroupChat: {
        type: Boolean,
        default: false
    },
    groupChatProfilePic: {
        type: String,
        default: ''
    },
    users: [{
        type: Schema.Types.ObjectId,
        ref: 'User',
    }],
    latestMessage: {
        type: Schema.Types.ObjectId,
        ref: 'Message'
    },
    groupAdmin: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },

}, {
    timestamps: true
});

export const Chat = model('Chat', chatSchema);
