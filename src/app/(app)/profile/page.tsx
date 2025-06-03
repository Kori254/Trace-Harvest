
"use client";

import { useState, useEffect } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Icons } from "@/components/icons";
import { useToast } from "@/hooks/use-toast";
import { Textarea } from "@/components/ui/textarea"; // Added Textarea import

// Mock user data - replace with actual data fetching in a real app
const initialUser = {
  name: "Demo User",
  email: "user@example.com",
  role: "Farmer",
  avatarUrl: "https://placehold.co/100x100.png",
  bio: "Passionate about sustainable agriculture and leveraging technology to improve farm efficiency. Member since 2023.",
};

export default function ProfilePage() {
  const { toast } = useToast();
  
  const [isEditing, setIsEditing] = useState(false);
  const [userName, setUserName] = useState(initialUser.name);
  const [userBio, setUserBio] = useState(initialUser.bio);
  const [originalUserName, setOriginalUserName] = useState(initialUser.name);
  const [originalUserBio, setOriginalUserBio] = useState(initialUser.bio);

  const handleEditToggle = () => {
    if (isEditing) {
      // Save action
      // In a real app, you'd send this data to a backend
      setOriginalUserName(userName); // Update "original" to current saved state
      setOriginalUserBio(userBio);
      toast({
        title: "Profile Saved",
        description: "Your profile information has been updated (locally).",
      });
    } else {
      // Start editing
      setOriginalUserName(userName); // Store current values for potential cancel
      setOriginalUserBio(userBio);
    }
    setIsEditing(!isEditing);
  };

  const handleCancelEdit = () => {
    setUserName(originalUserName);
    setUserBio(originalUserBio);
    setIsEditing(false);
    toast({
      title: "Edit Canceled",
      description: "Your changes were not saved.",
      variant: "default"
    });
  };

  const handleChangePassword = () => {
    toast({
      title: "Change Password",
      description: "This feature is coming soon!",
    });
  };

  const handleNotificationPreferences = () => {
    toast({
      title: "Notification Preferences",
      description: "This feature is coming soon!",
    });
  };

  const handleDeleteAccount = () => {
    toast({
      title: "Delete Account",
      description: "Account deletion feature is coming soon. This is a critical action.",
      variant: "destructive",
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
        <h1 className="text-3xl font-bold tracking-tight font-headline text-foreground">User Profile</h1>
        <div className="flex space-x-2">
          {isEditing && (
            <Button onClick={handleCancelEdit} variant="outline">
              <Icons.logout className="mr-2 h-4 w-4 transform rotate-180" /> {/* Using logout icon for cancel and rotating */}
              Cancel
            </Button>
          )}
          <Button onClick={handleEditToggle} className="bg-primary hover:bg-primary/90 text-primary-foreground">
            <Icons.settings className="mr-2 h-4 w-4" />
            {isEditing ? "Save Changes" : "Edit Profile"}
          </Button>
        </div>
      </div>

      <Card className="shadow-lg bg-card">
        <CardHeader className="items-center text-center sm:text-left sm:items-start">
          <Avatar className="h-24 w-24 mb-4 ring-2 ring-primary ring-offset-2 ring-offset-background">
            <AvatarImage src={initialUser.avatarUrl} alt={userName} data-ai-hint="user portrait" />
            <AvatarFallback>{userName?.charAt(0)?.toUpperCase() || "U"}</AvatarFallback>
          </Avatar>
          <CardTitle className="font-headline text-2xl text-card-foreground">
            {isEditing ? (
              <Input 
                id="name" 
                value={userName} 
                onChange={(e) => setUserName(e.target.value)} 
                className="text-2xl font-headline"
                aria-label="User name"
              />
            ) : (
              userName
            )}
          </CardTitle>
          <CardDescription className="text-muted-foreground">{initialUser.role}</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="email" className="font-semibold">Email Address</Label>
            <Input id="email" type="email" value={initialUser.email} readOnly className="mt-1 bg-background/50 cursor-default" />
          </div>
          
          <div>
            <Label htmlFor="bio" className="font-semibold">Bio</Label>
            <Textarea
              id="bio"
              value={userBio}
              onChange={(e) => setUserBio(e.target.value)}
              readOnly={!isEditing}
              className={`mt-1 w-full rounded-md border border-input px-3 py-2 text-sm min-h-[100px] ${!isEditing ? 'bg-background/50 cursor-default' : 'bg-background'}`}
            />
          </div>

          <Card className="bg-background/70">
            <CardHeader>
                <CardTitle className="text-lg font-headline">Account Settings</CardTitle>
                <CardDescription>Manage your account preferences.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
                <Button variant="outline" className="w-full justify-start" onClick={handleChangePassword}>
                    <Icons.user className="mr-2 h-4 w-4" /> Change Password
                </Button>
                <Button variant="outline" className="w-full justify-start" onClick={handleNotificationPreferences}>
                    <Icons.notifications className="mr-2 h-4 w-4" /> Notification Preferences
                </Button>
                 <Button variant="destructive" className="w-full justify-start" onClick={handleDeleteAccount}>
                    <Icons.logout className="mr-2 h-4 w-4" /> Delete Account
                </Button>
            </CardContent>
          </Card>

        </CardContent>
        <CardFooter>
          <p className="text-xs text-muted-foreground">
            {isEditing 
              ? "Click 'Save Changes' to update your profile or 'Cancel' to discard."
              : 'To update your profile information, please click the "Edit Profile" button.'
            }
          </p>
        </CardFooter>
      </Card>
    </div>
  );
}
