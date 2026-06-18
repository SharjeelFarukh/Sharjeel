import express from "express";
import path from "path";
import dotenv from "dotenv";
import { createClient } from "@supabase/supabase-js";
import { createServer as createViteServer } from "vite";

// Load environment variables (loads from .env)
dotenv.config();

const app = express();
const PORT = 3000;

// Body parser middleware
app.use(express.json());

// Lazy-initialize Supabase client
const getSupabaseClient = () => {
  const url = process.env.SUPABASE_URL;
  const key = process.env.SUPABASE_ANON_KEY;
  if (!url || !key) {
    throw new Error("SUPABASE_URL and SUPABASE_ANON_KEY must be defined in your environment variables/secrets.");
  }
  return createClient(url, key);
};

// --- API Endpoints ---

// Check backend health and Supabase connection
app.get("/api/health", async (req, res) => {
  try {
    const supabase = getSupabaseClient();
    res.json({
      status: "ok",
      supabaseConfigured: true,
      url: process.env.SUPABASE_URL ? "configured" : "missing",
    });
  } catch (error: any) {
    res.status(500).json({
      status: "error",
      message: error.message,
    });
  }
});

// Fetch all bookings from Supabase
app.get("/api/bookings", async (req, res) => {
  try {
    const supabase = getSupabaseClient();
    
    // Attempt to select from "appointments" table
    const { data, error } = await supabase
      .from("appointments")
      .select("*")
      .order("created_at_db", { ascending: false });

    if (error) {
      console.error("Error fetching from Supabase table 'appointments':", error);
      
      // If error suggests table doesn't exist, we can send a custom error code/message
      if (error.code === "PGRST116" || error.code === "42P01") {
        return res.status(404).json({
          error: "table_missing",
          message: "The 'appointments' table does not exist in your Supabase database. Please create it using the SQL editor.",
          details: error.message
        });
      }
      return res.status(400).json({ error: error.message });
    }

    // Map database snake_case fields back to frontend camelCase Appointment interface format
    const formatted = (data || []).map((row: any) => ({
      id: row.id,
      patientName: row.patient_name,
      phoneNumber: row.phone_number,
      email: row.email,
      date: row.appointment_date,
      time: row.appointment_time,
      reason: row.reason,
      status: row.status || "pending",
      createdAt: row.created_at,
    }));

    return res.json(formatted);
  } catch (error: any) {
    console.error("Fetch API error:", error);
    return res.status(500).json({ error: error.message });
  }
});

// Insert a manual booking into Supabase
app.post("/api/bookings", async (req, res) => {
  try {
    const supabase = getSupabaseClient();
    const { id, patientName, phoneNumber, email, date, time, reason, status, createdAt } = req.body;

    if (!patientName || !phoneNumber || !email || !date || !time) {
      return res.status(400).json({ error: "Missing required fields for booking." });
    }

    // Payload formatted for PostgreSQL snake_case columns
    const payload = {
      id: id || `VN-${Math.floor(1000 + Math.random() * 9000)}`,
      patient_name: patientName.trim(),
      phone_number: phoneNumber.trim(),
      email: email.trim(),
      appointment_date: date,
      appointment_time: time,
      reason: reason ? reason.trim() : "",
      status: status || "pending",
      created_at: createdAt || new Date().toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      }),
    };

    const { data, error } = await supabase
      .from("appointments")
      .insert([payload])
      .select();

    if (error) {
      console.error("Error inserting into Supabase table 'appointments':", error);
      if (error.code === "42P01") {
        return res.status(404).json({
          error: "table_missing",
          message: "The 'appointments' table does not exist in your Supabase database. Please create it using the SQL editor."
        });
      }
      return res.status(400).json({ error: error.message });
    }

    return res.status(201).json({
      success: true,
      booking: data ? data[0] : payload
    });
  } catch (error: any) {
    console.error("Insert API error:", error);
    return res.status(500).json({ error: error.message });
  }
});

// Delete booking from Supabase
app.delete("/api/bookings/:id", async (req, res) => {
  try {
    const supabase = getSupabaseClient();
    const { id } = req.params;

    const { error } = await supabase
      .from("appointments")
      .delete()
      .eq("id", id);

    if (error) {
      return res.status(400).json({ error: error.message });
    }

    return res.json({ success: true, message: `Booking ${id} deleted successfully.` });
  } catch (error: any) {
    return res.status(500).json({ error: error.message });
  }
});

// --- Vite and Production Routing ---

async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    // Development mode with Vite Dev Server Middleware
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    // Production serving static built files
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`[Server] Running on http://localhost:${PORT} in ${process.env.NODE_ENV || "development"} mode`);
  });
}

startServer();
