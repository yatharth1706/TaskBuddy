import React, { Dispatch, SetStateAction } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from './dialog';
import { Card, CardDescription } from './card';
import { LayoutTemplateIcon } from 'lucide-react';
import { Models } from 'appwrite';

type Props = {
  openTemplateModal: boolean;
  setOpenTemplateModal: Dispatch<SetStateAction<boolean>>;
  pages: Models.Document[] | undefined;
  fetchingPages: Boolean;
};

export default function ChooseExistingTemplateDialog({
  openTemplateModal,
  setOpenTemplateModal,
  pages,
  fetchingPages,
}: Props) {
  return (
    <Dialog open={openTemplateModal} onOpenChange={setOpenTemplateModal}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Coming Soon...</DialogTitle>
          <DialogDescription>...</DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}
