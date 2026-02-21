const { Router } = require('express');
const usersRouter = Router();
const usersController = require("../controllers/usersController");

usersRouter.get('/', usersController.usersListGet);

usersRouter.get('/search', usersController.userSearch);

usersRouter.get('/create', usersController.usersCreateGet);
usersRouter.post('/create', usersController.usersCreatePost);

usersRouter.get("/:id/update", usersController.usersUpdateGet);
usersRouter.post("/:id/update", usersController.usersUpdatePost);

usersRouter.post('/:id/delete', usersController.userDelete);

module.exports = usersRouter;


// <!DOCTYPE html>
// <html lang="en">
// <head>
//     <meta charset="UTF-8">
//     <meta name="viewport" content="width=device-width, initial-scale=1.0">
//     <title>Search</title>
// </head>
// <body>
//     <h1>Found users</h1>
//     <% if (result.length !== 0) { %>
//     <% result.forEach(i => { %>
//         <div>
//             <p><%= i.firstName i.lastName i.age%>years</p>
//             <p><%= i.email %></p>
//             <p><%= i.bio %></p>
//         </div>
//     <% }) %>
//     <% } else %> <p>No matches found</p>
// </body>
// </html>