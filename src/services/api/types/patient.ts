import { FileEntity } from "./file-entity";

export type Patient = {
  id: number | string;
  email: string;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  photo?: FileEntity;
};
