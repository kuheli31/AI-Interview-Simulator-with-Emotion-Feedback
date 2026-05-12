AI-Interviewer/

├── backend/

│   ├── config/

│   │   ├── CorsConfig.java

│   │   └── SecurityConfig.java

│   │

│   ├── controller/

│   │   └── AuthController.java

│   │

│   ├── dto/

│   │   ├── AuthResponse.java

│   │   ├── LoginRequest.java

│   │   └── RegisterRequest.java

│   │

│   ├── entity/

│   │   └── User.java

│   │

│   ├── repository/

│   │   └── UserRepository.java

│   │

│   ├── security/

│   │   └── JwtService.java

│   │

│   └── service/

│       └── AuthService.java

│

├── frontend/

│   ├── src/

│   │   ├── pages/

│   │   │   ├── Dashboard.jsx

│   │   │   ├── History.jsx

│   │   │   ├── InterviewRoom.jsx

│   │   │   ├── InterviewSetup.jsx

│   │   │   ├── Login.jsx

│   │   │   ├── Register.jsx

│   │   │   └── Report.jsx

│   │   │

│   │   ├── components/

│   │   │   ├── Navbar.jsx

│   │   │   ├── ProtectedRoute.jsx

│   │   │   └── ScoreCard.jsx

│   │   │

│   │   ├── context/

│   │   │   └── AuthContext.jsx

│   │   │

│   │   ├── services/

│   │   │   └── api.js

│   │   │

│   │   └── utils/

│   │

│   └── ...

│

└── ai/

&#x20;   ├── transcription.py

&#x20;   ├── emotion.py

&#x20;   ├── evaluation.py

&#x20;   └── app.py





# **Frontend:**



*main.jsx*->



import React from 'react';

import ReactDOM from 'react-dom/client';

import { BrowserRouter } from 'react-router-dom';

import App from './App';

import './index.css';

import { AuthProvider } from './context/AuthContext';



ReactDOM.createRoot(document.getElementById('root')).render(

&#x20; <React.StrictMode>

&#x20;   <BrowserRouter>

&#x20;     <AuthProvider>

&#x20;       <App />

&#x20;     </AuthProvider>

&#x20;   </BrowserRouter>

&#x20; </React.StrictMode>

);



*App.jsx*->



import { Routes, Route } from "react-router-dom";

import Login from "./pages/Login";

import Register from "./pages/Register";

import Dashboard from "./pages/Dashboard";

import InterviewSetup from "./pages/InterviewSetup";

import InterviewRoom from "./pages/InterviewRoom";

import Report from "./pages/Report";

import History from "./pages/History";

import ProtectedRoute from "./components/ProtectedRoute";



export default function App() {

&#x20; return (

&#x20;   <Routes>

&#x20;     <Route path="/" element={<Login />} />

&#x20;     <Route path="/register" element={<Register />} />



&#x20;     <Route element={<ProtectedRoute />}>

&#x20;       <Route path="/dashboard" element={<Dashboard />} />

&#x20;       <Route path="/setup" element={<InterviewSetup />} />

&#x20;       <Route path="/interview" element={<InterviewRoom />} />

&#x20;       <Route path="/report" element={<Report />} />

&#x20;       <Route path="/history" element={<History />} />

&#x20;     </Route>

&#x20;   </Routes>

&#x20; );

}



*Dashboard.jsx*->



import Navbar from '../components/Navbar';

import { Link } from 'react-router-dom';



export default function Dashboard() {

&#x20; return (

&#x20;   <div className="min-h-screen bg-slate-950 text-white">

&#x20;     <Navbar />

&#x20;     <div className="p-8 max-w-6xl mx-auto">

&#x20;       <h1 className="text-4xl font-bold mb-2">Welcome Clara 👋</h1>

&#x20;       <p className="text-gray-400 mb-8">Practice interviews and improve with AI feedback.</p>



&#x20;       <div className="grid md:grid-cols-3 gap-6">

&#x20;         <div className="p-6 rounded-3xl bg-white/5 border border-white/10">

&#x20;           <h3 className="text-xl font-semibold mb-2">Start Interview</h3>

&#x20;           <p className="text-gray-400 mb-4">Choose a role and begin.</p>

&#x20;           <Link to="/setup" className="inline-block px-4 py-2 bg-violet-600 rounded-lg">Start</Link>

&#x20;         </div>

&#x20;       </div>

&#x20;     </div>

&#x20;   </div>

&#x20; );

}



*History.jsx->*



import Navbar from '../components/Navbar';



export default function History() {

&#x20; return (

&#x20;   <div className="min-h-screen bg-slate-950 text-white">

&#x20;     <Navbar />

&#x20;     <div className="max-w-5xl mx-auto p-8">

&#x20;       <h1 className="text-4xl font-bold mb-6">Interview History</h1>

&#x20;       <div className="bg-white/5 border border-white/10 rounded-2xl p-6">

&#x20;         Previous interview attempts will appear here.

&#x20;       </div>

&#x20;     </div>

&#x20;   </div>

&#x20; );

}



*InterviewRoom.jsx ->*



import Navbar from '../components/Navbar';

import { useNavigate } from 'react-router-dom';



export default function InterviewRoom() {

&#x20; const navigate = useNavigate();



&#x20; return (

&#x20;   <div className="min-h-screen bg-slate-950 text-white">

&#x20;     <Navbar />

&#x20;     <div className="max-w-5xl mx-auto p-8">

&#x20;       <h1 className="text-3xl font-bold mb-4">Tell me about yourself.</h1>

&#x20;       <div className="aspect-video bg-slate-800 rounded-3xl mb-6 flex items-center justify-center text-gray-400">

&#x20;         Webcam Preview

&#x20;       </div>

&#x20;       <div className="flex gap-4">

&#x20;         <button className="px-6 py-3 bg-red-500 rounded-xl">Start Recording</button>

&#x20;         <button

&#x20;           onClick={() => navigate('/report')}

&#x20;           className="px-6 py-3 bg-emerald-600 rounded-xl"

&#x20;         >

&#x20;           Submit Answer

&#x20;         </button>

&#x20;       </div>

&#x20;     </div>

&#x20;   </div>

&#x20; );

}

*InterviewSetup.jsx ->*



import Navbar from '../components/Navbar';

import { useNavigate } from 'react-router-dom';





export default function InterviewSetup() {

&#x20; const navigate = useNavigate();



&#x20; return (

&#x20;   <div className="min-h-screen bg-slate-950 text-white">

&#x20;     <Navbar />

&#x20;     <div className="max-w-3xl mx-auto p-8">

&#x20;       <h1 className="text-3xl font-bold mb-6">Interview Setup</h1>

&#x20;       <select className="w-full p-4 rounded-xl bg-slate-800 mb-4">

&#x20;         <option>Software Engineer</option>

&#x20;         <option>Data Scientist</option>

&#x20;         <option>Frontend Developer</option>

&#x20;       </select>

&#x20;       <button

&#x20;         onClick={() => navigate('/interview')}

&#x20;         className="px-6 py-3 bg-violet-600 rounded-xl"

&#x20;       >

&#x20;         Start Interview

&#x20;       </button>

&#x20;     </div>

&#x20;   </div>

&#x20; );

}



*Login.jsx ->*



import { useState } from "react";

import { Link, useNavigate } from "react-router-dom";

import { motion } from "framer-motion";

import api from "../services/api";

import { useAuth } from "../context/AuthContext";



export default function Login() {

&#x20; const navigate = useNavigate();

&#x20; const { login } = useAuth();



&#x20; const \[form, setForm] = useState({

&#x20;   email: "",

&#x20;   password: "",

&#x20; });



&#x20; const \[loading, setLoading] = useState(false);

&#x20; const \[error, setError] = useState("");



&#x20; const handleChange = (e) => {

&#x20;   setForm({

&#x20;     ...form,

&#x20;     \[e.target.name]: e.target.value,

&#x20;   });

&#x20; };



&#x20; const handleSubmit = async (e) => {

&#x20;   e.preventDefault();

&#x20;   setError("");

&#x20;   setLoading(true);



&#x20;   try {

&#x20;     const response = await api.post("/auth/login", form);



&#x20;     const token = response.data.token;

&#x20;     login(token);



&#x20;     navigate("/dashboard");

&#x20;   } catch (err) {

&#x20;     setError(

&#x20;       err.response?.data?.message || "Invalid email or password"

&#x20;     );

&#x20;   } finally {

&#x20;     setLoading(false);

&#x20;   }

&#x20; };



&#x20; return (

&#x20;   <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-950 via-slate-900 to-violet-950">

&#x20;     <motion.form

&#x20;       initial={{ opacity: 0, y: 20 }}

&#x20;       animate={{ opacity: 1, y: 0 }}

&#x20;       onSubmit={handleSubmit}

&#x20;       className="w-full max-w-md p-8 rounded-3xl bg-white/10 backdrop-blur-xl border border-white/10"

&#x20;     >

&#x20;       <h1 className="text-3xl font-bold mb-6">Welcome Back</h1>



&#x20;       {error \&\& (

&#x20;         <p className="mb-4 text-red-400 text-sm">{error}</p>

&#x20;       )}



&#x20;       <input

&#x20;         name="email"

&#x20;         type="email"

&#x20;         placeholder="Email"

&#x20;         value={form.email}

&#x20;         onChange={handleChange}

&#x20;         className="w-full p-3 mb-4 rounded-xl bg-slate-800 outline-none"

&#x20;         required

&#x20;       />



&#x20;       <input

&#x20;         name="password"

&#x20;         type="password"

&#x20;         placeholder="Password"

&#x20;         value={form.password}

&#x20;         onChange={handleChange}

&#x20;         className="w-full p-3 mb-4 rounded-xl bg-slate-800 outline-none"

&#x20;         required

&#x20;       />



&#x20;       <button

&#x20;         type="submit"

&#x20;         disabled={loading}

&#x20;         className="w-full p-3 rounded-xl bg-violet-600 hover:bg-violet-700 transition"

&#x20;       >

&#x20;         {loading ? "Signing In..." : "Login"}

&#x20;       </button>



&#x20;       <p className="mt-4 text-center text-gray-400">

&#x20;         Don't have an account?{" "}

&#x20;         <Link to="/register" className="text-violet-400">

&#x20;           Register

&#x20;         </Link>

&#x20;       </p>

&#x20;     </motion.form>

&#x20;   </div>

&#x20; );

}



*Register.jsx->*



import { useState } from "react";

import { Link, useNavigate } from "react-router-dom";

import { motion } from "framer-motion";

import api from "../services/api";



export default function Register() {

&#x20; const navigate = useNavigate();



&#x20; const \[form, setForm] = useState({

&#x20;   name: "",

&#x20;   email: "",

&#x20;   password: "",

&#x20; });



&#x20; const \[loading, setLoading] = useState(false);

&#x20; const \[error, setError] = useState("");



&#x20; const handleChange = (e) => {

&#x20;   setForm({

&#x20;     ...form,

&#x20;     \[e.target.name]: e.target.value,

&#x20;   });

&#x20; };



&#x20; const handleSubmit = async (e) => {

&#x20;   e.preventDefault();

&#x20;   setError("");

&#x20;   setLoading(true);



&#x20;   try {

&#x20;     await api.post("/auth/register", form);

&#x20;     navigate("/");

&#x20;   } catch (err) {

&#x20;     setError(

&#x20;       err.response?.data?.message || "Registration failed"

&#x20;     );

&#x20;   } finally {

&#x20;     setLoading(false);

&#x20;   }

&#x20; };



&#x20; return (

&#x20;   <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-950 via-slate-900 to-violet-950">

&#x20;     <motion.form

&#x20;       initial={{ opacity: 0, y: 20 }}

&#x20;       animate={{ opacity: 1, y: 0 }}

&#x20;       onSubmit={handleSubmit}

&#x20;       className="w-full max-w-md p-8 rounded-3xl bg-white/10 backdrop-blur-xl border border-white/10"

&#x20;     >

&#x20;       <h1 className="text-3xl font-bold mb-6">Create Account</h1>



&#x20;       {error \&\& (

&#x20;         <p className="mb-4 text-red-400 text-sm">{error}</p>

&#x20;       )}



&#x20;       <input

&#x20;         name="name"

&#x20;         placeholder="Name"

&#x20;         value={form.name}

&#x20;         onChange={handleChange}

&#x20;         className="w-full p-3 mb-4 rounded-xl bg-slate-800 outline-none"

&#x20;         required

&#x20;       />



&#x20;       <input

&#x20;         name="email"

&#x20;         type="email"

&#x20;         placeholder="Email"

&#x20;         value={form.email}

&#x20;         onChange={handleChange}

&#x20;         className="w-full p-3 mb-4 rounded-xl bg-slate-800 outline-none"

&#x20;         required

&#x20;       />



&#x20;       <input

&#x20;         name="password"

&#x20;         type="password"

&#x20;         placeholder="Password"

&#x20;         value={form.password}

&#x20;         onChange={handleChange}

&#x20;         className="w-full p-3 mb-4 rounded-xl bg-slate-800 outline-none"

&#x20;         required

&#x20;       />



&#x20;       <button

&#x20;         type="submit"

&#x20;         disabled={loading}

&#x20;         className="w-full p-3 rounded-xl bg-violet-600 hover:bg-violet-700 transition"

&#x20;       >

&#x20;         {loading ? "Creating Account..." : "Register"}

&#x20;       </button>



&#x20;       <p className="mt-4 text-center text-gray-400">

&#x20;         Already have an account?{" "}

&#x20;         <Link to="/" className="text-violet-400">

&#x20;           Login

&#x20;         </Link>

&#x20;       </p>

&#x20;     </motion.form>

&#x20;   </div>

&#x20; );

}



*Report.jsx->*



import Navbar from '../components/Navbar';

import ScoreCard from '../components/ScoreCard';



export default function Report() {

&#x20; return (

&#x20;   <div className="min-h-screen bg-slate-950 text-white">

&#x20;     <Navbar />

&#x20;     <div className="max-w-6xl mx-auto p-8">

&#x20;       <h1 className="text-4xl font-bold mb-8">Interview Feedback</h1>



&#x20;       <div className="grid md:grid-cols-3 gap-6 mb-8">

&#x20;         <ScoreCard title="Overall Score" score={84} />

&#x20;         <ScoreCard title="Confidence" score={78} />

&#x20;         <ScoreCard title="Answer Quality" score={88} />

&#x20;       </div>



&#x20;       <div className="bg-white/5 rounded-2xl p-6 border border-white/10">

&#x20;         <h2 className="text-2xl font-semibold mb-4">Suggestions</h2>

&#x20;         <ul className="list-disc pl-6 space-y-2 text-gray-300">

&#x20;           <li>Use the STAR method.</li>

&#x20;           <li>Maintain better eye contact.</li>

&#x20;           <li>Reduce filler words.</li>

&#x20;         </ul>

&#x20;       </div>

&#x20;     </div>

&#x20;   </div>

&#x20; );

}



*Navbar.jsx->*



import { Link, useNavigate } from 'react-router-dom';

import { Brain, LogOut } from 'lucide-react';

import { useAuth } from '../context/AuthContext';



export default function Navbar() {

&#x20; const { logout } = useAuth();



&#x20;const navigate = useNavigate();



&#x20; const handleLogout = () => {

&#x20;   logout();

&#x20;   navigate('/');

&#x20; };



&#x20; return (

&#x20;   <nav className="flex items-center justify-between px-6 py-4 border-b border-white/10 bg-white/5 backdrop-blur-xl">

&#x20;     <Link to="/dashboard" className="flex items-center gap-2 text-xl font-bold">

&#x20;       <Brain className="text-violet-400" /> AI Interviewer

&#x20;     </Link>

&#x20;     <button

&#x20;       onClick={handleLogout}

&#x20;       className="flex items-center gap-2 px-4 py-2 rounded-lg bg-red-500 hover:bg-red-600"

&#x20;     >

&#x20;       <LogOut size={18} /> Logout

&#x20;     </button>

&#x20;   </nav>

&#x20; );

}



*ProtectedRoute.jsx->*



import { Navigate, Outlet } from "react-router-dom";

import { useAuth } from "../context/AuthContext";



export default function ProtectedRoute() {

&#x20; const { token } = useAuth();



&#x20; return token ? <Outlet /> : <Navigate to="/" replace />;

}



*ScoreCard.jsx->*



export default function ScoreCard({ title, score }) {

&#x20; return (

&#x20;   <div className="bg-white/5 border border-white/10 rounded-2xl p-6 shadow-lg">

&#x20;     <h3 className="text-gray-300 mb-2">{title}</h3>

&#x20;     <p className="text-4xl font-bold text-violet-400">{score}%</p>

&#x20;   </div>

&#x20; );

}



*AuthContext.jsx->*



import { createContext, useContext, useState } from "react";



const AuthContext = createContext();



export function AuthProvider({ children }) {

&#x20; const \[token, setToken] = useState(localStorage.getItem("token"));



&#x20; const login = (jwt) => {

&#x20;   localStorage.setItem("token", jwt);

&#x20;   setToken(jwt);

&#x20; };



&#x20; const logout = () => {

&#x20;   localStorage.removeItem("token");

&#x20;   setToken(null);

&#x20; };



&#x20; return (

&#x20;   <AuthContext.Provider value={{ token, login, logout }}>

&#x20;     {children}

&#x20;   </AuthContext.Provider>

&#x20; );

}



export const useAuth = () => useContext(AuthContext);



*api.js->*



import axios from 'axios';



const api = axios.create({

&#x20; baseURL: 'http://localhost:8080/api',

});



api.interceptors.request.use((config) => {

&#x20; const token = localStorage.getItem('token');

&#x20; if (token) {

&#x20;   config.headers.Authorization = `Bearer ${token}`;

&#x20; }

&#x20; return config;

});



export default api;



# **Backend:**



*CorsConfig.java->*



package com.kuheli.backend.config;



import org.springframework.context.annotation.Bean;

import org.springframework.context.annotation.Configuration;

import org.springframework.web.cors.CorsConfiguration;

import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import org.springframework.web.cors.CorsConfigurationSource;



import java.util.List;



@Configuration

public class CorsConfig {



&#x20;   @Bean

&#x20;   public CorsConfigurationSource corsConfigurationSource() {

&#x20;       CorsConfiguration config = new CorsConfiguration();



&#x20;       config.setAllowedOrigins(List.of("http://localhost:5173"));

&#x20;       config.setAllowedMethods(List.of("GET", "POST", "PUT", "DELETE", "OPTIONS"));

&#x20;       config.setAllowedHeaders(List.of("\*"));

&#x20;       config.setAllowCredentials(true);



&#x20;       UrlBasedCorsConfigurationSource source =

&#x20;               new UrlBasedCorsConfigurationSource();



&#x20;       source.registerCorsConfiguration("/\*\*", config);



&#x20;       return source;

&#x20;   }

}



*SecurityConfig.java->*



package com.kuheli.backend.config;



import org.springframework.context.annotation.Bean;

import org.springframework.context.annotation.Configuration;

import org.springframework.http.HttpMethod;

import org.springframework.security.config.Customizer;

import org.springframework.security.config.annotation.web.builders.HttpSecurity;

import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;

import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

import org.springframework.security.crypto.password.PasswordEncoder;

import org.springframework.security.web.SecurityFilterChain;



@Configuration

public class SecurityConfig {



&#x20;   // Password encoder bean

&#x20;   @Bean

&#x20;   public PasswordEncoder passwordEncoder() {

&#x20;       return new BCryptPasswordEncoder();

&#x20;   }



&#x20;   // Security configuration

&#x20;   @Bean

&#x20;   public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {

&#x20;       http

&#x20;               // Disable CSRF for REST API

&#x20;               .csrf(AbstractHttpConfigurer::disable)



&#x20;               // Enable CORS

&#x20;               .cors(Customizer.withDefaults())



&#x20;               // Disable default login popup

&#x20;               .httpBasic(AbstractHttpConfigurer::disable)

&#x20;               .formLogin(AbstractHttpConfigurer::disable)



&#x20;               // Authorization rules

&#x20;               .authorizeHttpRequests(auth -> auth

&#x20;                       .requestMatchers("/api/auth/\*\*").permitAll()

&#x20;                       .requestMatchers(HttpMethod.OPTIONS, "/\*\*").permitAll()

&#x20;                       .anyRequest().authenticated()

&#x20;               );



&#x20;       return http.build();

&#x20;   }

}

*AuthController.java->*



package com.kuheli.backend.controller;



import com.kuheli.backend.dto.\*;

import com.kuheli.backend.service.AuthService;

import lombok.RequiredArgsConstructor;

import org.springframework.web.bind.annotation.\*;



@RestController

@RequestMapping("/api/auth")

@RequiredArgsConstructor

@CrossOrigin(origins = "http://localhost:5173")

public class AuthController {



&#x20;   private final AuthService authService;



&#x20;   @PostMapping("/register")

&#x20;   public AuthResponse register(@RequestBody RegisterRequest request) {

&#x20;       return authService.register(request);

&#x20;   }



&#x20;   @PostMapping("/login")

&#x20;   public AuthResponse login(@RequestBody LoginRequest request) {

&#x20;       return authService.login(request);

&#x20;   }

}

*AuthResponse.java->*



package com.kuheli.backend.dto;



public record AuthResponse(

&#x20;       String token,

&#x20;       String message

) {}



*LoginRequest.java->*



package com.kuheli.backend.dto;



public record LoginRequest(

&#x20;       String email,

&#x20;       String password

) {}



*RegisterRequest.java->*



package com.kuheli.backend.dto;



public record RegisterRequest(

&#x20;       String name,

&#x20;       String email,

&#x20;       String password

) {}



*User.java->*



package com.kuheli.backend.entity;



import jakarta.persistence.\*;

import lombok.\*;



@Entity

@Table(name = "users")

@Getter @Setter

@NoArgsConstructor

@AllArgsConstructor

@Builder

public class User {



&#x20;   @Id

&#x20;   @GeneratedValue(strategy = GenerationType.IDENTITY)

&#x20;   private Long id;

&#x20;   private String name;



&#x20;   @Column(unique = true, nullable = false)

&#x20;   private String email;



&#x20;   @Column(nullable = false)

&#x20;   private String password;

}



*UserRepository.java->*



package com.kuheli.backend.repository;



import com.kuheli.backend.entity.User;

import org.springframework.data.jpa.repository.JpaRepository;



import java.util.Optional;



public interface UserRepository extends JpaRepository<User, Long> {

&#x20;   Optional<User> findByEmail(String email);

&#x20;   boolean existsByEmail(String email);

}



*JwtService.java->*



package com.kuheli.backend.security;



import io.jsonwebtoken.Jwts;

import io.jsonwebtoken.security.Keys;

import org.springframework.beans.factory.annotation.Value;

import org.springframework.stereotype.Service;



import javax.crypto.SecretKey;

import java.nio.charset.StandardCharsets;

import java.util.Date;



@Service

public class JwtService {



&#x20;   @Value("${jwt.secret}")

&#x20;   private String secret;



&#x20;   @Value("${jwt.expiration}")

&#x20;   private long expiration;



&#x20;   public String generateToken(String email) {

&#x20;       SecretKey key = Keys.hmacShaKeyFor(secret.getBytes(StandardCharsets.UTF\_8));



&#x20;       return Jwts.builder()

&#x20;               .subject(email)

&#x20;               .issuedAt(new Date())

&#x20;               .expiration(new Date(System.currentTimeMillis() + expiration))

&#x20;               .signWith(key)

&#x20;               .compact();

&#x20;   }

}



*AuthService.java->*



package com.kuheli.backend.service;



import com.kuheli.backend.dto.\*;

import com.kuheli.backend.entity.User;

import com.kuheli.backend.repository.UserRepository;

import com.kuheli.backend.security.JwtService;

import lombok.RequiredArgsConstructor;

import org.springframework.security.crypto.password.PasswordEncoder;

import org.springframework.stereotype.Service;



@Service

@RequiredArgsConstructor

public class AuthService {



&#x20;   private final UserRepository userRepository;

&#x20;   private final PasswordEncoder passwordEncoder;

&#x20;   private final JwtService jwtService;



&#x20;   public AuthResponse register(RegisterRequest request) {

&#x20;       if (userRepository.existsByEmail(request.email())) {

&#x20;           throw new RuntimeException("Email already exists");

&#x20;       }



&#x20;       User user = User.builder().name(request.name())

&#x20;               .email(request.email())

&#x20;               .password(passwordEncoder.encode(request.password()))

&#x20;               .build();



&#x20;       userRepository.save(user);



&#x20;       String token = jwtService.generateToken(user.getEmail());

&#x20;       return new AuthResponse(token, "Registration successful");

&#x20;   }



&#x20;   public AuthResponse login(LoginRequest request) {

&#x20;       User user = userRepository.findByEmail(request.email())

&#x20;               .orElseThrow(() -> new RuntimeException("User not found"));



&#x20;       if (!passwordEncoder.matches(request.password(), user.getPassword())) {

&#x20;           throw new RuntimeException("Invalid credentials");

&#x20;       }



&#x20;       String token = jwtService.generateToken(user.getEmail());

&#x20;       return new AuthResponse(token, "Login successful");

&#x20;   }

}





