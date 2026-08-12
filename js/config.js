// =========================================
// API CONFIGURATION
// =========================================
//
// This is the ONLY place that should ever contain the backend's
// address. Every other file reads API_BASE_URL instead of writing
// out "http://localhost:5000" itself.
//
// Why this matters: right now the backend runs on your own computer,
// so it's "http://localhost:5000". Once the backend is deployed
// somewhere public (e.g. Render), it will get a real web address
// instead, like "https://fixmyarea-backend.onrender.com". At that
// point you change the single line below, and the whole site starts
// talking to the live backend — no other file needs to change.
//
// This file must be loaded (via <script>) BEFORE any other script
// that uses API_BASE_URL.

const API_BASE_URL = "https://fixmyarea-backend-0shz.onrender.com";
