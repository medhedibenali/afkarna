import { Controller, Get, Param, Query } from "@nestjs/common";
import { UsersService } from "./users.service";
import { SearchDto } from "../common/dto/search.dto";
import { Public } from "src/auth/decorators/public.decorator";

@Controller("users")
@Public()
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  findAll(@Query() searchDto: SearchDto) {
    return this.usersService.findAll(searchDto);
  }

  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.usersService.findOne(id);
  }
}
