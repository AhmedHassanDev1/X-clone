import { IsOptional } from "class-validator"
export class EditeUserDTO {

    @IsOptional()
    name?: string

    @IsOptional()
    bio?: string

    @IsOptional()
    location?: string

}