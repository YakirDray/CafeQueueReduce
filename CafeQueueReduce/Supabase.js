import { createClient } from "@supabase/supabase-js";
import "react-native-url-polyfill/auto";
const supabaseUrl = "https://eboziqmbycpfiqlubgre.supabase.co";
const supabaseAnonKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVib3ppcW1ieWNwZmlxbHViZ3JlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDc3MzQwOTYsImV4cCI6MjAyMzMxMDA5Nn0.bc4BOwD6Mc2bYlfVuh2QezT6IPiZlCdOLMAmNSfnLcE";
export const supabase = createClient(supabaseUrl, supabaseAnonKey);
