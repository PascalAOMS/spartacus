import { Injectable } from '@angular/core';
import { merge, Observable } from 'rxjs';
import { filter, map, switchMap, withLatestFrom } from 'rxjs/operators';
import { EventService } from '../../event/event.service';
import { PageType } from '../../model';
import { ProductSearchService } from '../../product/facade/product-search.service';
import { ProductService } from '../../product/facade/product.service';
import { createFrom } from '../../util';
import { RoutingConfigService } from '../configurable-routes/routing-config.service';
import { RoutingService } from '../facade/routing.service';
import { PageContext } from '../models/page-context.model';
import {
  CartPageVisited,
  CategoryPageVisited,
  HomePageVisited,
  KeywordSearchPageVisited,
  OrderConfirmationPageVisited,
  PageVisited,
  ProductDetailsPageVisited,
} from './routing.events';

enum PageId {
  HOME_PAGE = 'homepage',
  SEARCH = 'search',
  CART_PAGE = '/cart',
  ORDER_CONFIRMATION = '/checkout/review-order',
}

@Injectable({
  providedIn: 'root',
})
export class RoutingEventBuilder {
  constructor(
    protected routingService: RoutingService,
    protected productSearchService: ProductSearchService,
    protected eventService: EventService,
    protected productService: ProductService,
    protected routingConfigService: RoutingConfigService
  ) {
    this.register();
  }

  protected register() {
    this.eventService.register(
      KeywordSearchPageVisited,
      this.searchResultPageVisited()
    );
    this.eventService.register(
      ProductDetailsPageVisited,
      this.buildProductDetailsPageVisitedEvent()
    );
    this.eventService.register(
      CategoryPageVisited,
      this.buildCategoryPageVisitedEvent()
    );
    this.eventService.register(
      HomePageVisited,
      this.buildHomePageVisitedEvent()
    );
    this.eventService.register(CartPageVisited, this.buildCartVisitedEvent());
    this.eventService.register(PageVisited, this.buildPageVisitedEvent());
    this.eventService.register(
      OrderConfirmationPageVisited,
      this.orderConfirmationPageVisitedEvent()
    );
  }

  buildProductDetailsPageVisitedEvent(): Observable<ProductDetailsPageVisited> {
    return this.routerEvents(PageType.PRODUCT_PAGE).pipe(
      map((context) => context.id),
      switchMap((productId) => {
        return this.productService.get(productId).pipe(
          filter(Boolean),
          map((product) => {
            return createFrom(ProductDetailsPageVisited, product);
          })
        );
      })
    );
  }

  buildHomePageVisitedEvent(): Observable<HomePageVisited> {
    return this.routerEvents(PageType.CONTENT_PAGE).pipe(
      filter((pageContext) => pageContext.id === PageId.HOME_PAGE),
      map((pageContext) => createFrom(HomePageVisited, pageContext))
    );
  }

  buildPageVisitedEvent(): Observable<PageVisited> {
    return merge(
      this.routerEvents(PageType.CATALOG_PAGE),
      this.routerEvents(PageType.CATEGORY_PAGE),
      this.routerEvents(PageType.CONTENT_PAGE),
      this.routerEvents(PageType.PRODUCT_PAGE)
    ).pipe(map((pageContext) => createFrom(PageVisited, pageContext)));
  }

  buildCartVisitedEvent(): Observable<CartPageVisited> {
    return this.routerEvents(PageType.CONTENT_PAGE).pipe(
      filter((pageContext) => pageContext.id === PageId.CART_PAGE),
      map((pageContext) => createFrom(CartPageVisited, pageContext))
    );
  }

  orderConfirmationPageVisitedEvent(): Observable<
    OrderConfirmationPageVisited
  > {
    return this.routerEvents(PageType.CONTENT_PAGE).pipe(
      filter((pageContext) => pageContext.id === PageId.ORDER_CONFIRMATION),
      map((pageContext) =>
        createFrom(OrderConfirmationPageVisited, pageContext)
      )
    );
  }

  buildCategoryPageVisitedEvent(): Observable<CategoryPageVisited> {
    return this.productSearchService.getResults().pipe(
      filter(
        (searchResults) =>
          searchResults.breadcrumbs && searchResults.breadcrumbs.length > 0
      ),
      withLatestFrom(this.routingService.getPageContext()),
      filter(
        ([_searchResults, pageContext]) =>
          pageContext.type === PageType.CATEGORY_PAGE &&
          !this.isSearchPage(pageContext)
      ),
      map(([searchResults, pageContext]) => ({
        categoryCode: pageContext.id,
        categoryName: searchResults.breadcrumbs[0].facetValueName,
      })),
      map((categoryPage) => createFrom(CategoryPageVisited, categoryPage))
    );
  }

  private genericRouteEvent(routeKey: string): Observable<PageContext> {
    return this.routingService.getPageContext().pipe(
      // TODO:#corey - test this by extending the configuration and adding a custom route
      filter((pageContext) => {
        const route = this.routingConfigService.getRouteConfig(routeKey);
        return route && pageContext.cxRoute === routeKey;
      })
    );
  }

  searchResultPageVisited(): Observable<KeywordSearchPageVisited> {
    this.genericRouteEvent('search').subscribe((_) => console.log('is search'));

    return this.productSearchService.getResults().pipe(
      filter((searchResults) => Boolean(searchResults.breadcrumbs)),
      withLatestFrom(this.routingService.getPageContext()),
      filter(([_productSearchPage, pageContext]) =>
        this.isSearchPage(pageContext)
      ),
      map(([productSearchPage, _pageContext]) => ({
        searchTerm: productSearchPage.freeTextSearch,
        numberOfResults: productSearchPage.pagination.totalResults,
      })),
      map((searchResults) =>
        createFrom(KeywordSearchPageVisited, searchResults)
      )
    );
  }

  private isSearchPage(pageContext: PageContext): boolean {
    return pageContext.id === PageId.SEARCH;
  }

  private routerEvents(pageType: PageType): Observable<PageContext> {
    return this.routingService
      .getPageContext()
      .pipe(filter((context) => context.type === pageType));
  }
}
