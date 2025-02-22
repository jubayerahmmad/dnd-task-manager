import { onAuthStateChanged } from "firebase/auth";
import { useEffect, useState } from "react";
import { Navigate, Route, Routes } from "react-router";
import Login from "./components/Login";
import { auth } from "./firebase.config";
import TasksPage from "./components/Tasks/TasksPage";
import UpdateTask from "./components/Tasks/UpdateTask";

function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      // console.log(user);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);
  if (loading)
    return (
      <p className="flex justify-center items-center min-h-screen text-white text-5xl font-bold">
        Loading...
      </p>
    );
  return (
    <Routes>
      <Route path="/" element={user ? <Navigate to="/tasks" /> : <Login />} />
      <Route
        path="/tasks"
        element={user ? <TasksPage user={user} /> : <Navigate to="/" />}
      />
      <Route
        path="/update-task/:id"
        element={user ? <UpdateTask /> : <Navigate to="/" />}
      />
    </Routes>
  );
}
export default App;
