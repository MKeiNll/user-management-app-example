# user-management-app-example

A user management application.
Consists of 2 parts - Express.js REST API & React SPA.

## Features

+ Authentification
  + A JSON Web Token which is set on a successful login and is required on every request to route `/users`.
+ Emails
  + Postmark API to send emails.
  + Email content is templated with mustache.js. Each template is a file.
+ Translations 
  + 100% of the code is translated with i18next.
  + All translations are stored in a JSON file.
  
## Implementation

There are 2 kinds of users in the application - authenticated & non-authenticated.
Non-authenticated user can only access registration, login & password recovery views.
Authenticated user can only access users, add user & user details views.

### Non-authenticated user actions

+ Register
  + All inputs are being validated.
  + An email with a validation link is being sent on successful registration.
+ Log in
+ Recover password
  + An email with new randomly-generated password is being sent.

### Authenticated user actions

+ View users
  + Every user is numerated.
  + User table is paginated.
+ Delete user
  + This action requires confirmation.
  + A notifying email is being sent to deleted user.
+ Add user
+ View user details
  + View all the times a certain user has logged in into the application.
+ Log out

## Code

+ All TypeScript.
  + TSLint is integrated for both back-end & front-end.
+ Inline documentation of all API routes. 
+ App uses NPM.
