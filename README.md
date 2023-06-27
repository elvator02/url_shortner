
# URL Shortener

The URL Shortener is a web application that allows users to shorten long URLs and keep track of their shortened URLs along with additional notes. This documentation provides an overview of the application's features, architecture, and implementation details.

# Demo

https://github.com/elvator02/url_shortner/assets/115696725/2ae02064-cba1-430e-a9e2-e51f421ee2c1


## Features

- Shorten long URLs to compact and manageable short URLs.
- Add optional notes or descriptions to the shortened URLs for reference.
- Search for specific URLs or notes using the search functionality.
- Autocomplete feature to quickly find matching URLs or notes.
- User registration and login system to secure access to the application.
- JWT-based authentication to maintain user sessions securely.
- Also a clicks tab is there where you can see how many times a user has clicked on that url.(To get the latest clicks just reload the website).



## Installation
***If you don't have npm then install it and then move forward***

### Backend Installation

Clone the repository  

```bash
git clone https://github.com/elvator02/url_shortner.git
```
Naviagte to backend directory
```bash
cd backend
```
Install the backend dependencies using npm
```bash
npm install
```

### Frontend Installation
Come to previous directory
```bash
cd ..
```

Navigate to frontend directory
```bash
cd frontend
```
Install the frontend dependencies using npm
```bash
npm install
```


## Environment Variables

To run this project, you will need to add the following environment variables to your .env file

 Set up the environment variables:

- Create a `.env` file in the project backend directory.
- Add the following environment variables and provide appropriate values:

  ```
  PORT=<port-number>
  MONGODB_URI=<mongodb-connection-uri>
  JSON_WEB_TOKEN=<jwt-secret-key>
  ```



## Deployment

To deploy this project on localhost run

1. Make sure you have MongoDB installed and running on your     

  system.


  2.   Start the server:
  

- Naviagte to backend directory
```bash
cd backend
```

- Start server/nodemon
```bash
npm run devStart
```
Access the application in your web browser at http://localhost:<PORT>


## Usage

- Register
  - Open the application in your web browser at  http://localhost:<PORT>.
  - Click on the "Register" link to navigate to the registration page.
  - Provide a unique username and a password.
  - Click on the "Register" button to create a new user account.

- Login
  - If your not registered then first register yourself and then login.
  - Enter your registered username and password.
  - Click on the "Login" button to log in to your account.

- Shorten Url
  - After logging in, you will be redirected to the URL Shortener dashboard.
  - Enter the full URL you want to shorten in the "Full URL" input field.
  - Optionally you can provide additional notes in the "Notes" input field.
  - Click on the "Shorten URL" button to generate a shortened URL.
  - The shortened URL will appear in the list below with its corresponding full URL and notes.

- Search for URLs or Notes

  - In the URL Shortener dashboard, you will find a search form. Enter a search query in the "Search" input field.  
  - The application will display the search results, including the matching full URLs, shortened URLs, and notes.  
  - If there are no search results, a message indicating "No Search Results" will be shown.

- Autocomplete

  - In the URL Shortener dashboard, the search input field supports autocomplete functionality.  
  - As you type in the search input field, the application will provide autocomplete suggestions based on matching URLs and notes.  
  - Clicking on an autocomplete suggestion will fill the search input field with the selected value.

-  Logout

   - To log out from your account, click on the "Logout" button located at the top-right corner of the dashboard.  
   - You will be redirected to the login page.








## Tech Stack



- Frontend
  - HTML
  - JavasScript
  - CSS
  - Bootstrap(CSS)
  - jqueryUI and jquery

- Backend
  - Node.js
  - Express.js
  - MongoDB 
  - Mongoose 
  


- Authentication
  - JSON Web Tokens (JWT)
  - bcrypt (password hashing)

- Templating Engine
  - EJS

- Other dependencies
  - nanoid(For creating shortened urls)
  - dotenv 
  - cookie-parser 
  - path

## API Reference


### Autocomplete
Perform autocomplete search based on the provided query.
```
Endpoint: GET/autocomplete
```

#### Request Parameters

| Parameter | Type   | Required | Description                          |
|-----------|--------|----------|--------------------------------------|
| q         | string | Yes      | The query string to search for.      |

#### Response Format

The response will be a JSON array containing a maximum of 5 autocomplete results. Each result object will have the following properties:

| Property | Type   | Description                                     |
|----------|--------|-------------------------------------------------|
| full     | string | The full URL associated with the short URL.      |
| short    | string | The shortened URL.                              |
| notes    | string | Additional notes or description for the URL.     |

Example Response:

```json
[
  {
    "full": "https://example.com/full-url",
    "short": "abc123",
    "notes": "Example URL"
  },
  {
    "full": "https://example.com/another-url",
    "short": "def456",
    "notes": "Another Example"
  },
  ...
]
```

### Register

Create a new user account.

#### Request

```
POST/register
```
##### Parameters

| Name       | Type   | Required | Description                    |
|------------|--------|----------|--------------------------------|
| username   | string | Yes      | The username for the new user. |
| password   | string | Yes      | The password for the new user. |

#### Response

| Description                                 |
|---------------------------------------------|
| User registration successful.               |
| Invalid request or missing parameters.      |
| Username already exists.                    |

### Login

Authenticate the user and generate a JWT token.

#### Request


```
POST/login
```

##### Parameters

| Name       | Type   | Required | Description                   |
|------------|--------|----------|-------------------------------|
| username   | string | Yes      | The username of the user.     |
| password   | string | Yes      | The password of the user.     |

#### Response

| Description                                 |
|---------------------------------------------|
| User authentication successful. Returns the JWT token. |
| Invalid request or missing parameters.      |
| Invalid username or password.               |

### Logout

Log out the user by invalidating the JWT token.

#### Request

```
POST/logout
```

#### Response

| Description                                 |
|---------------------------------------------|
| User successfully logged out.               |

### Creating shorturls

Create a new shortened URL entry for the logged-in user.

#### Request

```
POST/shortUrls
```

##### Parameters

| Name       | Type   | Required | Description                                        |
|------------|--------|----------|----------------------------------------------------|
| fullUrl    | string | Yes      | The full URL to be shortened.                      |
| notes      | string | No       | Additional notes or description for the shortened URL. |

#### Response

| Description                                 |
|---------------------------------------------|
| Short URL creation successful.               |
| Invalid request or missing parameters.      |
| User authentication required.               |

### Search

Retrieve the shortened URLs for the logged-in user or perform a search based on the provided query.

#### Request

```
GET/urlshortner
```

##### Parameters

| Name       | Type   | Required | Description                                                      |
|------------|--------|----------|------------------------------------------------------------------|
| q (optional) | string | No       | The query string to search for in the full URL, short URL, or notes. |

#### Response

| Description                                 |
|---------------------------------------------|
| Shortened URLs or search results retrieved successfully. |

### <shortUrl>

Redirect the user to the original full URL associated with the given shortUrl.

#### Request
http://localhost:$PORT/:<shortUrl>

#### Response
Redirects user to the fullUrl address
## Acknowledgements

- This project was made under ACM projects [ACM IITR](https://iitr.acm.org/#/)
- For jwt i refered this [channel](https://www.youtube.com/@PedroTechnologies)
- Got lots of help from [CWH](https://www.youtube.com/@CodeWithHarry) , [webdevsimplified](https://www.youtube.com/@WebDevSimplified) ,[freecodecamp](https://www.youtube.com/@freecodecamp) and documentations of packages
