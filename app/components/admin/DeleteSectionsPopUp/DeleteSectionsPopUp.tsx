import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import {
  GetSectionApiType,
  deleteSectionsApi,
  getSectionApi,
} from "@/app/api/apiRoutes";
import { useState, useEffect } from "react";

export default function DeleteSectionsPopUp() {
  const [sectionsListApiResponse, setSectionsListApiResponse] = useState<
    GetSectionApiType[]
  >([]);
  const [sectionsList, setSectionsList] = useState<GetSectionApiType[]>([]);
  const [searchText, setSearchText] = useState<string>("");

  const getSectionList = async (): Promise<void> => {
    const response: GetSectionApiType[] = await getSectionApi();
    setSectionsListApiResponse(response);
    setSectionsList(response);
  };

  useEffect(() => {
    getSectionList();
  }, []);

  const onSearchTextResponse = (text: string): void => {
    setSearchText(text);
    const newSectionList: GetSectionApiType[] = sectionsListApiResponse.filter(
      (section: GetSectionApiType) => {
        if (
          section.subject_name.includes(text) ||
          section.subject_description.includes(text)
        ) {
          return section;
        }
      }
    );
    setSectionsList(newSectionList);
  };

  const onDeleteButtonClick = async (id: string) => {
    const result: any = await deleteSectionsApi(id);
    if (result) {
      alert("Subject Deleted succesfully");
      await getSectionList();
    }
  };

  return (
    <div className="w-full max-w-full">
      <Dialog>
        <DialogTrigger className="w-full">
          <div className="w-full p-3 bg-white text-black border-2 rounded-lg hover:bg-gray-300 hover:text-white">
            Delete Sections
          </div>
        </DialogTrigger>
        <DialogContent className="w-10/12 min-h-[400px] max-w-full bg-slate-900 overflow-y-scroll max-h-8">
          <DialogHeader>
            <DialogTitle>
              <span className="text-2xl text-white">All Sections</span>
              <div className="w-full flex justify-center">
                <Input
                  placeholder="Enter the searched text"
                  value={searchText}
                  onChange={(e) => {
                    onSearchTextResponse(e.target.value);
                  }}
                  className="w-96 bg-slate-900 text-white"
                />
              </div>
            </DialogTitle>
            <DialogDescription>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Section ID</TableHead>
                    <TableHead>Section Name</TableHead>
                    <TableHead>Sub Subject</TableHead>
                    <TableHead>Section Description</TableHead>
                    <TableHead>Delete</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {sectionsList.map((section: GetSectionApiType) => (
                    <TableRow
                      key={section.subject_id}
                      className="text-white hover:bg-slate-800"
                    >
                      <TableCell className="font-medium">
                        {section.subject_id}
                      </TableCell>
                      <TableCell>{section.subject_name}</TableCell>
                      <TableCell>{section.sub_subject}</TableCell>
                      <TableCell>{section.subject_description}</TableCell>
                      <TableCell>
                        <Button
                          className="bg-red-600 hover:bg-red-800 w-24"
                          onClick={() =>
                            onDeleteButtonClick(section.subject_id)
                          }
                        >
                          Delete
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
}
