/* tslint:disable:variable-name */
import { CollectionViewer, DataSource } from "@angular/cdk/collections";
import { BehaviorSubject, Observable, Subscription } from "rxjs";
import { take } from "rxjs/operators";

export type nextPageCb<T> = (page: number) => Observable<T[]>;

/**
 * A more complex **CDK DataSource** that supports pagination.
 *
 * Docs not ready!
 *
 * @example
 * ```ts
 * class MyPaginationService extends AbsPaginationDataService<YourDataInterface> {
 *   pageSize = 20
 * }
 * ```
 *
 * Component template
 * ```html
 * <cdk-virtual-scroll-viewport>
 *   <div *cdkVirtualFor="let entity of dataService">{{entity | json}}</div>
 * </<cdk-virtual-scroll-viewport>
 * ```
 */
/** @dynamic */
export abstract class AbsDataService<T> extends DataSource<T> {
  pageSize = 50;
  private _subscription = new Subscription();
  private _pageCache = new Set<number>();
  private _loadingData = false;

  constructor(
    readonly nextPageCb$: nextPageCb<T>,
    readonly onDestroy?: () => void
  ) {
    super();
  }

  private _results$ = new BehaviorSubject<T[]>([]);

  get results$(): BehaviorSubject<T[]> | Observable<T[]> {
    return this._results$;
  }

  get count(): number {
    return this._results$.getValue().length;
  }

  stopListeningToSubscription(): void {
    if (!this._subscription.closed) {
      this._subscription.unsubscribe();
    }
  }

  connect(collectionViewer: CollectionViewer): Observable<T[]> {
    this.getNewPage(1); // Loads first page
    this._subscription.add(
      collectionViewer.viewChange.subscribe(({ end }) => {
        this.getNewPage(this._getPageForIndex(end + 10)); // Add 10 rows to trigger loading before list ends
      })
    );
    return this.results$;
  }

  disconnect(collectionViewer: CollectionViewer): void {
    this.stopListeningToSubscription();
    this.onDestroy?.();
  }

  private _getPageForIndex(index: number): number {
    return Math.floor(index / this.pageSize) + 1; // Start page numbers from 1
  }

  private getNewPage(page: number): void {
    if (!this._pageCache.has(page) && !this._loadingData) {
      this._loadingData = true;
      this.nextPageCb$(page)
        .pipe(take(1))
        .subscribe((entities) => {
          const currentEntities = this._results$.getValue();
          this._results$.next([...currentEntities, ...entities]);
          this._pageCache.add(page);
          this._loadingData = false;

          /**
           * Stop sending the requests if the previous entities are less than pageSize
           * Avoid sending empty requests
           */
          if (entities?.length < this.pageSize) {
            this.stopListeningToSubscription();
          }
        });
    }
  }
}
