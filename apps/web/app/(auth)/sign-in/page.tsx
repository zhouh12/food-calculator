"use client";
import { Input } from "@core/ui/components/input";
import { Label } from "@core/ui/components/label";
import { Checkbox } from "@core/ui/components/checkbox";
import { Button } from "@core/ui/components/button";

import { useState } from "react";

export default function SignInPage() {
  const [rememberMe, setRememberMe] = useState(false);

  return (
    <div className="min-h-screen flex items-center justify-center bg-black text-white p-4">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center">
          <div className="flex justify-center space-x-2 mb-4">
            <div className="w-4 h-4 rounded-full bg-white" />
            <div className="w-4 h-4 rounded-full bg-purple-600" />
          </div>
          <h2 className="text-3xl font-bold">GIVY CRM WEBAPP</h2>
          <p className="text-sm text-gray-400 mt-2">@Givy</p>
          <p className="text-sm text-gray-400 mt-4 max-w-sm mx-auto">
            The CRM platform that is simple to set up and easy to use Givy lets
            you handle all your customers, campaign, and coupon in one place.
          </p>
        </div>
        <form className="mt-8 space-y-6">
          <div className="space-y-4">
            <div>
              <Label htmlFor="email-phone" className="sr-only">
                Phone number or Email
              </Label>
              <Input
                id="email-phone"
                name="email-phone"
                type="text"
                required
                className="bg-gray-800 border-gray-700 text-white placeholder-gray-400"
                placeholder="Phone number or Email"
              />
            </div>
            <div>
              <Label htmlFor="password" className="sr-only">
                Password
              </Label>
              <Input
                id="password"
                name="password"
                type="password"
                required
                className="bg-gray-800 border-gray-700 text-white placeholder-gray-400"
                placeholder="Password"
              />
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <Checkbox
                id="remember-me"
                checked={rememberMe}
                onCheckedChange={(checked) => setRememberMe(checked as boolean)}
                className="border-gray-600"
              />
              <Label
                htmlFor="remember-me"
                className="ml-2 block text-sm text-gray-400"
              >
                Remember
              </Label>
            </div>
            <div className="text-sm">
              <a href="#" className="text-purple-400 hover:text-purple-300">
                Forgot Password
              </a>
            </div>
          </div>

          <div>
            <Button
              type="submit"
              className="w-full bg-purple-600 hover:bg-purple-700"
            >
              Sign In
            </Button>
          </div>
        </form>
        <div className="text-center">
          <Button
            variant="outline"
            className="w-full border-gray-700 text-gray-300 hover:bg-gray-800"
          >
            Create membership
          </Button>
        </div>
      </div>
    </div>
  );
}
