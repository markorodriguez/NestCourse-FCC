import { Controller, Post, Get, Req, Body, ParseIntPipe } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { AuthDTO } from "./dto";

@Controller("auth") // Global prefix
export class AuthController {

  constructor(private authService: AuthService) { // Dependency injection to avoid handle instances
  }

  @Post("signup")
  signup(
  @Body() dto: AuthDTO){ 
  // @Body("email") email: string,  Instead of creating a pipe for every value, we create it in the DTO
  //@Body("password", ParseIntPipe) password: string) { // Pipelines
    // console.log(dto)
    return this.authService.signup(dto)
  }


  @Post("signin")
  signin() {
    return this.authService.signin()
  }

}