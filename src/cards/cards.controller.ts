import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from "@nestjs/common"
import { CardsService } from "./cards.service";
import { CreateCardDto } from "./dto/create-card.dto";
import { UpdateCardDto } from "./dto/update-card.dto";
import { AuthGuard } from "@nestjs/passport";
import { Users } from "src/users/entities/user.entity";       

@UseGuards(AuthGuard('jwt'))
@Controller("cards")
export class CardsController {
  constructor(private readonly cardsService: CardsService) {}

  
  // 카드 상세 조회
  @Get(":id")
  async findCard(@Param("id") id: string) {
    return this.cardsService.getCardsByColumnId(+id);
  }

  // 카드 생성
  @Post(':cardId')
  async createCard(
    @Param('cardId') cardId: number,
    @Body() CreateCardDto: CreateCardDto,
  ) {
    await this.cardsService.createCard(
      Users.id,
      CreateCardDto.content,
    );
  }

  // 카드 수정 / 담당자 변경
  @Patch(":id")
  async updateCard(
    @Param('id') id: number,
    @Body() UpdateCardDto: UpdateCardDto,
  ) {
    await this.cardsService.updateCard(
      id,
      UpdateCardDto.title,
      UpdateCardDto.content,
    );
  }

  // 카드 삭제
  @Delete(":id")
  async deleteCard( 
    @Param('id') id: number) {
    await this.cardsService.deleteCard(id, Users.id);
  }

  // 작업자 할당



  // 작업자 변경



  // 칼럼 내 위치 변경



}

function UserInfo(): (target: CardsController, propertyKey: "createCard", parameterIndex: 0) => void {
  throw new Error("Function not implemented.");
}

