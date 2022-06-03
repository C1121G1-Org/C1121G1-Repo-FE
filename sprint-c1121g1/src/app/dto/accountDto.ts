export interface AccountDto {
  id?: number;
  userName?: string;
  encryptPassword?: string;
  email?: string;
  isEnabled?: boolean;
  verificationCode?: string;
}
