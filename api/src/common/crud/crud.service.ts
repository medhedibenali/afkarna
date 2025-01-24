import { NotFoundException } from "@nestjs/common";
import {
  DeepPartial,
  DeleteResult,
  FindOptionsRelations,
  FindOptionsWhere,
  Repository,
} from "typeorm";
import { EntityDto } from "../dto/entity.dto";
import { SearchDto } from "../dto/search.dto";
import { Pagination } from "../dto/pagination.dto";

export abstract class CrudService<Entity extends EntityDto> {
  constructor(protected readonly repository: Repository<Entity>) {}

  create(createEntityDto: DeepPartial<Entity>): Promise<Entity> {
    const entity: Entity = this.repository.create(createEntityDto);

    return this.repository.save(entity);
  }

  async findAll(
    searchDto: SearchDto,
    where?: FindOptionsWhere<Entity> | FindOptionsWhere<Entity>[],
    relations?: FindOptionsRelations<Entity>,
  ): Promise<Pagination<Entity>> {
    const { take = 500, skip = 0 } = searchDto;

    const [data, count] = await this.repository.findAndCount({
      where,
      relations,
      take,
      skip,
    });

    return {
      data,
      count,
    };
  }

  async findOne(
    id: string,
    relations?: FindOptionsRelations<Entity>,
  ): Promise<Entity> {
    const entity = await this.repository.findOne({
      relations,
      where: { id: id as any },
    });

    if (!entity) {
      throw new NotFoundException();
    }

    return entity;
  }

  async update(
    id: string,
    updateEntityDto: DeepPartial<Entity>,
  ): Promise<Entity> {
    const entity = await this.repository.preload({ id, ...updateEntityDto });

    if (!entity) {
      throw new NotFoundException();
    }

    return this.repository.save(entity);
  }

  async remove(id: string): Promise<DeleteResult> {
    const result = await this.repository.delete(id);

    if (!result.affected) {
      throw new NotFoundException();
    }

    return result;
  }
}
