import { IsNotEmpty, IsString } from "class-validator";

// login formundan gönderilen değerleri yakalayacağımız model
export class Login {

  @IsNotEmpty({ message: 'username boş geçilemez' })
  @IsString()
  username: string;

  @IsNotEmpty({ message: "parola boş geçilemez" })
  @IsString()
  password: string;
}