import { useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"

interface ProfileSettingsProps {
  user: {
    name: string
    email: string
    bio: string
    pfp: string
  }
  isCredentialsUser: boolean
  onSave: (userData: any) => void
  onDelete: () => void
  isOpen: boolean
  onClose: () => void
}

export function ProfileSettings({ user, isCredentialsUser, onSave, onDelete, isOpen, onClose }: ProfileSettingsProps) {
  const [userData, setUserData] = useState(user)
  const [previewImage, setPreviewImage] = useState(user.pfp)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setUserData((prev) => ({ ...prev, [name]: value }))
  }

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setPreviewImage(reader.result as string)
        setUserData((prev) => ({ ...prev, pfp: reader.result as string }))
      }
      reader.readAsDataURL(file)
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSave(userData)
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit Profile</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="flex flex-col items-center">
            <Avatar className="h-24 w-24 cursor-pointer" onClick={() => fileInputRef.current?.click()}>
              <AvatarImage src={previewImage} alt={userData.name} />
              <AvatarFallback>{userData.name.charAt(0)}</AvatarFallback>
            </Avatar>
            <input type="file" ref={fileInputRef} onChange={handleImageChange} accept="image/*" className="hidden" />
            <Button type="button" variant="ghost" size="sm" onClick={() => fileInputRef.current?.click()}>
              Change Picture
            </Button>
          </div>
          <div>
            <Label htmlFor="name">Name</Label>
            <Input id="name" name="name" value={userData.name} onChange={handleChange} required />
          </div>
          <div>
            <Label htmlFor="bio">Bio</Label>
            <Textarea id="bio" name="bio" value={userData.bio} onChange={handleChange} />
          </div>
          {isCredentialsUser && (
            <>
              <div>
                <Label htmlFor="email">Email</Label>
                <Input id="email" name="email" type="email" value={userData.email} onChange={handleChange} required />
              </div>
              <div>
                <Label htmlFor="password">New Password</Label>
                <Input id="password" name="password" type="password" onChange={handleChange} />
              </div>
            </>
          )}
          <DialogFooter>
            <Button type="submit" className="bg-[#00c2cb] hover:bg-[#00a7af]">
              Save Changes
            </Button>
          </DialogFooter>
        </form>
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button variant="destructive">Delete Account</Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
              <AlertDialogDescription>
                This action cannot be undone. This will permanently delete your account and remove your data from our
                servers.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction onClick={onDelete} className="bg-red-600 hover:bg-red-700">
                Yes, delete my account
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </DialogContent>
    </Dialog>
  )
}

