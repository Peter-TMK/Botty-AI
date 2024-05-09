import mongoose from "mongoose";

const Schema = mongoose.Schema;

const ConversationSchema = new Schema(
  {
    participants: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        // required: true,
      },
    ],
    messages: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Message",
        default: [],
        // required: true,
      },
    ],
  },
  { timestamps: true }
);

export default mongoose.model("Conversation", ConversationSchema);
