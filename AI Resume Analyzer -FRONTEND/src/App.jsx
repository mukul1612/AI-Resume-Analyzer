import { RouterProvider } from "react-router-dom";
import { appRoutes } from "./app.routes.jsx";
import { AuthProvider } from "./features/auth/auth.context.jsx";
import { InterviewProvide } from "./features/interview/interview.context.jsx";
function App() {
  return (
    <AuthProvider>
      <InterviewProvide>
        <RouterProvider router={appRoutes} />
      </InterviewProvide>
    </AuthProvider>
  );
}

export default App;
