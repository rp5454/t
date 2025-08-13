// src/routes.js
import DeleteApplication from "./pages/Applications/DeleteApplication";

const routes = [
  { path: "/applications/delete/:id", element: <DeleteApplication /> },
  // ...other routes
];

export default routes;
