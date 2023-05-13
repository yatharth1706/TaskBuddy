import React, { Dispatch, SetStateAction, useEffect, useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from './dialog';
import { EditIcon, Loader2 } from 'lucide-react';
import { Label } from './label';
import { Input } from './input';
import { Button } from './button';
import { useTaskBuddyContext } from '@/context/TaskBuddyContext';
import { toast } from './use-toast';
import { Models } from 'appwrite';

type Props = {
  openEditModal: boolean;
  setOpenEditModal: Dispatch<SetStateAction<boolean>>;
  toggleEditModal: () => void;
  fetchPages: () => void;
  page: Models.Document;
};

export default function EditPageDialog({
  openEditModal,
  setOpenEditModal,
  toggleEditModal,
  fetchPages,
  page,
}: Props) {
  const [name, setName] = useState(page?.Name);
  const [description, setDescription] = useState(page?.Description);
  const [isLoading, setIsLoading] = useState(false);
  const { editPage } = useTaskBuddyContext();

  useEffect(() => {
    setName(page?.Name);
    setDescription(page?.Description);
  }, [page]);

  const handleSave = async () => {
    try {
      setIsLoading(true);
      await editPage(name, description, page.$id);
      toast({
        title: 'Success',
        description: 'Page updated successfully',
      });
      fetchPages();
      toggleEditModal();
    } catch (err) {
      toast({
        title: 'Error',
        description: String(err),
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={openEditModal} onOpenChange={setOpenEditModal}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <EditIcon width={16} /> Edit Page
          </DialogTitle>
          <DialogDescription>
            You can modify below values according to your choice
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Name
            </Label>
            <Input
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="description" className="text-right">
              Description
            </Label>
            <textarea
              id="description"
              className="col-span-3 flex h-[100px] w-full resize-none rounded-md border border-input bg-transparent px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
        </div>
        <DialogFooter>
          {isLoading ? (
            <Button disabled>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Saving changes
            </Button>
          ) : (
            <Button type="submit" onClick={handleSave}>
              Save changes
            </Button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
