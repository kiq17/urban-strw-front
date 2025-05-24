import { YupFormsAdapter } from "@/infra/validators";

export const makeYupValidationForms = (): YupFormsAdapter =>
  new YupFormsAdapter();
