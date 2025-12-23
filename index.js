import dotenv from "dotenv";
dotenv.config();



import express from "express"; // Importing Express

import seedEvent from "./utils/seed.js"; //Importing seedEvent to insert Data
import connectDb from "./utils/db.js"; //Importing connectDb to connect with mongodb

import Event from "./models/event.js"; //Importing Event Model
import Reservation from "./models/reservation.js"; //Importing Rservation Model

const app = express();
const port = process.env.PORT || 5090;


app.use(express.json());

app.get("/", (req, res) => {
    res.send("This is root")
})

app.post("/reservations", async (req, res) => {
    try {
        let { partnerId, seats } = req.body;  // Getting Data through req.body
        console.log(req.body);

        // Input Validation 
        if (!partnerId || typeof seats !== "number" || seats <= 0 || seats > 10) {
            return res.status(400).json({
                error: "Seats must be between 1 to 10"
            })
        }
        // Finding the event and updating the avaliable seats 
        let event = await Event.findOneAndUpdate(
            {
                eventId: "node-meetup-2025",
                availableSeats: { $gte: seats }
            },
            {
                $inc: {
                    availableSeats: -seats,
                    version: 1
                }
            },
            {
                new: true
            }
        )

        // If Seats no more Left
        if (!event) {
            return res.status(409).json({
                error: "Not enough seats left"
            });
        }
        // Finally  Creating a Reservation 
        const reservation = await Reservation.create(
            {
                partnerId,
                seats
            }
        )
        return res.status(201).json({
            reservationId: reservation.reservationId,
            seats: reservation.seats,
            status: reservation.status
        });


    } catch (error) {
        console.log(error);
        return res.status(500).json({
            error: "Error Occured", error
        })
    }
});

// Delete Route 

app.delete("/reservations/:reservationId", async (req, res) => {
    try {
        let { reservationId } = req.params;    // Finding the id by req.params
        console.log(reservationId);
        if (!reservationId) {
            return res.status(404).json({
                error: "Not Found if reservationId unknown or already cancelled"
            })
        }

        // Finding the reservation with id and the status with confirmed
        let reservation = await Reservation.findOne({
            reservationId,
            status: "confirmed"
        })
        if (!reservation) {
            return res.status(404).json({
                error: "Data Not Found"
            })
        }

        // Restoring as we delete the reservation so whole avaliable seats will be increased
        await Event.findOneAndUpdate(
            { eventId: "node-meetup-2025" },
            {
                $inc: {
                    availableSeats: reservation.seats,
                    version: 1
                }
            }
        )

        reservation.status = "cancelled";
        await reservation.save();

        return res.sendStatus(204);


    } catch (error) {
        return res.status(404).json({
            error: "Not Found if reservationId unknown or already cancelled"
        })
    }

})

// Get Event Route

app.get("/reservations", async (req, res) => {
    try {
        const event = await Event.findOne({
            eventId: "node-meetup-2025"
        });

        if (!event) {
            return res.status(404).json({
                error: "Event not found"
            });
        }

        const reservationCount =
            event.totalSeats - event.availableSeats;

        return res.status(200).json({
            eventId: event.eventId,
            name: event.name,
            totalSeats: event.totalSeats,
            availableSeats: event.availableSeats,
            reservationCount,
            version: event.version
        });

    } catch (error) {
        console.error(error);
        return res.status(500).json({
            error: "Internal server error"
        });
    }
});


const startServer = async () => {
    await connectDb(); // MongoDb Connection Function
    await seedEvent(); // Data Insertion Function

    try {
        app.listen(port, () => {
            console.log(`Server is listening on port :${port}`);
        })
    } catch (error) {
        console.log("Server is not Listeining", error.message);
    }

};
startServer(); //Starting Server

