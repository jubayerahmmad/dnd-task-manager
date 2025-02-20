import { onAuthStateChanged } from "firebase/auth";
import { useEffect, useState } from "react";
import { Navigate, Route, Routes } from "react-router";
import Login from "./components/Login";
import TasksPage from "./components/TasksPage";
import { auth } from "./firebase.config";

function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);
  if (loading) return <p>Loading...</p>;
  return (
    <Routes>
      <Route path="/" element={user ? <Navigate to="/tasks" /> : <Login />} />
      <Route
        path="/tasks"
        element={user ? <TasksPage /> : <Navigate to="/" />}
      />
    </Routes>
  );
}

export default App;
