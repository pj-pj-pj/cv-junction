"use client";

import React, { useState } from "react";
import { useAuth } from "@/context/AuthContext"; // Assuming this context manages user authentication
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Link, useNavigate } from "react-router-dom";
import sampleUserData from "@/data/sampleUser.json";
import { useCV } from "@/context/CVContext";

export default function LoginForm() {
  const { setUser } = useAuth();
  const { setCVList } = useCV();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();

    const user = sampleUserData.user;
    const cvList = sampleUserData.cvList;

    if (email === user.email && password === user.password) {
      setUser(user);
      setCVList(cvList);

      setError(null);
      navigate("/cv");
    } else {
      setError("Invalid email or password");
    }
  };

  return (
    <div className="h-screen grid items-center text-primary">
      <div>
        <h1 className="text-3xl font-bold text-center mb-5 ">CVJunction</h1>
        <Card className="w-full max-w-[24rem] my-auto mx-auto flex flex-col align-middle justify-center">
          <CardHeader>
            <CardTitle className="text-2xl font-bold">Login</CardTitle>
            <CardDescription>
              Enter your credentials to access your account
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form
              onSubmit={handleLogin}
              className="space-y-4"
            >
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  placeholder="Enter your email"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  placeholder="Enter your password"
                />
              </div>
              {error && <p className="text-sm text-red-500">{error}</p>}
              <Button
                type="submit"
                className="w-full"
              >
                Login
              </Button>
            </form>
          </CardContent>
          <CardFooter className="flex justify-center">
            <p className="text-sm text-muted-foreground">
              Don't have an account?{" "}
              <Link
                to="/signup"
                className="text-primary hover:underline"
              >
                Sign up
              </Link>
            </p>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
