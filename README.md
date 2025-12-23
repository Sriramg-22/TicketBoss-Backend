# TicketBoss – Event Seat Reservation API

A Node.js and Express-based REST API that manages seat reservations for a single event with concurrency-safe booking, cancellation, and real-time seat availability tracking.

---

## 🚀 Tech Stack

- Node.js  
- Express.js  
- MongoDB  
- Mongoose  
- RESTful APIs  
- Postman (API Testing)

---

## 📁 Project Structure

```bash
ticketboss-backend/
├── models/
│   ├── event.js            # Event schema
│   └── reservation.js     # Reservation schema
├── utils/
│   ├── db.js               # MongoDB connection
│   └── seed.js             # Event seeding logic
├── index.js                # Application entry point
├── package.json
├── package-lock.json
├── .env                    # Environment variables
├── .gitignore
└── README.md



⚙️ Setup Instructions
1.Clone the Repository
    git clone https://github.com/Sriramg-22/TicketBoss-Backend.git
    cd TicketBoss-Backend

2.Install Dependencies
    npm install

3.Configure Environment Variables
    Create a .env file in the root directory:
    PORT=5090
    MONGO_URI=your_mongodb_connection_string

4.Run the Application
    npm start

5.The server will start at:
    http://localhost:5090

On startup:
    MongoDB connection is established
    Event data is automatically seeded

📚 API Documentation


1.Root Endpoint : GET /
    Response:This is root (For Testing)

2.Create Reservation

    1.Root EndPoint:POST /reservations (Creates a seat reservation for the event.)
    Request Body:
    {
        "partnerId": "partner-101",
        "seats": 2
    }
    2.Validation Rules
        .Seats must be between 1 and 10
        .Seats must be available

    Success Response – 201
    {
        "reservationId": "res_abc123",
        "seats": 2,
        "status": "confirmed"
    }
    Error Responses:
        400 → Invalid seat count
        409 → Not enough seats available
        500 → Internal server error

3.Cancel Reservation
    1.Root EndPoint:DELETE /reservations/:reservationId (Cancels an existing reservation and restores seats.)
    Response: 204 No Content
    Error Responses 404 → Reservation not found or already cancelled

4.Get Event Status
    1.Root EndPoint:GET /reservations (Returns current event seat details.)
    Response – 200
    {
        "eventId": "node-meetup-2025",
        "name": "Node.js Meetup",
        "totalSeats": 100,
        "availableSeats": 45,
        "reservationCount": 55,
        "version": 10
    }
    Error Responses
    404 → Event not found
    500 → Internal server error

🧠 Technical Decisions (Why I Took This Decisions)

1.Express.js was chosen for its simplicity and efficiency in building RESTful APIs.

2.MongoDB was selected as the database to handle flexible data models and scalability.

3.Mongoose is used for schema validation and to perform atomic database operations.

4.MongoDB atomic operators ($gte, $inc) are used to prevent overbooking during concurrent seat reservations.

5.Event seeding on server startup ensures the application always has initial data to work with.

6.These decisions help keep the application reliable, scalable, and easy to maintain.



📘 What I Reinforced and Applied in This Project

This project helped me apply and strengthen my existing backend knowledge in a practical, real-world scenario.

1.Designing and implementing RESTful APIs using Express.js for a real backend service

2.Integrating a Node.js application with MongoDB using Mongoose and managing schemas effectively

3.Applying input validation and returning appropriate HTTP status codes for different scenarios

4.Handling concurrent requests safely using MongoDB atomic operations to prevent overbooking

5.Structuring a backend project using standard Node.js conventions for maintainability

6.Writing clear, concise, and professional documentation suitable for internship submissions


🌱 Note to Reviewers

I may not be perfect or highly experienced yet, but I am genuinely motivated to learn, improve, and grow as a software engineer.  
I approach every project with curiosity, discipline, and a strong willingness to accept feedback.  
This project reflects my current skills as well as my commitment to continuous learning and applying best practices.  
I am eager to learn from real-world experience and contribute meaningfully while growing professionally.

---

👤 Author

G.SRIRAM  
BTech Computer Science | MERN Stack Developer  

- LinkedIn: [https://www.linkedin.com/in/sriram593/](https://www.linkedin.com/in/sriram593/)  
- GitHub: [https://github.com/Sriramg-22](https://github.com/Sriramg-22)
