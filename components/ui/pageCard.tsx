import React, { Dispatch, SetStateAction } from 'react';
import { Card } from './card';
import {
  Edit2Icon,
  MoreHorizontal,
  Settings,
  Settings2Icon,
  SettingsIcon,
  Trash,
  TrashIcon,
} from 'lucide-react';
import { Button } from './button';
import moment, { MomentInput } from 'moment';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from './dropdown-menu';
import { Models } from 'appwrite';

type Props = {
  page: Models.Document;
  handleDelete: (page: Models.Document) => void;
  handleEdit: (page: Models.Document) => void;
};

export default function PageCard({ page, handleDelete, handleEdit }: Props) {
  return (
    <Card
      className={
        'flex h-[200px] w-[350px] flex-col gap-3 p-4  text-sm transition-transform hover:shadow-2xl'
      }
    >
      <div className="flex items-center justify-between text-xs font-thin text-[#4F4F4F]">
        <span>
          {moment(page?.UpdatedAt as MomentInput)
            .utc()
            .format('MMMM, Do YYYY, h:mm a')}
        </span>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="link" className="h-fit p-0">
              <MoreHorizontal width={16} />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56">
            <DropdownMenuLabel>Settings</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuItem onClick={() => handleEdit(page)}>
                <span className="flex items-center gap-2">
                  <Edit2Icon width={12} />
                  Edit
                </span>
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleDelete(page)}>
                <span className="flex items-center gap-2">
                  <TrashIcon width={12} />
                  Delete
                </span>
              </DropdownMenuItem>
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <h1 className="text-lg font-bold">{page?.Name}</h1>
      <p className="text-gray-700">{page?.Description}</p>
      <Button variant={'outline'} className=" mt-auto">
        View more
      </Button>
    </Card>
  );
}
