import { RouteRecordRaw } from "vue-router";
import { makeRemoteCheckLink } from "../usecases/remoteCheckLink.factory";

export const makeVerificationPage: RouteRecordRaw = {
  path: "/verificar/:code",
  component: () => import(`@/presentation/components/OtpComponents/Otp.vue`),
  beforeEnter: async (to, from) => {
    const { code } = to.params;
    const checkLink = makeRemoteCheckLink();

    try {
      await checkLink.check(code as string);
      return true;
    } catch (error) {
      return "/";
    }
  },
};
