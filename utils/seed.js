
import Event from "../models/event.js";
let seedEvent = async () => {
    try {
        const existEvent = await Event.findOne({
            eventId: "node-meetup-2025"
        });

        if (existEvent) {
            console.log("Event Already Exists");
            return;
        }

        await Event.create(
            {
            "eventId": "node-meetup-2025",
            "name": "Node.js Meet-up",
            "totalSeats": 500,
            "availableSeats": 500,
            "version": 0
            }
        );
        console.log("Event added Successfully");
    }catch(error){
        console.log("Event not inserted",error.message);
    }
}
export default seedEvent;