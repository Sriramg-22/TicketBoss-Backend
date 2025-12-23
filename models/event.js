import mongoose from "mongoose";
const eventSchema = new mongoose.Schema(
    {
        eventId: {
            type: String,
            required: true,
            unique: true,
            trim:true
        },
        name: {
            type: String,
            required: true,
            trim:true,
        },
        totalSeats: {
            type: Number,
            required: true,
            default: 500,
            min:1
        },
        availableSeats: {
            type: Number,
            required: true,
            default: 500,
            min: 0
        },
        version: {
            type: Number,
            default: 0,
            required: true

        },
    },
    {
        timestamps: true
    },
);

const Event = mongoose.model("Event", eventSchema);

export default Event;