Input from Frontend

- Company Name : String
- 3 Date : DateTime
- 1 Location : String
- Event Name? : String -> UUID?

Available Event Model

- alvailableEventId : String -> UUID
- eventName : String
- eventDate : DateTime
- createdAt : DateTime
- updatedAt : DateTime

Event Model

- eventId : String -> UUID
- eventName : String
- location: String
- proposedDates: String[]
- status: String -> Pending, Approved, Rejected
- remarks : String | Null
- proposedBy : String -> UUID
- proposedTo : String -> UUID
- eventDate : DateTime | Null
- createdAt : DateTime
- updatedAt : DateTime

User Model

- userId : String -> UUID
- username : String
- password : String
- role : String -> Vendor, HR
- createdAt : DateTime
- updatedAt : DateTime

Migration Model

- migrationName: : String
- createdAt : DateTime

Seeder Model

- seederName: : String
- createdAt : DateTime

Flow

1. HR Create Event for a specific Vendor
2. Vendor will review the event that proposed by the HR
3. Vendor will approve the event or reject the event with remarks
