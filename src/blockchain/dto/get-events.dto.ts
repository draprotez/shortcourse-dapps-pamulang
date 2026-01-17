import { ApiProperty } from "@nestjs/swagger";

export class GetEventsDto {
    @ApiProperty({
        description: 'The starting',
        example: 50605638
,
    })
    fromBlock: number;

    @ApiProperty({
        description: 'The ending',
        example: 50607638
,
    })
    toBlock: number;
}