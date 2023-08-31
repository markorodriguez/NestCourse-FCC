import { Controller, Post, Get, Req, Body } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { AuthDTO } from "./dto";

@Controller("auth") // Global prefix
export class AuthController {

    constructor(private authService: AuthService) { // Dependency injection to avoid handle instances
    }

    @Post("signup")
    signup(@Body("email") email: string, @Body("password") password: string) {
      console.log(email, password)
      return this.authService.signup()
    }


    @Post("signin")
    signin() {
       return this.authService.signin()
    }

}