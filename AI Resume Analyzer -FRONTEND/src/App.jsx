import { RouterProvider } from 'react-router-dom';
import { appRoutes } from './app.routes.jsx';
import { AuthProvider } from './features/auth/auth.context.jsx';

function App() {
  return (
    <AuthProvider>
    <RouterProvider router={appRoutes} /></AuthProvider>
  );
}

export default App;