# Firebase Firestore Database Structure

## Overview

The database consists of several collections: `users`, `advisors`, `games`, and `picks`. Each of these collections contains documents with fields that represent different aspects of the data model. Below is a detailed description of each collection and the fields within their documents.

---

## Collections

### Users

A collection to store information about users.

- **Document ID**: Auto-generated
- **Fields**:
  - `username`: String (username of the user)
  - `email`: String (email address of the user)
  - `record`: Map (the win/loss/tie record of the user)
    - `wins`: Integer
    - `losses`: Integer
    - `ties`: Integer
  - `picks`: Array (an array of pick document IDs that the user has made)

#### Example

```json
{
  "username": "perlster",
  "email": "perlster11@yahoo.com",
  "record": {"wins": 0, "losses": 0, "ties": 0},
  "picks": ["pick1", "pick2"]
}
```

---

### Advisors

A collection to store information about advisors.

- **Document ID**: Auto-generated
- **Fields**:
  - `username`: String (username of the advisor)
  - `email`: String (email address of the advisor)
  - `record`: Map (the win/loss/tie record of the advisor)
    - `wins`: Integer
    - `losses`: Integer
    - `ties`: Integer
  - `picks`: Array (an array of pick document IDs that the advisor has made)

#### Example

```json
{
  "username": "advisorA",
  "email": "advisorA@gmail.com",
  "record": {"wins": 0, "losses": 0, "ties": 0},
  "picks": ["pick1", "pick3"]
}
```

---

### Games

A collection to store information about games.

- **Document ID**: Auto-generated
- **Fields**:
  - `apiGameId`: String (unique identifier for the game from the API)
  - `week`: Integer (the week the game is taking place)
  - `home`: String (home team)
  - `away`: String (away team)
  - `spread`: Integer (point spread)
  - `favorite`: String (team that is the favorite)

#### Example

```json
{
  "apiGameId": "abcdefg@123456",
  "week": 1,
  "home": "TeamA",
  "away": "TeamB",
  "spread": 3,
  "favorite": "TeamA"
}
```

---

### Picks

A collection to store picks made by users or advisors.

- **Document ID**: Auto-generated
- **Fields**:
  - `userId`: String (ID of the user or advisor who made the pick)
  - `gameId`: String (ID of the game that the pick is for)
  - `selection`: String (the selected team)

#### Example

```json
{
  "userId": "user1",
  "gameId": "game1",
  "selection": "TeamA"
}
```

---

## Relationships

- Users and Advisors can have multiple Picks.
- Each Pick corresponds to a single User or Advisor and a single Game.

