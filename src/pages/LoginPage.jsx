import React, { useState } from "react";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";

export default function LoginPage({ onLogin }) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    onLogin();
  };

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center px-4">
      {/* Vocal Logo */}
      <div className="mb-12">
        <div className="w-16 h-16 rounded-full border border-gray-400 flex items-center justify-center mx-auto mb-6">
          <div className="flex space-x-0.5">
            <div className="w-0.5 h-3 bg-gray-700 rounded-full"></div>
            <div className="w-0.5 h-5 bg-gray-700 rounded-full"></div>
            <div className="w-0.5 h-6 bg-gray-700 rounded-full"></div>
            <div className="w-0.5 h-5 bg-gray-700 rounded-full"></div>
            <div className="w-0.5 h-3 bg-gray-700 rounded-full"></div>
          </div>
        </div>
        <div className="text-center">
          <span className="text-2xl font-semibold text-black">Vocal</span>
        </div>
      </div>

      {/* Join Vocal Header */}
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-black">Join Vocal</h1>
      </div>
      
      {/* Form Container */}
      <div className="w-full max-w-md">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <Label htmlFor="name" className="block text-sm font-semibold text-gray-700 uppercase tracking-wider mb-2">
              NAME
            </Label>
            <Input
              id="name"
              name="name"
              type="text"
              required
              value={formData.name}
              onChange={(e) => handleInputChange("name", e.target.value)}
              placeholder="Jane Smith"
              className="w-full h-12 px-4 border border-gray-300 rounded-md text-gray-900 placeholder-gray-400 focus:ring-2 focus:ring-gray-500 focus:border-transparent bg-white"
            />
          </div>
          
          <div>
            <Label htmlFor="email" className="block text-sm font-semibold text-gray-700 uppercase tracking-wider mb-2">
              EMAIL
            </Label>
            <Input
              id="email"
              name="email"
              type="email"
              required
              value={formData.email}
              onChange={(e) => handleInputChange("email", e.target.value)}
              placeholder="you@awesome.com"
              className="w-full h-12 px-4 border border-gray-300 rounded-md text-gray-900 placeholder-gray-400 focus:ring-2 focus:ring-gray-500 focus:border-transparent bg-white"
            />
          </div>
          
          <div>
            <Label htmlFor="password" className="block text-sm font-semibold text-gray-700 uppercase tracking-wider mb-2">
              PASSWORD
            </Label>
            <Input
              id="password"
              name="password"
              type="password"
              required
              value={formData.password}
              onChange={(e) => handleInputChange("password", e.target.value)}
              placeholder="superscret"
              className="w-full h-12 px-4 border border-gray-300 rounded-md text-gray-900 placeholder-gray-400 focus:ring-2 focus:ring-gray-500 focus:border-transparent bg-white"
            />
          </div>

          <Button type="submit" className="w-full h-12 bg-gray-800 text-white hover:bg-gray-900 rounded-md font-medium text-base mt-8">
            Sign up
          </Button>
        </form>
        
        <div className="text-center mt-4">
          <p className="text-sm text-gray-600">
            Already have an account?{" "}
            <button type="button" className="text-black underline font-medium">
              Sign in
            </button>
          </p>
        </div>
        
        <div className="relative my-8">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-300" />
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-4 bg-white text-gray-500">or</span>
          </div>
        </div>
        
        <div className="space-y-3">
          <Button variant="outline" className="w-full h-12 border border-gray-300 bg-white text-gray-700 hover:bg-gray-50 flex items-center justify-center space-x-3 rounded-md">
            <svg className="w-5 h-5 text-blue-600" viewBox="0 0 24 24">
              <path fill="currentColor" d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
            </svg>
            <span className="font-medium">Sign up with Facebook</span>
          </Button>
          
          <Button variant="outline" className="w-full h-12 border border-gray-300 bg-white text-gray-700 hover:bg-gray-50 flex items-center justify-center space-x-3 rounded-md">
            <svg className="w-5 h-5" viewBox="0 0 24 24">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
            </svg>
            <span className="font-medium">Sign up with Google</span>
          </Button>
          
          <Button variant="outline" className="w-full h-12 border border-gray-300 bg-white text-gray-700 hover:bg-gray-50 flex items-center justify-center space-x-3 rounded-md">
            <svg className="w-5 h-5" viewBox="0 0 24 24">
              <path fill="currentColor" d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.024-.105-.949-.199-2.403.041-3.439.219-.937 1.406-5.957 1.406-5.957s-.359-.72-.359-1.781c0-1.663.967-2.911 2.168-2.911 1.024 0 1.518.769 1.518 1.688 0 1.029-.653 2.567-.992 3.992-.285 1.193.6 2.165 1.775 2.165 2.128 0 3.768-2.245 3.768-5.487 0-2.861-2.063-4.869-5.008-4.869-3.41 0-5.409 2.562-5.409 5.199 0 1.033.394 2.143.889 2.741.097.118.112.222.083.343-.09.375-.293 1.199-.334 1.363-.053.225-.172.271-.402.165-1.495-.69-2.433-2.878-2.433-4.646 0-3.776 2.748-7.252 7.92-7.252 4.158 0 7.392 2.967 7.392 6.923 0 4.135-2.607 7.462-6.233 7.462-1.214 0-2.357-.629-2.746-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24.009 12.017 24c6.624 0 11.99-5.367 11.99-11.987C24.007 5.367 18.641.001 12.017.001z"/>
            </svg>
            <span className="font-medium">Sign up with Apple</span>
          </Button>
        </div>
        
        <p className="text-xs text-gray-500 text-center mt-8 leading-relaxed">
          By continuing, you agree to our{" "}
          <button className="underline hover:text-gray-700">Privacy Policy</button> and{" "}
          <button className="underline hover:text-gray-700">Terms of Use</button>.
        </p>
      </div>
    </div>
  );
}
