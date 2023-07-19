- [Frontend](#frontend)
- [Backend](#backend)
  - [Api](#api)
    - [GET\_ID\_REQ](#get_id_req)
    - [SET\_USERNAME\_REQ](#set_username_req)
    - [WHO\_AM\_I](#who_am_i)
    - [CREATE\_ROOM](#create_room)
    - [GET\_ROOMS](#get_rooms)
    - [JOIN\_ROOM](#join_room)
    - [LEAVE\_ROOM](#leave_room)
  - [Server structure](#server-structure)
    - [Data](#data)
    - [User](#user)
    - [RoomState](#roomstate)
    - [Room](#room)


# Frontend

# Backend

## Api

### GET_ID_REQ

```
() => event
Emits the "GET_ID_RES" event, returns the client ID
```

### SET_USERNAME_REQ

```
(username) => null
Updates the username of the current client
```


### WHO_AM_I

```
() => event
Emits the YOU_ARE event, returns the current User 
```
[User doc](#user)


### CREATE_ROOM
```
({ roomSettings}) => event
Emits the JOINED_ROOM event returns the newly created rooms data
```
[Room doc](#room)

### GET_ROOMS
```
() => Event
emits the GET_ROOMS_RES event containing data of all rooms
```
[Room doc](#room)

### JOIN_ROOM
```
(roomId) => Event
Emits events to:
The user -> JOINED_ROOM (room data)
The room you connect to -> JOINED_ROOM (room data)
All clients -> ROOM_CREATED (all rooms data)
```
[Room doc](#room)

### LEAVE_ROOM
```
(roomId) => Event
If it is the last user of a room, emits the ROOM_REMOVED event to all users

Emits the LEFT_ROOM event to the room
Emits the ROOM_UPDATED event to all users 
```

## Server structure

### Data
[Data](backend/data.json)

### User
```
username: string
id: string (socket.io client id)
```

### RoomState

```
TODO
```

### Room
```
password?: string,   default: ''
name?: string,       default: room-id
id: number,
users: Array,
host: User,
state: RoomState
```
