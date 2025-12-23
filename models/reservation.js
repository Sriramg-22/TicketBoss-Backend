import mongoose from "mongoose";
import { v4 as uuidv4 } from "uuid";
const reservationSchema = new mongoose.Schema(
    {
        reservationId: {
            type: String,
            required: true,
            unique: true,
            default: uuidv4
        },
        partnerId: {
            type: String,
            required: true,
            trim: true,
        },
        seats: {
            type: Number,
            required: true,
            min: 1,
            max: 10
        },
        status: {
            type: String,
            eunm: ["confirmed", "cancelled"],
            default: "confirmed"
        }
    },
    {
        timestamps:true
    }
);


const Reservation=mongoose.model("Reservation",reservationSchema);

export default Reservation;
