import { Profiles } from '#/@types/types';

export interface CreateUserDTO {
  name: string;
  email: string;
  password: string;
  phone?: string;
  profile: Profiles;
}
