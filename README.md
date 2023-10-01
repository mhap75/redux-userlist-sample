# User Manager App with Vite and React

A user manager application built with Vite and React that allows operators to perform CRUD (Create, Read, Update, Delete) operations on user data. The application utilizes Redux Toolkit with asynchronous thunk methods to manage the user list state and handles all CRUD operations through Redux Toolkit's async extra reducers.

## Features

- Create new users with a unique ID, name, and email.
- View the list of users, including their ID, name, and email.
- Edit existing user information.
- Delete users from the list.
- Data is stored and served using a local JSON Server database.

## Technologies Used

- Vite: A fast build tool and development server.
- React: A JavaScript library for building user interfaces.
- Redux Toolkit: A state management library for React applications.
- JSON Server: A local JSON database for development and prototyping.

## Getting Started

Follow these steps to get the project up and running on your local machine:

1. Clone the repository to your local machine:

```bash
git clone https://github.com/mhap75/redux-userlist-sample

2. Navigate to the project directory:

```bash
npm install
```

3. Start the JSON Server to serve user data:

```bash
json-server --watch ./src/database/db.json --port 3004
```

3. Start the development server:

```bash
npm run dev
```
or the for the production: 
```bash
npm run build
```
then
```bash
npm run preview
```

## Usage
To create a new user, click the "Add User" button and fill in the required information.
To edit an existing user, click the "Edit" button in the user list.
To delete a user, click the "Delete" button in the user list and confirm the deletion operation.

## Contributing
Contributions are welcome! Feel free to open an issue or create a pull request to suggest improvements, report bugs, or add new features.