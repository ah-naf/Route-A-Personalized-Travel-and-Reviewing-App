You can find the source code of the frontend in this [link](https://github.com/ah-naf/Route-Frontend). Below, you'll find the API documentation which provides details about the available endpoints, their descriptions, request formats, and expected responses for each route

# ROUTE Backend API Documentation

## Table of Contents

- [ROUTE Backend API Documentation](#route-backend-api-documentation)
  - [Table of Contents](#table-of-contents)
  - [Introduction](#introduction)
  - [Authentication](#authentication)
    - [Login](#login)
    - [Register](#register)
    - [Verify](#verify)
    - [Logout](#logout)
  - [User](#user)
    - [Get Single User](#get-single-user)
    - [Update User](#update-user)
  - [File Upload](#file-upload)
    - [Upload Image](#upload-image)
    - [Get Uploaded Image](#get-uploaded-image)
  - [Routes](#routes)
    - [Get All Routes](#get-all-routes)
    - [Create New Route](#create-new-route)
    - [Get Single Route](#get-single-route)
    - [Update Route](#update-route)
    - [Delete Route](#delete-route)
    - [Like or Dislike Route](#like-or-dislike-route)
    - [Add Comment to Route](#add-comment-to-route)
    - [Get Comments for Route](#get-comments-for-route)
    - [Delete Comment](#delete-comment)
  - [Bookmarks](#bookmarks)
    - [Add or Remove Bookmark](#add-or-remove-bookmark)
    - [Get All Bookmarks](#get-all-bookmarks)
    - [Clear All Bookmarks](#clear-all-bookmarks)
  - [Place Reviews](#place-reviews)
    - [Add Place Review](#add-place-review)
    - [Update Place Review](#update-place-review)
    - [Get All Place Reviews](#get-all-place-reviews)
    - [Get Single Place Review](#get-single-place-review)
    - [Delete Place Review](#delete-place-review)
  - [Search Routes](#search-routes)
    - [Search for Route](#search-for-route)

---

## Introduction

Welcome to the ROUTE Backend API Documentation. This API provides various endpoints to interact with the application.

## Authentication

### Login

**Endpoint:** `POST /api/auth/login`

**Description:** Log in an existing user.

**Request:**

```json
{
  "email": "user@example.com",
  "password": "password123"
}
```

**Response:**

- `200 OK`: Successful login.
- `401 Unauthorized`: Invalid credentials.

### Register

**Endpoint:** `POST /api/auth/register`

**Description:** Register a new user.

**Request:**

```json
{
  "email": "user@example.com",
  "name": "John Doe",
  "username": "johndoe",
  "password": "password123"
}
```

**Response:**

- `201 Created`: User successfully registered.
- `400 Bad Request`: Invalid request body.

### Verify

**Endpoint:** `GET /api/auth/verify`

**Description:** Verify if user is still logged in.

**Response:**

- `200 OK`: User is logged in.
- `401 Unauthorized`: User is not logged in.

### Logout

**Endpoint:** `GET /api/auth/logout`

**Description:** Log out the user.

**Response:**

- `200 OK`: User successfully logged out.
- `401 Unauthorized`: User is not logged in.

## User

### Get Single User

**Endpoint:** `GET /api/auth/user/:id`

**Description:** Get information about a single user.

**Response:**

- `200 OK`: User details retrieved successfully.
- `404 Not Found`: User not found.

### Update User

**Endpoint:** `POST /api/auth/user`

**Description:** Update user details.

**Request:**

```json
{
  "name": "Updated Name",
  "bio": "some bio",
  "url": "https://github.com/ah-naf",
  "phone": "+8801xxxxx"
}
```

**Response:**

- `200 OK`: User details updated successfully.
- `400 Bad Request`: Invalid request body.

## File Upload

### Upload Image

**Endpoint:** `POST /upload`

**Description:** Upload an image.

**Request:**

- Form Data:
  - `image`: Image file.

**Response:**

- `200 OK`: Image uploaded successfully.
- `400 Bad Request`: Invalid request.

### Get Uploaded Image

**Endpoint:** `GET /upload/:imageName`

**Description:** Get an uploaded image.

**Response:**

- `200 OK`: Image retrieved successfully.
- `404 Not Found`: Image not found.

## Routes

### Get All Routes

**Endpoint:** `GET /api/route`

**Description:** Get all routes.

**Response:**

- `200 OK`: Routes retrieved successfully.

### Create New Route

**Endpoint:** `POST /api/route`

**Description:** Create a new route.

**Request:**

```json
{
  "title": "Route Title",
  "flow": {...},
  "published": true
}
```

**Response:**

- `201 Created`: Route created successfully.
- `400 Bad Request`: Invalid request body.

### Get Single Route

**Endpoint:** `GET /api/route/:id`

**Description:** Get information about a single route.

**Response:**

- `200 OK`: Route details retrieved successfully.
- `404 Not Found`: Route not found.

### Update Route

**Endpoint:** `POST /api/route/:id`

**Description:** Update route details.

**Request:**

```json
{
  "title": "Updated Title",
  "flow": {...},
  "published": true
}
```

**Response:**

- `200 OK`: Route details updated successfully.
- `404 Not Found`: Route not found.
- `400 Bad Request`: Invalid request body.

### Delete Route

**Endpoint:** `DELETE /api/route/:id`

**Description:** Delete a route.

**Response:**

- `200 OK`: Route deleted successfully.
- `404 Not Found`: Route not found.

### Like or Dislike Route

**Endpoint:** `POST /api/review/like`

**Description:** Like or dislike a route.

**Request:**

```json
{
  "routeId": "routeId123"
}
```

**Response:**

- `201 Created`: Action completed successfully.
- `404 Not Found`: Route not found.

### Add Comment to Route

**Endpoint:** `POST /api/review/comment`

**Description:** Add a comment to a route.

**Request:**

```json
{
  "routeId": "routeId123",
  "text": "This is a comment."
}
```

**Response:**

- `201 Created`: Comment added successfully.
- `400 Bad Request`: Invalid request body.
- `404 Not Found`: Route not found.

### Get Comments for Route

**Endpoint:** `GET /api/review/comment/:id`

**Description:** Get all comments for a route.

**Response:**

- `200 OK`: Comments retrieved successfully.
- `404 Not Found`: Route not found.

### Delete Comment

**Endpoint:** `DELETE /api/review/comment/:id`

**Description:** Delete a comment.

**Response:**

- `200 OK`: Comment deleted successfully.
- `404 Not Found`: Comment not found.

## Bookmarks

### Add or Remove Bookmark

**Endpoint:** `POST /api/bookmark`

**Description:** Add or remove a bookmark.

**Request:**

```json
{
  "routeId": "routeId123"
}
```

**Response:**

- `201 Created`: Action completed successfully.
- `404 Not Found`: Route not found.

### Get All Bookmarks

**Endpoint:** `GET /api/bookmark`

**Description:** Get all bookmarks.

**Response:**

- `200 OK`: Bookmarks retrieved successfully.

### Clear All Bookmarks

**Endpoint:** `DELETE /api/bookmark`

**Description:** Clear all bookmarks.

**Response:**

- `200 OK`: Bookmarks cleared successfully.

## Place Reviews

### Add Place Review

**Endpoint:** `POST /api/placeReview`

**Description:** Add a new place review.

**Request:**

```json
{
  "title": "Review Title",
  "place": "Place Name",
  "desc": "Review Description",
  "rating": 4.5,
  "cover_pic": "www.xyz.com/image123",
  "contents": {...},
  "tags": ["tag1", "tag2"]
}
```

**Response:**

- `200 OK`: Review added successfully.
- `400 Bad Request`: Invalid request body.

### Update Place Review

**Endpoint:** `POST /api/placeReview/:id`

**Description:** Update a place review.

**Request:**

```json
{
  "title": "Review Title",
  "place": "Place Name",
  "desc": "Review Description",
  "rating": 4.5,
  "cover_pic": "www.xyz.com/image123",
  "contents": {...},
  "tags": ["tag1", "tag2"]
}
```

**Response:**

- `200 OK`: Review updated successfully.
- `404 Not Found`: Review not found.
- `400 Bad Request`: Invalid request body.

### Get All Place Reviews

**Endpoint:** `GET /api/placeReview`

**Description:** Get all place reviews.

**Response:**

- `200 OK`: Place reviews retrieved successfully.

### Get Single Place Review

**Endpoint:** `GET /api/placeReview/:id`

**Description:** Get information about a single place review.

**Response:**

- `200 OK`: Place review details retrieved successfully.
- `404 Not Found`: Place review not found.

### Delete Place Review

**Endpoint:** `DELETE /api/placeReview/:id`

**Description:** Delete a place review.

**Response:**

- `200 OK`: Place review deleted successfully.
- `404 Not Found`: Place review not found.

## Search Routes

### Search for Route

**Endpoint:** `GET /api/search`

**Description:** Search for routes.

**Query Parameters:**

- `source`: Source location (optional).
- `destination`: Destination location (optional).

**Response:**

- `200 OK`: Routes retrieved successfully.

---

This API documentation provides details about the available endpoints, their descriptions, request formats
