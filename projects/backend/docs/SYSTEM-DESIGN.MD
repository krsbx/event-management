# Event Management Backend System Design

## Introduction

The backend project is a high-level project that focuses on the development of the server. The goal of the project is to build the server into an event driven architecture.

## Motivation

The motivation for the backend project is to build the server into an event driven architecture. This will allow for the server to be easily scaled and managed by the team.

## Architecture

For architecture related, please refer to the [THOUGHT-PROCESS.MD](./THOUGHT-PROCESS.MD#architecture).

## Database Design

- ## Available Event Schema

  - ## Available Information

    - The user need to create an event by providing an event id / name as a dropdown list.

    - Scalability of Implementation (... - **e.g. no hardcoding**)

    > From the given information, the no hardingcode sections means that "there might be the case that the event id/name can be modified in the near future", therefore the solutions for the scalability are to stored the given available event in the database for the user to use.

    > Since it also meantions event id, we can just use that event id (the `_id` properties in `MongodDB`) as the event id for the relationships.

  - ## Schema

    - \_id : `ObjectId` (required), auto generated from the `MongoDB`

    - eventName : `String` (required), the name of the event so the user can select on

    - createdAt : `Date` (required), auto generated from the `MongoDB`, we store the time just in case in the near future we need this kind of information like we only need an event that created in a certain date

    - updatedAt : `Date` (required), auto generated from the `MongoDB`

- ## Event Schema

  - ## Available Information

    - The user need to create an event by providing an event id / name as a dropdown list.

    - The user need to create an event by providing the locations of the event.

    - The user need to create an event by providing 3 proposed dates of the event.

    - The user need create an eventy by providing the user company name automatically from their account information.

    - The systems should be able to log the date of the creation of the event.

    - The systems should be able to track the status of the event (e.g. pending, approved, rejected, canceled).

    - The systems should be able to track the remarks in case of the event being rejected by the vendor.

    - The systems should be able to track the confirmation date that the vendor approved.

    - Bonus: .... Vendor/HR account can only see their own events.

    > From the given information, we can see that the even name can use the available event \_id or the name of the available event that user select.

    > Since the user required to send 3 proposed dates and we use `MongoDB` as our database which is NoSQL, we can use `Array` to store the proposed dates.

    > Since the user can only see their own event, we also need some sort properties to track the event such as who is the one who proposed the event and who is this event proposed to.

    > Since in the bonus sections, the user can only see their own events, we can conclude that the HR can only see the events that has the `proposedBy` that match with their user account `_id` and the vendor can only see the events that has the `proposedTo` that match with their user account `_id`.

    ## Schema

    - \_id : `ObjectId` (required), auto generated from the `MongoDB`

    - eventName : `ObjectId` (required), the id of the available event that user select from the dropdown list

    - location : `String` (required), the location of the event

    - proposedDates : `Array(String)` (required), the proposed dates of the event

    - status : `String` (required), the status of the event (e.g. pending, approved, rejected, canceled)

    - remarks : `String` (required), the remarks in case of the event being rejected by the vendor

    - companyName : `String` (required), the name of the company that created the event

    - proposedBy : `ObjectId` (required), the id of the user that proposed the event (HR account)

    - proposedTo : `ObjectId` (required), the id of the user that proposed the event (Vendor account)

    - eventDate : `Date` (required), the approved date of the event from the vendor

    - createdAt : `Date` (required), auto generated from the `MongoDB`

    - updatedAt : `Date` (required), auto generated from the `MongoDB`

- ## User Schema

  - ## Available Information

    - The user need create an eventy by providing the user company name automatically from their account information.

    - The user need to log to the systems using their username and password.

    - There is a Vendor account and HR account

    > From the given information, we can stored the user company name information in the user data itself directly. We can just use a `ObjectId` type for referencing the collection of the company name, but since there is no implication that we need to store the company name in the user data as a reference, we can just store it as a `String` type.

    > Since the user required to log to the systems using their username and password, means that we can just stored it as `username` and `password` with `String` type.

    > Since there is only a 2 roles, Vendor and HR, we can just store the role as `String` and hard code it. There reason why we chose to hard code it is because if there is another role being added, the behaviour will be different between each role. Since the `Vendor` and `HR` has a similiar behaviour, we can just hard code it.

  - ## Schema

    - \_id : `ObjectId` (required), auto generated from the `MongoDB`

    - username : `String` (required), the username of the user

    - password : `String` (required), the password of the user

    - role : `String` (required), the role of the user (e.g. Vendor, HR)

    - companyName : `String` (required), the name of the company that created the event

    - createdAt : `Date` (required), auto generated from the `MongoDB`

    - updatedAt : `Date` (required), auto generated from the `MongoDB`

- ## Migration Schema

  - ## Available Information

    - There is no available information regarding this schema, but we chose to create one for the purpose of migration/sedding.

    - By storing the information in the `migrations` collections, we can make sure that the seed is only done once.

  - ## Schema

    - \_id : `ObjectId` (required), auto generated from the `MongoDB`

    - migrationName : `String` (required), the name of the migration

    - executedAt : `Date` (required), auto generated from the `MongoDB`, works as a timestamp when the migrations/seeds is done
