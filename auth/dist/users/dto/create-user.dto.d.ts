export declare class CreateUserDto {
  readonly _id?: string;
  readonly name: string;
  readonly email: string;
  readonly password: string;
  readonly phone?: string;
  whatsapp: string;
  telegram: string;
  viber: string;
  readonly photo?: string;
  readonly isActivated: boolean;
  readonly linkForActivated: string;
  readonly changePasswordLink: string;
  paid: boolean;
  paidTime: string;
}
