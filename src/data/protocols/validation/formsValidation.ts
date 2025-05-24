import { Authentication } from "@/domain/usecases";
import { SignUp } from "@/domain/usecases/signUp.case";
import { DeliveryData, SelfData } from "@/domain/models";

export interface FormsValidation {
  auth: (data: Authentication.Params) => Record<string, string> | void;
  signUp: (data: SignUp.Params) => Record<string, string> | void;
  selfData: (data: SelfData) => Record<string, string> | void;
  deliveryData: (data: DeliveryData) => Record<string, string> | void;
}
