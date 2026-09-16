"use client";

import { useEffect, useState, FormEvent } from "react";
import Chatbot from "./components/bot/Chatbot";

type Task = {
  id: number;
  title: string;
  completed: boolean;
};

export default function Home() {
  const [isSignup, setIsSignup] = useState(false);
  const [user, setUser] = useState<{ name: string; email: string } | null>(
    null
  );

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTask, setNewTask] = useState("");
  const [currentMenu, setCurrentMenu] = useState<number | null>(null);
  const [updateTaskId, setUpdateTaskId] = useState<number | null>(null);
  const [updateTaskTitle, setUpdateTaskTitle] = useState("");

  useEffect(() => {
    if (user) {
      const savedTasks = JSON.parse(
        localStorage.getItem(`tasks_${user.email}`) || "[]"
      );
      setTasks(savedTasks);
    }
  }, [user]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSignup = (e: FormEvent) => {
    e.preventDefault();

    const { name, email, password } = formData;

    localStorage.setItem(
      "user",
      JSON.stringify({
        name,
        email,
        password,
      })
    );

    alert("Sign Up successful! Please Sign In.");

    setIsSignup(false);
    setFormData({
      name: "",
      email: "",
      password: "",
    });
  };

  const handleSignin = (e: FormEvent) => {
    e.preventDefault();

    const savedUser = JSON.parse(
      localStorage.getItem("user") || "null"
    );

    if (
      savedUser &&
      savedUser.email === formData.email &&
      savedUser.password === formData.password
    ) {
      setUser({
        name: savedUser.name,
        email: savedUser.email,
      });

      setFormData({
        name: "",
        email: "",
        password: "",
      });
    } else {
      alert("Invalid email or password!");
    }
  };

  const handleLogout = () => {
    setUser(null);
    setTasks([]);
    setCurrentMenu(null);
  };

  const saveTasks = (updatedTasks: Task[]) => {
    setTasks(updatedTasks);

    if (user) {
      localStorage.setItem(
        `tasks_${user.email}`,
        JSON.stringify(updatedTasks)
      );
    }
  };

  const addTask = (e: FormEvent) => {
    e.preventDefault();

    if (!newTask.trim()) return;

    const task: Task = {
      id: Date.now(),
      title: newTask.trim(),
      completed: false,
    };

    saveTasks([...tasks, task]);
    setNewTask("");
  };

  const updateTask = (e: FormEvent) => {
    e.preventDefault();

    if (updateTaskId === null || !updateTaskTitle.trim()) return;

    const updatedTasks = tasks.map((task) =>
      task.id === updateTaskId
        ? {
            ...task,
            title: updateTaskTitle.trim(),
          }
        : task
    );

    saveTasks(updatedTasks);

    setUpdateTaskId(null);
    setUpdateTaskTitle("");
    setCurrentMenu(null);
  };

  const deleteTask = (id: number) => {
    const updatedTasks = tasks.filter((task) => task.id !== id);
    saveTasks(updatedTasks);
  };

  const toggleComplete = (id: number) => {
    const updatedTasks = tasks.map((task) =>
      task.id === id
        ? {
            ...task,
            completed: !task.completed,
          }
        : task
    );

    saveTasks(updatedTasks);
  };

  const totalTasks = tasks.length;
  const completedTasks = tasks.filter((task) => task.completed).length;
  const pendingTasks = tasks.filter((task) => !task.completed).length;

  /* =========================
     LOGIN / SIGNUP SCREEN
  ========================= */

  if (!user) {
    return (
      <main className="relative min-h-screen overflow-hidden bg-slate-950 text-white">
        {/* Animated background */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -left-32 -top-32 h-96 w-96 rounded-full bg-violet-600/30 blur-3xl animate-pulse" />
          <div className="absolute -right-32 top-20 h-96 w-96 rounded-full bg-fuchsia-600/25 blur-3xl animate-pulse" />
          <div className="absolute bottom-0 left-1/3 h-96 w-96 rounded-full bg-blue-600/20 blur-3xl animate-pulse" />
        </div>

        {/* Navbar */}
        <nav className="relative z-10 flex items-center justify-between border-b border-white/10 bg-black/20 px-6 py-5 backdrop-blur-xl md:px-12">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-violet-500 to-fuchsia-500 text-xl font-black shadow-lg shadow-violet-500/30">
              ✓
            </div>

            <div>
              <h1 className="text-lg font-bold tracking-tight">
                Todo<span className="text-violet-400">AI</span>
              </h1>
              <p className="text-xs text-slate-400">
                Smart Productivity Workspace
              </p>
            </div>
          </div>

          <div className="hidden rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs text-slate-300 backdrop-blur-md sm:block">
            AI Powered
          </div>
        </nav>

        {/* Login content */}
        <section className="relative z-10 flex min-h-[calc(100vh-80px)] items-center justify-center px-5 py-10">
          <div className="grid w-full max-w-6xl items-center gap-12 lg:grid-cols-2">
            {/* Left side */}
            <div className="hidden lg:block">
              <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-violet-400/20 bg-violet-400/10 px-4 py-2 text-sm text-violet-300">
                ✨ Modern AI Todo Workspace
              </div>

              <h2 className="max-w-xl text-5xl font-black leading-tight tracking-tight xl:text-6xl">
                Your Tasks.
                <br />
                <span className="bg-gradient-to-r from-violet-400 via-fuchsia-400 to-pink-400 bg-clip-text text-transparent">
                  Your Focus.
                </span>
                <br />
                Your Progress.
              </h2>

              <p className="mt-6 max-w-lg text-lg leading-8 text-slate-400">
                Organize your daily work, manage your tasks, and stay focused
                with a clean AI-powered productivity experience.
              </p>

              <div className="mt-8 grid max-w-lg grid-cols-3 gap-3">
                <div className="rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur-xl">
                  <div className="text-2xl">✓</div>
                  <p className="mt-2 text-sm font-semibold">Easy Tasks</p>
                </div>

                <div className="rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur-xl">
                  <div className="text-2xl">⚡</div>
                  <p className="mt-2 text-sm font-semibold">Fast</p>
                </div>

                <div className="rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur-xl">
                  <div className="text-2xl">🤖</div>
                  <p className="mt-2 text-sm font-semibold">AI Ready</p>
                </div>
              </div>
            </div>

            {/* Auth card */}
            <div className="mx-auto w-full max-w-md">
              <div className="rounded-[2rem] border border-white/10 bg-white/[0.07] p-2 shadow-2xl shadow-black/40 backdrop-blur-2xl">
                <div className="rounded-[1.6rem] border border-white/10 bg-slate-900/80 p-7 sm:p-9">
                  <div className="mb-8 text-center">
                    <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-violet-500 to-fuchsia-500 text-2xl font-black shadow-xl shadow-violet-500/30">
                      {isSignup ? "+" : "✓"}
                    </div>

                    <h3 className="text-3xl font-bold">
                      {isSignup ? "Create Account" : "Welcome Back"}
                    </h3>

                    <p className="mt-2 text-sm text-slate-400">
                      {isSignup
                        ? "Start managing your tasks smarter."
                        : "Sign in to continue to your workspace."}
                    </p>
                  </div>

                  <form
                    onSubmit={isSignup ? handleSignup : handleSignin}
                    className="space-y-4"
                  >
                    {isSignup && (
                      <div>
                        <label className="mb-2 block text-sm font-medium text-slate-300">
                          Full Name
                        </label>

                        <input
                          type="text"
                          name="name"
                          placeholder="Muhammad Khateeb Ejaz"
                          value={formData.name}
                          onChange={handleChange}
                          required
                          className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3.5 text-white outline-none transition placeholder:text-slate-500 focus:border-violet-400 focus:bg-white/10 focus:ring-4 focus:ring-violet-500/10"
                        />
                      </div>
                    )}

                    <div>
                      <label className="mb-2 block text-sm font-medium text-slate-300">
                        Email Address
                      </label>

                      <input
                        type="email"
                        name="email"
                        placeholder="you@example.com"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3.5 text-white outline-none transition placeholder:text-slate-500 focus:border-violet-400 focus:bg-white/10 focus:ring-4 focus:ring-violet-500/10"
                      />
                    </div>

                    <div>
                      <label className="mb-2 block text-sm font-medium text-slate-300">
                        Password
                      </label>

                      <input
                        type="password"
                        name="password"
                        placeholder="••••••••"
                        value={formData.password}
                        onChange={handleChange}
                        required
                        className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3.5 text-white outline-none transition placeholder:text-slate-500 focus:border-violet-400 focus:bg-white/10 focus:ring-4 focus:ring-violet-500/10"
                      />
                    </div>

                    <button
                      type="submit"
                      className="group relative mt-3 w-full overflow-hidden rounded-xl bg-gradient-to-r from-violet-600 to-fuchsia-600 px-5 py-3.5 font-bold shadow-xl shadow-violet-600/20 transition duration-300 hover:-translate-y-0.5 hover:shadow-violet-600/40"
                    >
                      <span className="relative z-10">
                        {isSignup ? "Create My Account →" : "Sign In →"}
                      </span>

                      <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent transition duration-700 group-hover:translate-x-full" />
                    </button>
                  </form>

                  <div className="my-6 flex items-center gap-3">
                    <div className="h-px flex-1 bg-white/10" />
                    <span className="text-xs text-slate-500">OR</span>
                    <div className="h-px flex-1 bg-white/10" />
                  </div>

                  <p className="text-center text-sm text-slate-400">
                    {isSignup
                      ? "Already have an account?"
                      : "Don't have an account?"}{" "}
                    <button
                      type="button"
                      onClick={() => setIsSignup(!isSignup)}
                      className="font-bold text-violet-400 transition hover:text-fuchsia-400"
                    >
                      {isSignup ? "Sign In" : "Sign Up"}
                    </button>
                  </p>
                </div>
              </div>

              <p className="mt-6 text-center text-xs text-slate-500">
                © 2026 Muhammad Khateeb Ejaz • Todo AI Workspace
              </p>
            </div>
          </div>
        </section>

        <Chatbot />
      </main>
    );
  }

  /* =========================
     DASHBOARD
  ========================= */

  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <div className="flex min-h-screen flex-col lg:flex-row">
        {/* Sidebar */}
        <aside className="w-full border-b border-white/10 bg-slate-900/80 backdrop-blur-xl lg:fixed lg:inset-y-0 lg:left-0 lg:flex lg:w-72 lg:flex-col lg:border-b-0 lg:border-r">
          <div className="flex items-center gap-3 border-b border-white/10 px-6 py-6">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-violet-500 to-fuchsia-500 text-xl font-black">
              ✓
            </div>

            <div>
              <h1 className="font-bold">
                Todo<span className="text-violet-400">AI</span>
              </h1>
              <p className="text-xs text-slate-500">Workspace</p>
            </div>
          </div>

          <div className="p-4">
            <p className="mb-3 px-3 text-xs font-bold uppercase tracking-widest text-slate-500">
              Workspace
            </p>

            <div className="space-y-2">
              <button
                onClick={() => setCurrentMenu(null)}
                className={`w-full rounded-xl px-4 py-3 text-left text-sm font-semibold transition ${
                  currentMenu === null
                    ? "bg-violet-600 text-white shadow-lg shadow-violet-600/20"
                    : "text-slate-400 hover:bg-white/5 hover:text-white"
                }`}
              >
                ◈ Overview
              </button>

              <button
                onClick={() => setCurrentMenu(1)}
                className={`w-full rounded-xl px-4 py-3 text-left text-sm font-semibold transition ${
                  currentMenu === 1
                    ? "bg-violet-600 text-white"
                    : "text-slate-400 hover:bg-white/5 hover:text-white"
                }`}
              >
                ＋ Add Task
              </button>

              <button
                onClick={() => setCurrentMenu(2)}
                className={`w-full rounded-xl px-4 py-3 text-left text-sm font-semibold transition ${
                  currentMenu === 2
                    ? "bg-violet-600 text-white"
                    : "text-slate-400 hover:bg-white/5 hover:text-white"
                }`}
              >
                ☷ All Tasks
              </button>

              <button
                onClick={() => setCurrentMenu(3)}
                className={`w-full rounded-xl px-4 py-3 text-left text-sm font-semibold transition ${
                  currentMenu === 3
                    ? "bg-violet-600 text-white"
                    : "text-slate-400 hover:bg-white/5 hover:text-white"
                }`}
              >
                ✎ Update Task
              </button>

              <button
                onClick={() => setCurrentMenu(4)}
                className={`w-full rounded-xl px-4 py-3 text-left text-sm font-semibold transition ${
                  currentMenu === 4
                    ? "bg-violet-600 text-white"
                    : "text-slate-400 hover:bg-white/5 hover:text-white"
                }`}
              >
                ⌫ Delete Task
              </button>

              <button
                onClick={() => setCurrentMenu(5)}
                className={`w-full rounded-xl px-4 py-3 text-left text-sm font-semibold transition ${
                  currentMenu === 5
                    ? "bg-violet-600 text-white"
                    : "text-slate-400 hover:bg-white/5 hover:text-white"
                }`}
              >
                ✓ Complete Tasks
              </button>
            </div>
          </div>

          <div className="mt-auto hidden border-t border-white/10 p-4 lg:block">
            <div className="mb-3 rounded-2xl bg-white/5 p-4">
              <p className="text-xs text-slate-500">Signed in as</p>
              <p className="mt-1 truncate font-semibold">{user.name}</p>
              <p className="truncate text-xs text-slate-500">{user.email}</p>
            </div>

            <button
              onClick={handleLogout}
              className="w-full rounded-xl border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm font-semibold text-red-400 transition hover:bg-red-500/20"
            >
              ↪ Logout
            </button>
          </div>
        </aside>

        {/* Main content */}
        <section className="w-full lg:ml-72">
          {/* Topbar */}
          <header className="sticky top-0 z-20 flex items-center justify-between border-b border-white/10 bg-slate-950/80 px-5 py-4 backdrop-blur-xl md:px-8">
            <div>
              <p className="text-xs font-medium text-violet-400">
                PRODUCTIVITY DASHBOARD
              </p>
              <h2 className="mt-1 text-xl font-bold md:text-2xl">
                Welcome back, {user.name} 👋
              </h2>
            </div>

            <button
              onClick={handleLogout}
              className="rounded-xl border border-red-500/20 bg-red-500/10 px-4 py-2 text-sm font-semibold text-red-400 transition hover:bg-red-500/20 lg:hidden"
            >
              Logout
            </button>
          </header>

          <div className="p-5 md:p-8">
            {/* Hero */}
            <div className="relative mb-8 overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-violet-600/20 via-fuchsia-600/10 to-blue-600/10 p-6 md:p-8">
              <div className="absolute -right-20 -top-20 h-60 w-60 rounded-full bg-violet-500/20 blur-3xl" />

              <div className="relative">
                <p className="mb-2 text-sm font-medium text-violet-300">
                  YOUR PRODUCTIVITY SPACE
                </p>

                <h3 className="text-3xl font-black md:text-4xl">
                  Stay focused.
                  <br />
                  Get things done.
                </h3>

                <p className="mt-3 max-w-xl text-sm leading-6 text-slate-400">
                  Manage your tasks from one beautiful workspace and keep your
                  daily progress organized.
                </p>

                <button
                  onClick={() => setCurrentMenu(1)}
                  className="mt-5 rounded-xl bg-white px-5 py-3 text-sm font-bold text-slate-950 transition hover:-translate-y-0.5 hover:bg-violet-100"
                >
                  ＋ Create New Task
                </button>
              </div>
            </div>

            {/* Stats */}
            <div className="mb-8 grid gap-4 sm:grid-cols-3">
              <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-5 transition hover:-translate-y-1 hover:bg-white/[0.07]">
                <div className="mb-4 flex items-center justify-between">
                  <span className="text-sm text-slate-400">Total Tasks</span>
                  <span className="rounded-xl bg-violet-500/10 px-3 py-2 text-violet-400">
                    ☷
                  </span>
                </div>
                <p className="text-3xl font-black">{totalTasks}</p>
              </div>

              <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-5 transition hover:-translate-y-1 hover:bg-white/[0.07]">
                <div className="mb-4 flex items-center justify-between">
                  <span className="text-sm text-slate-400">Completed</span>
                  <span className="rounded-xl bg-emerald-500/10 px-3 py-2 text-emerald-400">
                    ✓
                  </span>
                </div>
                <p className="text-3xl font-black text-emerald-400">
                  {completedTasks}
                </p>
              </div>

              <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-5 transition hover:-translate-y-1 hover:bg-white/[0.07]">
                <div className="mb-4 flex items-center justify-between">
                  <span className="text-sm text-slate-400">Pending</span>
                  <span className="rounded-xl bg-amber-500/10 px-3 py-2 text-amber-400">
                    ◷
                  </span>
                </div>
                <p className="text-3xl font-black text-amber-400">
                  {pendingTasks}
                </p>
              </div>
            </div>

            {/* Action area */}
            <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-5 md:p-7">
              {currentMenu === null && (
                <div>
                  <div className="mb-6 flex items-center justify-between">
                    <div>
                      <h3 className="text-xl font-bold">Recent Tasks</h3>
                      <p className="mt-1 text-sm text-slate-500">
                        Your latest productivity activity
                      </p>
                    </div>

                    <button
                      onClick={() => setCurrentMenu(2)}
                      className="text-sm font-semibold text-violet-400 hover:text-violet-300"
                    >
                      View All →
                    </button>
                  </div>

                  {tasks.length === 0 ? (
                    <div className="rounded-2xl border border-dashed border-white/10 py-14 text-center">
                      <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-violet-500/10 text-2xl">
                        ✓
                      </div>

                      <h4 className="font-bold">No tasks yet</h4>

                      <p className="mt-2 text-sm text-slate-500">
                        Create your first task and start being productive.
                      </p>
                    </div>
                  ) : (
                    <div className="space-y-3">
                      {tasks.slice(-5).reverse().map((task) => (
                        <div
                          key={task.id}
                          className="flex items-center justify-between gap-4 rounded-2xl border border-white/10 bg-slate-900/70 p-4 transition hover:border-violet-500/30 hover:bg-slate-900"
                        >
                          <div className="flex min-w-0 items-center gap-3">
                            <button
                              onClick={() => toggleComplete(task.id)}
                              className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border transition ${
                                task.completed
                                  ? "border-emerald-400/30 bg-emerald-400/10 text-emerald-400"
                                  : "border-white/10 bg-white/5 text-slate-500 hover:border-violet-400/30"
                              }`}
                            >
                              {task.completed ? "✓" : ""}
                            </button>

                            <div className="min-w-0">
                              <p
                                className={`truncate font-semibold ${
                                  task.completed
                                    ? "text-slate-500 line-through"
                                    : "text-white"
                                }`}
                              >
                                {task.title}
                              </p>

                              <p className="mt-1 text-xs text-slate-600">
                                Todo item
                              </p>
                            </div>
                          </div>

                          <span
                            className={`shrink-0 rounded-full px-3 py-1 text-xs font-bold ${
                              task.completed
                                ? "bg-emerald-500/10 text-emerald-400"
                                : "bg-amber-500/10 text-amber-400"
                            }`}
                          >
                            {task.completed ? "Completed" : "Pending"}
                          </span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {/* Add */}
              {currentMenu === 1 && (
                <div>
                  <h3 className="text-2xl font-bold">Create New Task</h3>
                  <p className="mt-1 text-sm text-slate-500">
                    Add something you want to accomplish.
                  </p>

                  <form onSubmit={addTask} className="mt-6 flex flex-col gap-3 sm:flex-row">
                    <input
                      type="text"
                      placeholder="What do you need to do?"
                      value={newTask}
                      onChange={(e) => setNewTask(e.target.value)}
                      className="flex-1 rounded-xl border border-white/10 bg-slate-900 px-4 py-3.5 text-white outline-none placeholder:text-slate-600 focus:border-violet-500"
                    />

                    <button
                      type="submit"
                      className="rounded-xl bg-violet-600 px-6 py-3.5 font-bold transition hover:bg-violet-500"
                    >
                      Add Task
                    </button>
                  </form>
                </div>
              )}

              {/* List */}
              {currentMenu === 2 && (
                <div>
                  <div className="mb-6">
                    <h3 className="text-2xl font-bold">All Tasks</h3>
                    <p className="mt-1 text-sm text-slate-500">
                      Manage everything in your workspace.
                    </p>
                  </div>

                  {tasks.length === 0 ? (
                    <p className="py-10 text-center text-slate-500">
                      No tasks yet.
                    </p>
                  ) : (
                    <div className="space-y-3">
                      {tasks.map((task) => (
                        <div
                          key={task.id}
                          className="flex flex-col gap-3 rounded-2xl border border-white/10 bg-slate-900 p-4 sm:flex-row sm:items-center sm:justify-between"
                        >
                          <div className="flex items-center gap-3">
                            <button
                              onClick={() => toggleComplete(task.id)}
                              className={`flex h-9 w-9 items-center justify-center rounded-xl border ${
                                task.completed
                                  ? "border-emerald-500/30 bg-emerald-500/10 text-emerald-400"
                                  : "border-white/10 bg-white/5"
                              }`}
                            >
                              {task.completed ? "✓" : ""}
                            </button>

                            <span
                              className={
                                task.completed
                                  ? "text-slate-500 line-through"
                                  : "font-medium"
                              }
                            >
                              {task.title}
                            </span>
                          </div>

                          <span
                            className={`w-fit rounded-full px-3 py-1 text-xs font-bold ${
                              task.completed
                                ? "bg-emerald-500/10 text-emerald-400"
                                : "bg-amber-500/10 text-amber-400"
                            }`}
                          >
                            {task.completed ? "Completed" : "Pending"}
                          </span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {/* Update */}
              {currentMenu === 3 && (
                <div>
                  <h3 className="text-2xl font-bold">Update Task</h3>
                  <p className="mt-1 text-sm text-slate-500">
                    Select a task and change its title.
                  </p>

                  {tasks.length === 0 ? (
                    <p className="py-10 text-center text-slate-500">
                      No tasks available.
                    </p>
                  ) : (
                    <form onSubmit={updateTask} className="mt-6 space-y-4">
                      <select
                        value={updateTaskId ?? ""}
                        onChange={(e) =>
                          setUpdateTaskId(
                            e.target.value ? Number(e.target.value) : null
                          )
                        }
                        required
                        className="w-full rounded-xl border border-white/10 bg-slate-900 px-4 py-3.5 text-white outline-none focus:border-violet-500"
                      >
                        <option value="">Select a task</option>

                        {tasks.map((task) => (
                          <option key={task.id} value={task.id}>
                            {task.title}
                          </option>
                        ))}
                      </select>

                      <input
                        type="text"
                        placeholder="Enter new task title"
                        value={updateTaskTitle}
                        onChange={(e) =>
                          setUpdateTaskTitle(e.target.value)
                        }
                        required
                        className="w-full rounded-xl border border-white/10 bg-slate-900 px-4 py-3.5 text-white outline-none placeholder:text-slate-600 focus:border-violet-500"
                      />

                      <button
                        type="submit"
                        className="rounded-xl bg-violet-600 px-6 py-3.5 font-bold transition hover:bg-violet-500"
                      >
                        Update Task
                      </button>
                    </form>
                  )}
                </div>
              )}

              {/* Delete */}
              {currentMenu === 4 && (
                <div>
                  <h3 className="text-2xl font-bold">Delete Task</h3>
                  <p className="mt-1 text-sm text-slate-500">
                    Remove tasks you no longer need.
                  </p>

                  <div className="mt-6 space-y-3">
                    {tasks.length === 0 ? (
                      <p className="py-10 text-center text-slate-500">
                        No tasks available.
                      </p>
                    ) : (
                      tasks.map((task) => (
                        <div
                          key={task.id}
                          className="flex items-center justify-between gap-4 rounded-2xl border border-white/10 bg-slate-900 p-4"
                        >
                          <span className="truncate">{task.title}</span>

                          <button
                            onClick={() => deleteTask(task.id)}
                            className="shrink-0 rounded-xl bg-red-500/10 px-4 py-2 text-sm font-bold text-red-400 transition hover:bg-red-500/20"
                          >
                            Delete
                          </button>
                        </div>
                      ))
                    )}
                  </div>
                </div>
              )}

              {/* Complete */}
              {currentMenu === 5 && (
                <div>
                  <h3 className="text-2xl font-bold">Complete Tasks</h3>
                  <p className="mt-1 text-sm text-slate-500">
                    Mark tasks as completed or move them back to pending.
                  </p>

                  <div className="mt-6 space-y-3">
                    {tasks.length === 0 ? (
                      <p className="py-10 text-center text-slate-500">
                        No tasks available.
                      </p>
                    ) : (
                      tasks.map((task) => (
                        <div
                          key={task.id}
                          className="flex items-center justify-between gap-4 rounded-2xl border border-white/10 bg-slate-900 p-4"
                        >
                          <span
                            className={
                              task.completed
                                ? "truncate text-slate-500 line-through"
                                : "truncate"
                            }
                          >
                            {task.title}
                          </span>

                          <button
                            onClick={() => toggleComplete(task.id)}
                            className={`shrink-0 rounded-xl px-4 py-2 text-sm font-bold transition ${
                              task.completed
                                ? "bg-amber-500/10 text-amber-400 hover:bg-amber-500/20"
                                : "bg-emerald-500/10 text-emerald-400 hover:bg-emerald-500/20"
                            }`}
                          >
                            {task.completed ? "Mark Pending" : "Complete"}
                          </button>
                        </div>
                      ))
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* Footer */}
            <footer className="mt-8 border-t border-white/10 py-6 text-center text-xs text-slate-600">
              © 2026 Muhammad Khateeb Ejaz • Todo AI Full Stack Web Application
            </footer>
          </div>
        </section>
      </div>

      <Chatbot />
    </main>
  );
}
