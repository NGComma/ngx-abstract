import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';

import { AbsCustomDataService } from '@ngcomma/ngx-abstract/data';

@Injectable()
export abstract class AbsCollectionService<T> extends AbsCustomDataService<T> {
  abstract uniqueKey: keyof T;
  abstract entityName: string;
  abstract pluralEntityName: string;
  filteredEntities$ = this.entities$.pipe(
    map((entities) =>
      entities.sort((a, b) => b[this.uniqueKey] - a[this.uniqueKey])
    )
  );

  constructor(readonly http: HttpClient) {
    super();
  }

  private get pluralPath(): string {
    return this.pluralEntityName.toLowerCase();
  }

  private get singlePath(): string {
    return this.entityName.toLowerCase();
  }

  getAll(params?: Record<string, any>): Observable<T[]> {
    return this.http
      .get<T[]>(this.pluralPath, { params })
      .pipe(tap((entities) => this.addEntities(entities)));
  }

  getByKey(key: number | string): Observable<T> {
    return this.http
      .get<T>(`${this.singlePath}/${key}`)
      .pipe(tap((newEntity) => this.updateOrAdd(key, newEntity)));
  }

  add(entity: T): Observable<T> {
    return this.http
      .get<T>(this.singlePath, entity)
      .pipe(tap((newEntity) => this.addEntity(newEntity)));
  }

  update(entity: Partial<T>): Observable<T> {
    return this.http
      .get<T>(`${this.singlePath}/${entity[this.uniqueKey]}`, entity)
      .pipe(tap((newEntity) => this.updateEntity(newEntity)));
  }

  delete(entity: T): Observable<void> {
    return this.http
      .get<void>(`${this.singlePath}/${entity[this.uniqueKey]}`, entity)
      .pipe(tap(() => this.deleteEntities([entity])));
  }
}
