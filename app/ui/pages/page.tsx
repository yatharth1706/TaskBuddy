'use client';

import { Button } from '@/components/ui/button';
import { EditIcon, LayoutTemplateIcon } from 'lucide-react';
import { useEffect, useState } from 'react';
import CreatePageDialog from '@/components/ui/createPageDialog';
import ChooseExistingTemplateDialog from '@/components/ui/chooseExistingTemplateDialog';
import { Description } from '@radix-ui/react-toast';
import { toast } from '@/components/ui/use-toast';
import { useTaskBuddyContext } from '@/context/TaskBuddyContext';
import { Models } from 'appwrite';
import PageCard from '@/components/ui/pageCard';
import { pageProps } from '@/types';
import EditPageDialog from '@/components/ui/editPageDialog';
import DeletePageDialog from '@/components/ui/deletePageDialog';
import Image from 'next/image';

type PagesProps = {
  Name: String;
  Description: String;
};

export default function Dashboard() {
  const [openCreateModal, setOpenCreateModal] = useState(false);
  const [openTemplateModal, setOpenTemplateModal] = useState(false);
  const [openEditModal, setOpenEditModal] = useState(false);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [currPage, setCurrPage] = useState<Models.Document | undefined>();
  const [pages, setPages] = useState<Models.Document[] | undefined>([]);
  const [fetchingPages, setFetchingPages] = useState(false);
  const { listPages } = useTaskBuddyContext();

  useEffect(() => {
    fetchPages();
  }, []);

  const fetchPages = async () => {
    try {
      setPages([]);
      setFetchingPages(true);
      const loggedInUser = JSON.parse(
        localStorage.getItem('UserInfo') as string,
      );
      const response = await listPages(loggedInUser?.$id);
      console.log(response);
      setPages(response?.documents);
    } catch (err) {
      toast({
        title: 'Error',
        description: String(err),
      });
    } finally {
      setFetchingPages(false);
    }
  };

  const toggleCreateModal = () => {
    setOpenCreateModal(!openCreateModal);
  };

  const toggleTemplateModal = () => {
    setOpenTemplateModal(!openTemplateModal);
  };

  const toggleEditModal = () => {
    setOpenEditModal(!openEditModal);
  };

  const toggleDeleteModal = () => {
    setOpenDeleteModal(!openDeleteModal);
  };

  const handleDelete = (page: Models.Document) => {
    setCurrPage(page);
    setOpenDeleteModal(true);
  };

  const handleEdit = (page: Models.Document) => {
    setCurrPage(page);
    setOpenEditModal(true);
  };

  return (
    <div className="flex w-full flex-col gap-3  px-6 py-6">
      <div className="flex justify-between">
        <div className="flex items-center gap-3">
          <span>Your Pages </span>
          {fetchingPages && (
            <div role="status" className="flex justify-center">
              <svg
                aria-hidden="true"
                className="mr-2 h-6 w-6 animate-spin fill-[#22BDFF] text-gray-200 dark:text-gray-600"
                viewBox="0 0 100 101"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                  fill="currentColor"
                />
                <path
                  d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                  fill="currentFill"
                />
              </svg>
              <span className="sr-only">Loading...</span>
            </div>
          )}
        </div>
        <div className="flex gap-4">
          <Button onClick={toggleCreateModal} className="gap-2">
            <EditIcon width={12} /> Create a new page
          </Button>
        </div>
      </div>

      {(pages as []).length === 0 && (
        <div className="flex flex-grow flex-col items-center gap-4 pt-10">
          <Image
            src="/TasksPreview.jpg"
            alt="Tasks Preview"
            width="300"
            height="300"
          />
          <span className="text-sm font-medium text-gray-700">
            No pages yet
          </span>
        </div>
      )}
      <div className="flex w-full gap-6 ">
        {(pages as [])?.map((page: Models.Document, index) => (
          <PageCard
            page={page}
            key={index}
            handleEdit={handleEdit}
            handleDelete={handleDelete}
          />
        ))}

        <CreatePageDialog
          openCreateModal={openCreateModal}
          setOpenCreateModal={setOpenCreateModal}
          toggleCreateModal={toggleCreateModal}
          fetchPages={fetchPages}
          pages={pages}
          fetchingPages={fetchingPages}
        />
        <EditPageDialog
          fetchPages={fetchPages}
          openEditModal={openEditModal}
          page={currPage as Models.Document}
          setOpenEditModal={setOpenEditModal}
          toggleEditModal={toggleEditModal}
        />
        <DeletePageDialog
          fetchPages={fetchPages}
          openDeleteModal={openDeleteModal}
          page={currPage as Models.Document}
          setOpenDeleteModal={setOpenDeleteModal}
          toggleDeleteModal={toggleDeleteModal}
        />
        <ChooseExistingTemplateDialog
          openTemplateModal={openTemplateModal}
          setOpenTemplateModal={setOpenTemplateModal}
          pages={pages}
          fetchingPages={fetchingPages}
        />
      </div>
    </div>
  );
}
