import { RouterProvider } from 'react-router-dom';
import { appRoutes } from './app.routes.jsx';

function App() {
  return (
    <RouterProvider router={appRoutes} />
  );
}

export default App;