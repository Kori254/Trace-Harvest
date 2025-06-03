
"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Icons } from "@/components/icons";
import { useToast } from "@/hooks/use-toast";

export default function ProfilePage() {
  const { toast } = useToast();
  // Mock user data - replace with actual data fetching in a real app
  const user = {
    name: "Demo User",
    email: "user@example.com",
    role: "Farmer",
    avatarUrl: "https://placehold.co/100x100.png",
    bio: "Passionate about sustainable agriculture and leveraging technology to improve farm efficiency. Member since 2023.",
  };

  const handleEditProfile = () => {
    toast({
      title: "Edit Profile",
      description: "This feature is coming soon!",
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
        <Button onClick={handleEditProfile} className="bg-primary hover:bg-primary/90 text-primary-foreground">
          <Icons.settings className="mr-2 h-4 w-4" />
          Edit Profile
        </Button>
      </div>

      <Card className="shadow-lg bg-card">
        <CardHeader className="items-center text-center sm:text-left sm:items-start">
          <Avatar className="h-24 w-24 mb-4 ring-2 ring-primary ring-offset-2 ring-offset-background">
            <AvatarImage src={user.avatarUrl} alt={user.name} data-ai-hint="user portrait" />
            <AvatarFallback>{user.name?.charAt(0) || "U"}</AvatarFallback>
          </Avatar>
          <CardTitle className="font-headline text-2xl text-card-foreground">{user.name}</CardTitle>
          <CardDescription className="text-muted-foreground">{user.role}</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="email" className="font-semibold">Email Address</Label>
            <Input id="email" type="email" value={user.email} readOnly className="mt-1 bg-background/50 cursor-default" />
          </div>
          
          <div>
            <Label htmlFor="bio" className="font-semibold">Bio</Label>
            <textarea
              id="bio"
              value={user.bio}
              readOnly
              className="mt-1 w-full rounded-md border border-input bg-background/50 px-3 py-2 text-sm min-h-[100px] cursor-default"
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
            To update your profile information, please click the &quot;Edit Profile&quot; button.
          </p>
        </CardFooter>
      </Card>
    </div>
  );
}
