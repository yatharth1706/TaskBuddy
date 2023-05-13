import React, { Dispatch, SetStateAction, useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from './dialog';
import { EditIcon, Loader2 } from 'lucide-react';
import { Button } from './button';
import { useTaskBuddyContext } from '@/context/TaskBuddyContext';
import { toast } from './use-toast';
import { Models } from 'appwrite';

type Props = {
  openDeleteModal: boolean;
  setOpenDeleteModal: Dispatch<SetStateAction<boolean>>;
  toggleDeleteModal: () => void;
  fetchPages: () => void;
  page: Models.Document;
};

export default function DeletePageDialog({
  openDeleteModal,
  setOpenDeleteModal,
  toggleDeleteModal,
  fetchPages,
  page,
}: Props) {
  const [name, setName] = useState(page?.Name);
  const [description, setDescription] = useState(page?.Description);
  const [isLoading, setIsLoading] = useState(false);
  const { deletePage } = useTaskBuddyContext();

  const handleDelete = async () => {
    try {
      setIsLoading(true);
      await deletePage(page.$id);
      toast({
        title: 'Success',
        description: 'Page deleted successfully',
      });
      fetchPages();
      toggleDeleteModal();
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
    <Dialog open={openDeleteModal} onOpenChange={setOpenDeleteModal}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <EditIcon width={16} /> Delete Page
          </DialogTitle>
          <DialogDescription>
            Are you sure you want to delete this page:{' '}
            <span className="font-bold">{page?.Name}</span> ?
          </DialogDescription>
        </DialogHeader>

        <DialogFooter>
          {isLoading ? (
            <Button disabled>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Deleting
            </Button>
          ) : (
            <Button type="submit" onClick={handleDelete}>
              Delete
            </Button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
