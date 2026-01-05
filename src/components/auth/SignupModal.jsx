"use client";
import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription, AlertTitle } from "../ui/alert";
import { CheckCircle2Icon, AlertCircle } from "lucide-react";
import {
  googleLogin,
  signinWithEmail,
  signupWithEmail,
} from "@/utils/auth";
import { useAuthContext } from "@/contexts/authContext";

const SignupModal = ({ open, setOpen }) => {
  const { user } = useAuthContext();

  const [form, setForm] = useState({ email: "", password: "" });
  const [mode, setMode] = useState("login");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

 
  useEffect(() => {
    if (user) {
      setOpen(false);
      setForm({ email: "", password: "" });
      setError("");
      setSuccess(false);
    }
  }, [user, setOpen]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const getErrorMessage = (error) => {
    switch (error.code) {
      case "auth/invalid-credential":
        return "Wrong email or password";
      case "auth/user-not-found":
        return "User does not exist";
      case "auth/email-already-in-use":
        return "Email already registered";
      case "auth/weak-password":
        return "Password should be at least 6 characters";
      case "auth/popup-closed-by-user":
        return "Login popup was closed";
      default:
        return "Something went wrong. Please try again.";
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess(false);
    setLoading(true);

    try {
      let response;

      if (mode === "login") {
        response = await signinWithEmail(form.email, form.password);
      } else {
        response = await signupWithEmail(form.email, form.password);
      }
      setSuccess(true);
    } catch (err) {
      setError(getErrorMessage(err));
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    setError("");
    setLoading(true);

    try {
      await googleLogin();
      setSuccess(true);
    } catch (err) {
      setError(getErrorMessage(err));
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          {success && (
            <Alert>
              <CheckCircle2Icon className="h-4 w-4" />
              <AlertTitle>Success</AlertTitle>
              <AlertDescription>
                You are logged in successfully
              </AlertDescription>
            </Alert>
          )}

          {error && (
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>Error</AlertTitle>
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          <DialogTitle className="text-center">
            Welcome to Bookify
          </DialogTitle>
          <DialogDescription className="text-center">
            Sign in or create a new account to continue
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label>Email</Label>
            <Input
              name="email"
              type="email"
              value={form.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="space-y-2">
            <Label>Password</Label>
            <Input
              name="password"
              type="password"
              value={form.password}
              onChange={handleChange}
              required
            />
          </div>

          <Button
            type="submit"
            className="w-full"
            disabled={loading}
            onClick={() => setMode("login")}
          >
            {loading && mode === "login" ? "Logging in..." : "Login"}
          </Button>

          <Button
            type="submit"
            className="w-full"
            disabled={loading}
            onClick={() => setMode("signup")}
          >
            {loading && mode === "signup"
              ? "Creating account..."
              : "Create new account"}
          </Button>
        </form>

        <div className="h-px w-full bg-border my-4" />

        <div className="space-y-2">
          <Button
            variant="outline"
            className="w-full"
            onClick={handleGoogleLogin}
            disabled={loading}
          >
            Continue with Google
          </Button>

          <Button variant="outline" className="w-full" disabled>
            Continue with GitHub
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default SignupModal;
