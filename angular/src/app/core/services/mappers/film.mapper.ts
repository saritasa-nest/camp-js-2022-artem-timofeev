import { Injectable } from '@angular/core';
import { OrderByDirection } from '@angular/fire/firestore';
import { Sort } from '@angular/material/sort';

import { Film } from '../../models/film';

import { FilmDto } from './dto/film.dto';

type SortFieldsNames = 'releaseDate' | 'episodeId' | 'title' | 'producer';

type SortFieldsNamesDto = 'release_date' | 'episode_id' | 'title' | 'producer';

/**
 * Firebase requires a sort request to use a value of type "OrderByDirection",
 * but matSort can return not only "asc" and "desc" but also ''.
 */
type Direction = OrderByDirection | '';

/** Firebase sorting config interface. */
interface FirebaseSortQuery {

  /** The field by which sorting occurs. */
  readonly activeField: string;

  /** Sorting direction.
   */
  readonly direction: Direction;
}

/** Film mapper. */
@Injectable({
  providedIn: 'root',
})
export class FilmMapper {

  /**
   * From Dto to Model.
   * @param dto - Dto.
   */
  public fromDto(dto: FilmDto): Film {
    return {
      id: dto.id,
      charactersIds: dto.fields.characters,
      planetsIds: dto.fields.planets,
      director: dto.fields.director,
      episodeId: dto.fields.episode_id,
      openingCrawl: dto.fields.opening_crawl,
      producer: dto.fields.producer,
      releaseDate: new Date(dto.fields.release_date),
      title: dto.fields.title,
    };
  }

  /**
   * From Model to Dto.
   * @param model - Model.
   */
  public toDto(model: Film): FilmDto {
    return {
      id: model.id,
      fields: {
        title: model.title,
        director: model.director,
        opening_crawl: model.openingCrawl,
        producer: model.producer,
        release_date: model.releaseDate.toISOString(),
        characters: model.charactersIds,
        planets: model.planetsIds,
        episode_id: model.episodeId,
      },
    };
  }

  /**
   * From Model SortConfig to Dto Sort query.
   * @param sortConfig - Sorting config.
   */
  public toDtoSortConfig(sortConfig: Sort): FirebaseSortQuery {
    const sortField = sortConfig.active as SortFieldsNames;
    return {
      activeField: `fields.${this.sortFieldsNamesDto[sortField]}`,
      direction: sortConfig.direction ?? 'asc',
    };
  }

  private readonly sortFieldsNamesDto: Record<SortFieldsNames, SortFieldsNamesDto> = {
    releaseDate: 'release_date',
    episodeId: 'episode_id',
    title: 'title',
    producer: 'producer',
  };
}
