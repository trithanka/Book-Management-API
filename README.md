# Book-Management-API

### Instructions for Setting Up and Running the API

1. **Clone the Repository:**
   ```
   git clone <repository-url>
   ```
   
2. **Install Dependencies:**
   ```
   cd Book-Management-API
   npm install
   ```

3. **Set Environment Variables:**
   Create a `.env` file in the root directory and define the following environment variables:
   ```
   PORT=3000
   MONGO_URL=<your-mongodb-uri>
   SECERET_TOKEN=<your-secret-key>
   ```

4. **Start the Server:**
   ```
   npm start
   ```

### User Authentication API

This API provides endpoints for user authentication, including registration and login.

#### 1. POST /register
- **Description:** Registers a new user in the system.
- **Request Body:**
  - `fullName`: Full name of the user (String, required)
  - `email`: Email address of the user (String, required)
  - `password`: Password for the user account (String, required)
  - `dateOfBirth`: Date of birth of the user (Date, optional)
- **Response:** 
  - 201 Created: User registered successfully
  - 400 Bad Request: If user already exists with the provided email address

#### 2. POST /login
- **Description:** Logs in a user and generates a JWT token for authentication.
- **Request Body:**
  - `email`: Email address of the user (String, required)
  - `password`: Password for the user account (String, required)
- **Response:** 
  - 200 OK: User logged in successfully, returns JWT token, email, and userId
  - 400 Bad Request: If user does not exist or password is incorrect


### Book Management API
This API provides endpoints for managing books in the system.

#### 1. POST /books
- **Description:** Creates a new book entry in the system.
- **Request Body:**
  - `title`: Title of the book (String, required)
  - `description`: Description of the book (String, required)
  - `userId`: ID of the user who created the book (String, required)
  - `ISBN`: ISBN number of the book (String, required, unique)
  - `author`: Author of the book (String, required)
  - `category`: Category of the book (String, required)
  - `rating`: Rating of the book (Number, default: 0)
  - `publicationYear`: Publication year of the book (String, required)
- **Response:** 
  - 201 Created: Book created successfully
  - 400 Bad Request: If ISBN number already exists
  - 404 Not Found: If user ID is invalid

#### 2. GET /books
- **Description:** Retrieves a list of books based on optional query parameters.
- **Query Parameters:**
  - `author`: Filters books by author (String)
  - `publicationYear`: Filters books by publication year (String)
- **Response:** 
  - 200 OK: List of books retrieved successfully

#### 3. GET /books/:id
- **Description:** Retrieves details of a single book by its ID.
- **Parameters:**
  - `id`: ID of the book to retrieve (String)
- **Response:** 
  - 200 OK: Book details retrieved successfully
  - 404 Not Found: If book ID is invalid

#### 4. PUT /books/:id
- **Description:** Updates details of a book by its ID. (authorized)
- **Parameters:**
  - `id`: ID of the book to update (String)
- **Request Body:**
  - Same as create endpoint
- **Response:** 
  - 200 OK: Book updated successfully
  - 403 Forbidden: If user does not have permission to update the book
  - 404 Not Found: If book ID is invalid

#### 5. DELETE /books/:id
- **Description:** Deletes a book by its ID.(authorized)
- **Parameters:**
  - `id`: ID of the book to delete (String)
- **Response:** 
  - 200 OK: Book deleted successfully
  - 404 Not Found: If book ID is invalid