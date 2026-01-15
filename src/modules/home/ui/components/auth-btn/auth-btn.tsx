"use client";
import { Button } from "@/components/ui/button";
import { UserCircleIcon } from "lucide-react";
import { SignedOut, SignedIn, SignInButton, UserButton } from "@clerk/nextjs";
const AuthBtn = () => {
  return (
    <>
    <SignedIn>
      <UserButton />
    </SignedIn>
      <SignedOut>
        <SignInButton mode="modal">
        <Button
          variant={"outline"}
          className="px-4 py-2 text-sm font-medium rounded-full shadow-none border-blue-500/20 text-blue-600 hover:text-blue-500"
        >
          <UserCircleIcon /> Sign in
        </Button>
        </SignInButton>
      </SignedOut>
    </>
  );
};

export default AuthBtn;
