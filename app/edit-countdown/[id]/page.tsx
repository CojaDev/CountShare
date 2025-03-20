"use client";

import type React from "react";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter, useParams } from "next/navigation";
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
import type { UserTypes } from "@/lib/userTypes";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { toast } from "react-hot-toast";
import type { CountdownData } from "@/lib/countTypes";
import Loader from "@/components/Loader";

// Helper function to format date for datetime-local input
function formatDateForInput(dateString: string): string {
  if (!dateString) return "";

  try {
    const date = new Date(dateString);
    // Check if date is valid
    if (isNaN(date.getTime())) return "";

    // Format to YYYY-MM-DDThh:mm
    return date.toISOString().slice(0, 16);
  } catch (error) {
    console.error("Error formatting date:", error);
    return "";
  }
}

export default function EditCountdown() {
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
    comments: [],
  });
  const [isFullscreenPreview, setIsFullscreenPreview] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const { data: session } = useSession();
  const router = useRouter();
  const params = useParams();
  const countdownId = params.id as string;

  const user = session?.user as UserTypes;

  useEffect(() => {
    const fetchCountdownData = async () => {
      try {
        const response = await fetch(`/api/countdowns/${countdownId}`);
        if (response.ok) {
          const data = await response.json();
          setCountdownData(data);
        } else {
          throw new Error("Failed to fetch countdown data");
        }
      } catch (error) {
        console.error("Error fetching countdown data:", error);
        toast.error("Failed to load countdown data. Please try again.");
      } finally {
        setIsLoading(false);
      }
    };

    if (countdownId) {
      fetchCountdownData();
    }
  }, [countdownId]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user?.id) {
      toast.error("You must be logged in to edit a countdown");
      return;
    }

    try {
      setIsSubmitting(true);
      const formData = new FormData();

      Object.entries(countdownData).forEach(([key, value]) => {
        if (key !== "customBackgroundImage" && key !== "comments") {
          formData.append(key, String(value));
        }
      });

      formData.append("createdBy", user.id);

      const response = await fetch(`/api/countdowns/${countdownId}`, {
        method: "PUT",
        body: formData,
      });

      if (response.ok) {
        toast.success("Countdown updated successfully!");
        router.push(`/countdowns/${countdownId}`);
      } else {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to update countdown");
      }
    } catch (error) {
      console.error("Error updating countdown:", error);
      toast.error(
        `Failed to update countdown: ${
          error instanceof Error ? error.message : "Unknown error"
        }`
      );
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
      [name]: name === "fontSize" ? Number.parseInt(value, 10) : value,
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

  if ((isLoading && !session) || isLoading) {
    return (
      <Layout>
        <Loader />
      </Layout>
    );
  }
  if (!session) {
    return (
      <Layout>
        <div className="flex items-center justify-center h-[calc(100vh-4rem)]">
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-4">
              Please log in to edit a countdown
            </h1>
            <Button onClick={() => router.push("/login")}>Log In</Button>
          </div>
        </div>
      </Layout>
    );
  }

  // Format the date for the input
  const formattedDate = formatDateForInput(countdownData.date);

  return (
    <Layout>
      <div className="flex flex-col lg:flex-row h-full lg:max-h-[calc(100vh-4rem)] bg-gray-100">
        {/* Left Sidebar */}
        <div className="w-full min-h-[calc(100vh-4rem)] lg:w-80 bg-white p-4 overflow-y-auto border-b lg:border-r border-gray-200">
          <Tabs defaultValue="basic" className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-4">
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
                    value={formattedDate}
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
                    onChange={(color) => handleColorChange("textColor", color)}
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
                        src={
                          countdownData.backgroundImage || "/placeholder.svg"
                        }
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
                    placeholder=".countdown, .countdown-content, .countdown-label, .countdown-timer, .countdown-timer-value, .countdown-timer-unit, .countdown-title, .countdown-description"
                  />
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>

        {/* Center - Countdown Preview */}
        <div className="flex-1 flex items-center justify-center p-4 lg:p-6 bg-gray-50">
          <CountdownPreview
            {...countdownData}
            createdBy={{ id: user?.id || "", name: user?.name || "" }}
            onFullscreen={() => setIsFullscreenPreview(true)}
            isFullPage={false}
          />
        </div>

        {/* Right Sidebar */}
        <div className="w-full lg:w-64 bg-white p-4 lg:p-6 border-t lg:border-l border-gray-200">
          <h2 className="text-xl font-bold mb-4">Actions</h2>
          <div className="space-y-4">
            <Button
              onClick={handleSubmit}
              className="w-full bg-[#00c2cb] hover:bg-[#00a7af]"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Updating..." : "Update Countdown"}
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
        <DialogContent className="max-w-full h-screen p-0">
          <DialogTitle />
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
