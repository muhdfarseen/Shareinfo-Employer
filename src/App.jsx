import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { routes } from "./Routes";

function App() {

  const browserRouter = createBrowserRouter(routes)

  return (
    <RouterProvider router={browserRouter} />
  );
}

export default App;
