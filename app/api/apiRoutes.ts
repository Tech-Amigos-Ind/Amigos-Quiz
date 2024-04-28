"use client";

export const getApi = async () => {
  try {
    const response: Response = await fetch(
      "https://gamewithcolors.online/getTime",
      {
        method: "POST",
      }
    );
    return await response.json();
  } catch {
    console.log("Failed api get sample");
  }
};

export const postSectionsApi = async (
  name: string,
  subsection: string,
  description: string
) => {
  try {
    const response: Response = await fetch(
      "https://gamewithcolors.online/exams/subjects",
      {
        method: "POST",
        body: JSON.stringify({
          subject_name: name,
          subject_description: description,
          sub_section: subsection,
          user: "Test User",
        }),
      }
    );
    return await response.json();
  } catch {
    console.log("Failed api post section");
  }
};

export type GetSectionApiType = {
  subject_id: string;
  subject_name: string;
  subject_description: string;
  sub_subject: string;
  user: string;
};

export const getSectionApi = async (): Promise<GetSectionApiType[]> => {
  try {
    const response: Response = await fetch(
      "https://gamewithcolors.online/exams/subjects",
      {
        method: "GET",
      }
    );
    return await response.json();
  } catch {
    console.log("Failed api get section");
    return [];
  }
};