import { api } from "@/shared/lib/fetch";
import { FetchContracts } from "@/shared/lib/fetch/fetch-contracts";
import { ProfileResponseSchema } from "./auth.contracts";
import { ITokenResponse } from "./auth.type";

export class AuthenticationService {
  private static instance: AuthenticationService;
  private constructor() {}

  static getInstance(): AuthenticationService {
    if (!AuthenticationService.instance) {
      AuthenticationService.instance = new AuthenticationService();
    }
    return AuthenticationService.instance;
  }

  async getProfile() {
    const response = await api
      .get(`v1/auth/me`)
      .then((res) => {
        return res;
      })
      .then(FetchContracts.responseContract(ProfileResponseSchema))
      .catch((err) => {
        throw err;
      });
    return response;
  }

  async refreshToken(token: string) {
    const response = await api
      .post<ITokenResponse>(`v1/auth/refresh`, {
        refresh_token: token,
      })
      .catch((err) => {
        throw err;
      });
    return response;
  }
}

export const authService = AuthenticationService.getInstance();
