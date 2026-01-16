// // export default function Home() {
// //   return (
// //     <main className="p-4">
// //       <h1 className="text-2xl font-bold">Phase II Todo Full Stack Web Application</h1>
// //       <p>Welcome! Start by logging in or creating tasks.</p>
// //     </main>
// //   )
// // }














"use client";

import { useState, useEffect, FormEvent } from "react";

type Task = {
  id: number;
  title: string;
  completed: boolean;
};

export default function Home() {
  const [isSignup, setIsSignup] = useState(false);
  const [user, setUser] = useState<{ name: string; email: string } | null>(null);
  const [formData, setFormData] = useState({ name: "", email: "", password: "" });
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTask, setNewTask] = useState("");
  const [currentMenu, setCurrentMenu] = useState<number | null>(null);
  const [updateTaskId, setUpdateTaskId] = useState<number | null>(null);
  const [updateTaskTitle, setUpdateTaskTitle] = useState("");

  useEffect(() => {
    if (user) {
      const savedTasks = JSON.parse(localStorage.getItem(`tasks_${user.email}`) || "[]");
      setTasks(savedTasks);
    }
  }, [user]);

  // Form handlers
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const handleSignup = (e: FormEvent) => {
    e.preventDefault();
    const { name, email, password } = formData;
    localStorage.setItem("user", JSON.stringify({ name, email, password }));
    alert("Sign Up successful! Please Sign In.");
    setIsSignup(false);
    setFormData({ name: "", email: "", password: "" });
  };
  const handleSignin = (e: FormEvent) => {
    e.preventDefault();
    const savedUser = JSON.parse(localStorage.getItem("user") || "null");
    if (savedUser && savedUser.email === formData.email && savedUser.password === formData.password) {
      setUser({ name: savedUser.name, email: savedUser.email });
      setFormData({ name: "", email: "", password: "" });
    } else {
      alert("Invalid email or password!");
    }
  };
  const handleLogout = () => {
    setUser(null);
    setTasks([]);
    setCurrentMenu(null);
  };

  // Task actions
  const addTask = (e: FormEvent) => {
    e.preventDefault();
    if (!newTask.trim()) return;
    const task: Task = { id: Date.now(), title: newTask.trim(), completed: false };
    const updatedTasks = [...tasks, task];
    setTasks(updatedTasks);
    localStorage.setItem(`tasks_${user!.email}`, JSON.stringify(updatedTasks));
    setNewTask("");
  };
  const updateTask = (e: FormEvent) => {
    e.preventDefault();
    if (updateTaskId === null) return;
    const updatedTasks = tasks.map((t) =>
      t.id === updateTaskId ? { ...t, title: updateTaskTitle } : t
    );
    setTasks(updatedTasks);
    localStorage.setItem(`tasks_${user!.email}`, JSON.stringify(updatedTasks));
    setUpdateTaskId(null);
    setUpdateTaskTitle("");
    setCurrentMenu(null);
  };
  const deleteTask = (id: number) => {
    const updatedTasks = tasks.filter((t) => t.id !== id);
    setTasks(updatedTasks);
    localStorage.setItem(`tasks_${user!.email}`, JSON.stringify(updatedTasks));
  };
  const toggleComplete = (id: number) => {
    const updatedTasks = tasks.map((t) =>
      t.id === id ? { ...t, completed: !t.completed } : t
    );
    setTasks(updatedTasks);
    localStorage.setItem(`tasks_${user!.email}`, JSON.stringify(updatedTasks));
  };

  // Navbar & Footer
  const Navbar = () => (
    <nav className="w-full bg-gradient-to-r from-purple-600 to-pink-500 text-white p-5 shadow-xl sticky top-0 z-50">
      <h1 className="text-2xl font-bold text-center">Phase II Todo Full Stack Web Application</h1>
    </nav>
  );
  const Footer = () => (
    <footer className="w-full bg-gradient-to-r from-purple-600 to-pink-500 text-white p-4 mt-6 text-center">
      <p>© 2026 Muhammad Khateeb Ejaz</p>
    </footer>
  );

  // Dashboard menu buttons
  const DashboardMenu = () => (
    <div className="flex flex-col gap-3 mb-6">
      {[ 
        {id:1,label:"Add Task",color:"blue"},
        {id:2,label:"List Tasks",color:"indigo"},
        {id:3,label:"Update Task",color:"yellow"},
        {id:4,label:"Delete Task",color:"red"},
        {id:5,label:"Mark Task Completed",color:"green"},
      ].map((btn)=>(
        <button
          key={btn.id}
          onClick={()=>setCurrentMenu(btn.id)}
          className={`bg-${btn.color}-500 hover:bg-${btn.color}-600 text-white px-4 py-2 rounded-full font-medium transition`}
        >
          {btn.id}. {btn.label}
        </button>
      ))}
      <button
        onClick={handleLogout}
        className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-full font-medium transition"
      >
        6. Exit
      </button>
    </div>
  );

  // Menu actions with badges & animations
  const renderMenuAction = () => {
    switch (currentMenu) {
      case 1:
        return (
          <form onSubmit={addTask} className="flex gap-2 mb-4 animate-fade-in">
            <input
              type="text"
              placeholder="Enter new task..."
              value={newTask}
              onChange={(e) => setNewTask(e.target.value)}
              className="flex-1 px-4 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-full font-semibold transition transform hover:scale-105"
            >
              Add
            </button>
          </form>
        );
      case 2:
        return (
          <ul className="space-y-2 max-h-60 overflow-y-auto mb-4 animate-fade-in">
            {tasks.length===0 && <p className="text-gray-400 text-center">No tasks yet!</p>}
            {tasks.map((t)=>(
              <li key={t.id} className="flex justify-between items-center bg-gray-100 px-4 py-2 rounded-xl shadow-sm transition transform hover:scale-105">
                <span>{t.title}</span>
                <span className={`px-2 py-1 rounded-full text-white text-sm font-semibold ${t.completed?"bg-green-500":"bg-yellow-500"}`}>
                  {t.completed?"Completed":"Pending"}
                </span>
              </li>
            ))}
          </ul>
        );
      case 3:
        return (
          <form onSubmit={updateTask} className="flex gap-2 mb-4 animate-fade-in">
            <select
              className="flex-1 px-4 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-yellow-400"
              value={updateTaskId ?? ""}
              onChange={(e) => setUpdateTaskId(Number(e.target.value))}
              required
            >
              <option value="">Select Task</option>
              {tasks.map((t)=><option key={t.id} value={t.id}>{t.title}</option>)}
            </select>
            <input
              type="text"
              placeholder="New title"
              value={updateTaskTitle}
              onChange={(e) => setUpdateTaskTitle(e.target.value)}
              className="flex-1 px-4 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-yellow-400"
              required
            />
            <button
              type="submit"
              className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded-full font-semibold transition transform hover:scale-105"
            >
              Update
            </button>
          </form>
        );
      case 4:
        return (
          <ul className="space-y-2 mb-4 animate-fade-in">
            {tasks.length===0 && <p className="text-gray-400 text-center">No tasks to delete!</p>}
            {tasks.map((t)=>(
              <li key={t.id} className="flex justify-between items-center bg-gray-100 px-4 py-2 rounded-xl shadow-sm transition transform hover:scale-105">
                <span>{t.title}</span>
                <button onClick={()=>deleteTask(t.id)} className="text-red-500 font-bold hover:text-red-700">Delete</button>
              </li>
            ))}
          </ul>
        );
      case 5:
        return (
          <ul className="space-y-2 mb-4 animate-fade-in">
            {tasks.length===0 && <p className="text-gray-400 text-center">No tasks yet!</p>}
            {tasks.map((t)=>(
              <li key={t.id} className="flex justify-between items-center bg-gray-100 px-4 py-2 rounded-xl shadow-sm transition transform hover:scale-105">
                <span className={t.completed?"line-through text-gray-400":""}>{t.title}</span>
                <button onClick={()=>toggleComplete(t.id)} className="text-green-500 font-bold hover:text-green-700">
                  Toggle
                </button>
              </li>
            ))}
          </ul>
        );
      default: return null;
    }
  };

  if(user){
    return (
      <>
        <Navbar />
        <main className="flex flex-col items-center justify-start min-h-screen bg-gradient-to-tr from-green-200 to-blue-200 p-4 animate-gradient">
          <div className="bg-white p-10 rounded-3xl shadow-2xl w-full max-w-md transform hover:scale-105 transition duration-500">
            <h2 className="text-3xl font-bold mb-4 text-green-600">Welcome, {user.name}!</h2>
            <DashboardMenu />
            {renderMenuAction()}
            <button
              onClick={handleLogout}
              className="mt-6 bg-red-500 hover:bg-red-600 text-white px-6 py-2 rounded-full font-semibold shadow-md transition"
            >
              Logout
            </button>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Navbar />
      <main className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-tr from-purple-300 to-pink-200 p-4 animate-gradient">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-extrabold text-gray-800 mb-2">Muhammad Khateeb Ejaz</h2>
          <p className="text-lg text-gray-600">Phase II Todo Full Stack Web Application</p>
        </div>
        <div className="bg-white rounded-3xl shadow-2xl w-full max-w-md overflow-hidden transform hover:scale-105 transition duration-500">
          <div className="p-10 text-center">
            <h2 className="text-3xl font-bold text-purple-700 mb-6">
              {isSignup ? "Create Account" : "Welcome Back"}
            </h2>
            <form onSubmit={isSignup ? handleSignup : handleSignin} className="flex flex-col space-y-5">
              {isSignup && (
                <input type="text" name="name" placeholder="Name" value={formData.name} onChange={handleChange} required
                  className="px-5 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-400 shadow-sm" />
              )}
              <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} required
                className="px-5 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-400 shadow-sm" />
              <input type="password" name="password" placeholder="Password" value={formData.password} onChange={handleChange} required
                className="px-5 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-400 shadow-sm" />
              <button type="submit" className="bg-purple-600 hover:bg-purple-700 text-white px-5 py-3 rounded-full font-semibold shadow-md transition">
                {isSignup ? "Sign Up" : "Sign In"}
              </button>
            </form>
            <p className="mt-5 text-gray-500">
              {isSignup ? "Already have an account?" : "Don't have an account?"}{" "}
              <span className="text-purple-600 font-bold cursor-pointer hover:underline" onClick={()=>setIsSignup(!isSignup)}>
                {isSignup ? "Sign In" : "Sign Up"}
              </span>
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
