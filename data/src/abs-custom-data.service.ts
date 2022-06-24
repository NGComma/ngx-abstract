import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

/**
 *
 */
@Injectable()
export abstract class AbsCustomDataService<T> {
  entities$ = new BehaviorSubject<T[]>([]);
  count$ = new BehaviorSubject(0);

  get entities(): T[] {
    return this.entities$.getValue();
  }

  get count(): number {
    return this.count$.getValue();
  }

  private get uniqueEntities(): Set<T> {
    return new Set([...this.entities]);
  }

  addEntities(entities: T[], updateCount = true): void {
    entities.forEach((entity) => {
      this.uniqueEntities.add(entity);
    });
    this.entities$.next([...this.uniqueEntities]);
    if (updateCount) {
      this.setCount(this.uniqueEntities.size);
    }
    this.uniqueEntities.clear();
  }

  setEntities(entities: T[], updateCount = true): void {
    this.entities$.next(entities);
    if (updateCount) {
      this.setCount(entities.length);
    }
  }

  addEntity(entity: T, updateCount = true): void {
    this.uniqueEntities.add(entity);
    this.entities$.next([...this.uniqueEntities]);
    if (updateCount) {
      this.setCount(this.count + 1);
    }
    this.uniqueEntities.clear();
  }

  deleteEntities(entities: T[], updateCount = true): void {
    const newEntities = this.entities.filter(
      (entity) => !entities.includes(entity)
    );
    this.entities$.next(newEntities);
    if (updateCount) {
      this.setCount(this.count - entities.length);
    }
  }

  updateOrAdd(key: number | string, entity: T, updateCount = true): void {
    // @ts-ignore
    const indexOf = this.entities.findIndex((e) => e[key] === entity[key]);
    if (indexOf !== -1) {
      const entities = this.entities.slice();
      entities.splice(indexOf, 1, entity);
      this.entities$.next(entities);
    } else {
      this.addEntity(entity, updateCount);
    }
  }

  updateEntity(entity: T): void {
    const indexOf = this.entities.indexOf(entity);
    const entities = this.entities.slice();
    if (indexOf !== -1) {
      entities.splice(indexOf, 1, entity);
      this.entities$.next(entities);
    }
  }

  setCount(count: number): void {
    this.count$.next(count);
  }
}
