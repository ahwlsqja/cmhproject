import { PartialType, PickType } from "@nestjs/mapped-types";
import { Users } from "../entities/user.entity";

export class UpdatehostDto extends PartialType(Users) {
    IsVaildated?: boolean;
}
