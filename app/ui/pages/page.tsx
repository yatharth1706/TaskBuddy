import { Button } from '@/components/ui/button';
import { Card, CardDescription } from '@/components/ui/card';
import { EditIcon, LayoutTemplateIcon } from 'lucide-react';

export default function Dashboard() {
  return (
    <div className="flex w-full gap-6 bg-[#f4f4f4] p-6 ">
      <Card className="flex h-[200px] w-[350px] flex-col items-center justify-center gap-3">
        <EditIcon className="text-gray-700" />
        <CardDescription className="text-gray-700">
          Create a new page
        </CardDescription>
      </Card>
      <Card className="flex h-[200px] w-[350px] flex-col items-center justify-center gap-3">
        <LayoutTemplateIcon className="text-gray-700" />
        <CardDescription className="text-gray-700">
          Choose from existing template
        </CardDescription>
      </Card>
    </div>
  );
}
