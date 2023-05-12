'use client';

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Card, CardDescription } from '@/components/ui/card';
import { EditIcon, LayoutTemplateIcon } from 'lucide-react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { useState } from 'react';

export default function Dashboard() {
  const [openCreateModal, setOpenCreateModal] = useState(false);
  const [openTemplateModal, setOpenTemplateModal] = useState(false);

  const toggleCreateModal = () => {
    setOpenCreateModal(!openCreateModal);
  };

  return (
    <div className="flex w-full flex-col gap-6 bg-[#f4f4f4] p-8">
      <h1>Your Pages</h1>
      <div className="flex w-full gap-6 bg-[#f4f4f4]">
        <Dialog open={openCreateModal} onOpenChange={setOpenCreateModal}>
          <DialogTrigger asChild>
            <Card className="flex h-[200px] w-[350px] cursor-pointer flex-col items-center justify-center gap-3 transition-transform hover:scale-105 hover:shadow-2xl">
              <EditIcon className="text-gray-700" />
              <CardDescription className="text-gray-700">
                Create a new page
              </CardDescription>
            </Card>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Edit profile</DialogTitle>
              <DialogDescription>
                Make changes to your profile here. Click save when you're done.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="name" className="text-right">
                  Name
                </Label>
                <Input id="name" value="Pedro Duarte" className="col-span-3" />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="username" className="text-right">
                  Username
                </Label>
                <Input id="username" value="@peduarte" className="col-span-3" />
              </div>
            </div>
            <DialogFooter>
              <Button type="submit" onClick={() => toggleCreateModal()}>
                Save changes
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        <Dialog open={openTemplateModal} onOpenChange={setOpenTemplateModal}>
          <DialogTrigger asChild>
            <Card className="flex h-[200px] w-[350px] cursor-pointer flex-col items-center justify-center gap-3 transition-transform hover:scale-105  hover:shadow-2xl">
              <LayoutTemplateIcon className="text-gray-700" />
              <CardDescription className="text-gray-700">
                Choose from existing template
              </CardDescription>
            </Card>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Coming Soon...</DialogTitle>
              <DialogDescription>...</DialogDescription>
            </DialogHeader>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}
