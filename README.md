# user-management-app-example

A user management application.
Consists of 2 parts - Express.js REST API & React SPA.
Uses NPM.

## Features

+ Authentication
  + A JSON Web Token which is set on a successful login and is required on every request to route `/users`.
  + All stored passwords are being encrypted with bcrypt.
  + Each new user should validate its email via confirmation link.
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

## Code features

+ All TypeScript.
  + TSLint is integrated for both back-end & front-end.
+ Inline documentation of all API routes. 

## Running the app

**There is a default user with an email of '1' & password of '1'**\
**In order to run the application, either a valid Postmark API key & *email* from property have to be set, or sending emails should be disabled completely in the development.env file**

back-end: `cd back-end` > `npm i` > `npm run-script build` > `npm run-script start-dev`\
front-end: `cd front-end` > `npm i` > `npm start`

`npm run-script lint` - run TSLint in front-end or back-end.\
`npm run-script test` - run back-end tests.

## Known issues

+ User database is simulated via JSON file. An actual database would be welcome.
+ Emails are being sent with titles & bodies in 2 languages. An actual email translations with language header being read from the request would be welcome.
+ Errors are being sent with english-only messages & unique codes which are being mapped to a corresponding translations in front-end. An actual error translations with language header being read from the request would be welcome.
+ Email templates are `.ts` files containing a default export of an HTML string. Actual `.html` templates would be welcome.
+ No front-end tests.
+ Back-end tests do not cover all scenarios & routes.\
+ Logged in user can delete himself (a bug or a feature?).
+ Logger is terrible (e.g objects are being logged as `[object Object]`).
