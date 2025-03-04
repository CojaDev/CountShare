"use client";

import { useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import axios from "axios";
import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import CountdownPreview from "@/components/CountdownPreview";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ColorPicker } from "@/components/ColorPicker";
import { ImageSelector } from "@/components/ImageSelector";
import { UserTypes } from "@/lib/userTypes";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { toast } from "react-hot-toast";
import { CountdownData } from "@/lib/countTypes";

export default function CreateCountdown() {
  const [countdownData, setCountdownData] = useState<CountdownData>({
    name: "",
    date: "",
    font: "Arial",
    textColor: "#000000",
    backgroundColor: "#ffffff",
    backgroundImage: "",
    description: "",
    fontSize: 48,
    showSeconds: true,
    showLabels: true,
    enableNotifications: false,
    notificationEmail: "",
    customCSS: "",
    isPublic: true,
    customBackgroundImage: null,
    showWatermark: true,
  });
  const [isFullscreenPreview, setIsFullscreenPreview] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { data: session } = useSession();
  const router = useRouter();

  const user = session?.user as UserTypes;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user?.id) {
      toast.error("You must be logged in to create a countdown");
      return;
    }

    try {
      setIsSubmitting(true);
      const formData = new FormData();

      // Append all countdown data to FormData
      Object.entries(countdownData).forEach(([key, value]) => {
        if (key !== "customBackgroundImage") {
          // Skip the File object
          formData.append(key, String(value));
        }
      });

      // Add the user ID
      formData.append("createdBy", user.id);

      const response = await fetch("/api/countdowns", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        const data = await response.json();
        toast.success("Countdown created successfully!");
        router.push(`/countdowns/${data.id}`);
      } else {
        throw new Error("Failed to save countdown");
      }
    } catch (error) {
      console.error("Error saving countdown:", error);
      toast.error("Failed to create countdown. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;
    setCountdownData((prev) => ({
      ...prev,
      [name]: name === "fontSize" ? parseInt(value, 10) : value,
    }));
  };

  const handleSwitchChange = (name: string, checked: boolean) => {
    setCountdownData((prev) => ({ ...prev, [name]: checked }));
  };

  const handleColorChange = (name: string, color: string) => {
    setCountdownData((prev) => ({ ...prev, [name]: color }));
  };

  const handleImageSelect = (imagePath: string) => {
    setCountdownData((prev) => ({
      ...prev,
      backgroundImage: imagePath,
      customBackgroundImage: null,
    }));
  };

  const handleCustomImageUpload = async (file: File) => {
    if (file.size > 32 * 1024 * 1024) {
      toast.error("Image size must be less than 32MB");
      return;
    }

    try {
      const formData = new FormData();
      formData.append("image", file);
      formData.append("key", process.env.NEXT_PUBLIC_IMGBB_API_KEY!);

      const response = await fetch("https://api.imgbb.com/1/upload", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Failed to upload image");
      }

      const data = await response.json();
      setCountdownData((prev) => ({
        ...prev,
        backgroundImage: data.data.url,
        customBackgroundImage: null,
      }));

      toast.success("Image uploaded successfully!");
    } catch (error) {
      console.error("Error uploading image:", error);
      toast.error("Failed to upload image. Please try again.");
    }
  };

  const isPremium = user?.premium || false;

  if (!session) {
    return (
      <Layout>
        <div className="flex items-center justify-center h-[calc(100vh-4rem)]">
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-4">
              Please log in to create a countdown
            </h1>
            <Button onClick={() => router.push("/login")}>Log In</Button>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="flex h-[calc(100vh-4rem)] bg-gray-100">
        <div className="flex-1 flex">
          {/* Left Sidebar */}
          <div className="w-80 bg-white p-4 overflow-y-auto border-r border-gray-200">
            <Tabs defaultValue="basic" className="w-full overflow-hidden">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="basic">Basic</TabsTrigger>
                <TabsTrigger value="advanced">Advanced</TabsTrigger>
              </TabsList>
              <TabsContent value="basic">
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="name">Countdown Name</Label>
                    <Input
                      type="text"
                      id="name"
                      name="name"
                      value={countdownData.name}
                      onChange={handleChange}
                      required
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label htmlFor="date">End Date and Time</Label>
                    <Input
                      type="datetime-local"
                      id="date"
                      name="date"
                      value={countdownData.date}
                      onChange={handleChange}
                      required
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label htmlFor="description">Description</Label>
                    <Textarea
                      id="description"
                      name="description"
                      value={countdownData.description}
                      onChange={handleChange}
                      className="mt-1"
                      rows={3}
                    />
                  </div>
                  <div>
                    <Label htmlFor="font">Font</Label>
                    <Select
                      name="font"
                      value={countdownData.font}
                      onValueChange={(value) =>
                        handleChange({ target: { name: "font", value } } as any)
                      }
                    >
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select a font" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Arial">Arial</SelectItem>
                        <SelectItem value="Helvetica">Helvetica</SelectItem>
                        <SelectItem value="Times New Roman">
                          Times New Roman
                        </SelectItem>
                        <SelectItem value="Courier">Courier</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="fontSize">Font Size</Label>
                    <Input
                      type="number"
                      id="fontSize"
                      name="fontSize"
                      value={countdownData.fontSize}
                      onChange={handleChange}
                      min={12}
                      max={72}
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label htmlFor="textColor">Text Color</Label>
                    <ColorPicker
                      color={countdownData.textColor}
                      onChange={(color) =>
                        handleColorChange("textColor", color)
                      }
                    />
                  </div>
                  <div>
                    <Label htmlFor="backgroundColor">Background Color</Label>
                    <ColorPicker
                      color={countdownData.backgroundColor}
                      onChange={(color) =>
                        handleColorChange("backgroundColor", color)
                      }
                    />
                  </div>
                  <div>
                    <Label htmlFor="backgroundImage">Background Image</Label>
                    <ImageSelector onSelect={handleImageSelect} />
                  </div>
                  <div className="flex items-center space-x-2">
                    <Switch
                      id="isPublic"
                      checked={countdownData.isPublic}
                      onCheckedChange={(checked) =>
                        handleSwitchChange("isPublic", checked)
                      }
                    />
                    <Label htmlFor="isPublic">Make countdown public</Label>
                  </div>
                </div>
              </TabsContent>
              <TabsContent value="advanced">
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="customBackgroundImage">
                      Upload Custom Background Image
                    </Label>
                    <Input
                      type="file"
                      id="customBackgroundImage"
                      name="customBackgroundImage"
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) handleCustomImageUpload(file);
                      }}
                      accept="image/*"
                      className="mt-1"
                    />
                    <p className="text-sm text-gray-500 mt-1">Max size: 32MB</p>
                    {countdownData.backgroundImage && (
                      <div className="mt-2">
                        <img
                          src={countdownData.backgroundImage}
                          alt="Uploaded preview"
                          className="w-full max-h-32 object-cover rounded"
                        />
                      </div>
                    )}
                  </div>
                  <div className="flex items-center space-x-2">
                    <Switch
                      id="showSeconds"
                      checked={countdownData.showSeconds}
                      onCheckedChange={(checked) =>
                        handleSwitchChange("showSeconds", checked)
                      }
                    />
                    <Label htmlFor="showSeconds">Show Seconds</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Switch
                      id="showLabels"
                      checked={countdownData.showLabels}
                      onCheckedChange={(checked) =>
                        handleSwitchChange("showLabels", checked)
                      }
                    />
                    <Label htmlFor="showLabels">Show Labels</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Switch
                      id="showWatermark"
                      checked={countdownData.showWatermark}
                      onCheckedChange={(checked) =>
                        handleSwitchChange("showWatermark", checked)
                      }
                    />
                    <Label htmlFor="showWatermark">
                      Show CountShare Watermark
                    </Label>
                  </div>
                  {isPremium && (
                    <div className="flex items-center space-x-2">
                      <Switch
                        id="enableNotifications"
                        checked={countdownData.enableNotifications}
                        onCheckedChange={(checked) =>
                          handleSwitchChange("enableNotifications", checked)
                        }
                      />
                      <Label htmlFor="enableNotifications">
                        Enable Notifications (Premium)
                      </Label>
                    </div>
                  )}
                  {countdownData.enableNotifications && (
                    <div>
                      <Label htmlFor="notificationEmail">
                        Notification Email
                      </Label>
                      <Input
                        type="email"
                        id="notificationEmail"
                        name="notificationEmail"
                        value={countdownData.notificationEmail}
                        onChange={handleChange}
                        className="mt-1"
                      />
                    </div>
                  )}
                  <div>
                    <Label htmlFor="customCSS">Custom CSS</Label>
                    <Textarea
                      id="customCSS"
                      name="customCSS"
                      value={countdownData.customCSS}
                      onChange={handleChange}
                      className="mt-1"
                      rows={5}
                      placeholder=".countdown, .countdown-content, .countdown-label, .countdown-timer, .countdown-timer-value, .countdown-timer-unit, .countdown-description"
                    />
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </div>

          {/* Center - Countdown Preview */}
          <div className="flex-1 flex items-center justify-center p-6 bg-gray-50">
            <CountdownPreview
              {...countdownData}
              createdBy={{ id: user?.id || "", name: user?.name || "" }}
              onFullscreen={() => setIsFullscreenPreview(true)}
              isFullPage={false}
            />
          </div>
        </div>

        {/* Right Sidebar */}
        <div className="w-64 bg-white p-6 border-l border-gray-200">
          <h2 className="text-xl font-bold mb-4">Actions</h2>
          <div className="space-y-4">
            <Button
              onClick={handleSubmit}
              className="w-full bg-[#00c2cb] hover:bg-[#00a7af]"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Creating..." : "Create Countdown"}
            </Button>

            <Button
              variant="outline"
              className="w-full"
              onClick={() => setIsFullscreenPreview(true)}
            >
              Preview
            </Button>
            {isPremium && (
              <Button variant="outline" className="w-full">
                Schedule Posts
              </Button>
            )}
          </div>
        </div>
      </div>

      {/* Fullscreen Preview Dialog */}
      <Dialog open={isFullscreenPreview} onOpenChange={setIsFullscreenPreview}>
        <DialogTitle></DialogTitle>
        <DialogContent className="max-w-full h-screen p-0">
          <CountdownPreview
            {...countdownData}
            createdBy={{ id: user?.id || "", name: user?.name || "" }}
            isFullPage={true}
          />
        </DialogContent>
      </Dialog>
    </Layout>
  );
}
