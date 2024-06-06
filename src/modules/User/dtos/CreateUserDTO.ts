import { Profiles } from '#/@types/enums';

export interface CreateUserDTO {
  name: string;
  email: string;
  password: string;
  phone?: string;
  profile: Profiles;
}
