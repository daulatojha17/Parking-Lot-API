# Parking Lot Management RESTful API

This project is a RESTful API for managing parking lots, including parking, unparking, and ticket generation. It is built using Node.js and Express.

## Features

- Vehicle entry and parking lot initialization
- Vehicle exit and slot management
- Ticket generation and retrieval
- Parking slot status updates
- Query parked cars by size

## Installation

To install and run this project locally:

1. Clone this repository:
   ```bash
   git clone https://github.com/daulatojha17/Parking-Lot-API.git
   ```
2. Install the dependencies:
   ```bash
   npm install
   ```
3. Start the server:
   ```bash
   npm run dev
   ```


## Endpoints

1. **Create a Parking Lot**
   - **API:** `/parking`
   - **Method:** POST
   - **Description:** Creates a new parking lot with the specified floor number, parking lot name, and number of slots. Slots can be of various sizes (e.g., small, medium, large, extra-large).
   - **Limitation:** The API currently doesn't optimize space allocation (e.g., using a medium slot for one or two small vehicles).

2. **Get Parking Lot Status**
   - **API:** `/parking/status`
   - **Method:** GET
   - **Description:** Retrieves data for all floors and their parking slots from the database.

3. **Park a Car**
   - **API:** `/car/park`
   - **Method:** POST
   - **Description:** Asks for the floor, size, and license plate number of a car. It then retrieves the nearest available parking slot and creates a ticket for that car.

4. **Unpark a Car**
   - **API:** `/car/leave`
   - **Method:** POST
   - **Description:** Takes the ticket ID from the user, frees up the corresponding parking slot, and marks the ticket as exited.

5. **Get License Plates by Car Size**
   - **API:** `/ticket`
   - **Method:** GET
   - **Description:** Takes the car size as a query parameter and returns the license plates of parked cars of that size.

6. **Get Allocated Cars by Size**
   - **API:** `/parking/allocated`
   - **Method:** GET
   - **Description:** Returns the license plates of cars of a given size that are currently allocated in the parking lot.

   
