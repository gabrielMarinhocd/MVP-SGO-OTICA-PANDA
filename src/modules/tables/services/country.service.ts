import { DecimalPipe } from '@angular/common';
import { Injectable, PipeTransform } from '@angular/core';
import { listOrders } from '@modules/charts/data/orders';
import { Order } from '@modules/charts/models/orders.model';

import { SortDirection } from '@modules/tables/directives';
import { SessionService } from 'core/session.service';
import { BehaviorSubject, Observable, of, Subject } from 'rxjs';
import { debounceTime, delay, switchMap, tap } from 'rxjs/operators';

const COUNTRIES = listOrders;
interface SearchResult {
    countries: Order[];
    total: number;
}

interface State {
    page: number;
    pageSize: number;
    searchTerm: string;
    sortColumn: string;
    sortDirection: SortDirection;
    filterDate: string;
    filterCliente: any;
    filterStatus: string;
    filterPagamento: string;
    filterArmacao: string;
}

function compare(v1: any, v2: any) {
    return v1 < v2 ? -1 : v1 > v2 ? 1 : 0;
}

function formateText(a: []) {

    let b: string = '';
    debugger
    if(a != null){
        a.forEach((a: any) => {
            b = `${b + a}`;
        });
    }

    return b;
}

function sort(countries: Order[], column: string, direction: string): Order[] {
   
    if (direction === '') {
        return countries;
    } else {
        return [...countries].sort((a: any, b: any) => {
           
            const res = compare(a[column], b[column]);
            return direction === 'asc' ? res : -res;
        });
    }
}

function matches(order: Order, term: string, pipe: PipeTransform) {
    return (
        order.cliente?.toLowerCase().includes(term.toLowerCase())
        //  ||
        // pipe.transform(order.data).includes(term) ??
    );
    // ||
    // pipe.transform(Order.population).includes(term)
}



@Injectable({ providedIn: 'root' })
export class CountryService {
    private _loading$ = new BehaviorSubject<boolean>(true);
    private _search$ = new Subject<void>();
    private _filter$ = new Subject<void>();
    private _countries$ = new BehaviorSubject<Order>(new Order());
    private _total$ = new BehaviorSubject<number>(0);

    private _state: State = {
        page: 1,
        pageSize: 4,
        searchTerm: '',
        sortColumn: '',
        sortDirection: '',
        filterDate: '',
        filterCliente: '',
        filterStatus: '',
        filterPagamento: '',
        filterArmacao: '',
    };

    constructor(private pipe: DecimalPipe, private sessionService: SessionService) {
       
        this._search$
            .pipe(
                tap(() => this._loading$.next(true)),
                debounceTime(120),
                switchMap(() => this._search()),
                delay(120),
                tap(() => this._loading$.next(false))
            )
            .subscribe((result: any) => {
                this._countries$.next(result.countries);
                this._total$.next(result.total);
            });

        this._search$.next();
    }

    get countries$() {
       
        return this._countries$;
    }
    get total$() {
        return this._total$;
    }
    get loading$() {
        return this._loading$;
    }
    get page() {
        return this._state.page;
    }
    set page(page: number) {
        this._set({ page });
    }
    get pageSize() {
        return this._state.pageSize;
    }
    set pageSize(pageSize: number) {
        this._set({ pageSize });
    }
    get filterDate() {
        return this._state.filterDate;
    }
    get filterCliente() {
        return this._state.filterCliente;
    }
    get filterStatus() {
        return this._state.filterStatus;
    }
    get filterPagamento() {
        return this._state.filterPagamento;
    }
    get filterArmacao() {
        return this._state.filterArmacao;
    }
    get searchTerm() {
        return this._state.searchTerm;
    }

    set searchTerm(searchTerm: string) {
        this._set({ searchTerm });
    }
    set sortColumn(sortColumn: string) {
        this._set({ sortColumn });
    }
    set sortDirection(sortDirection: SortDirection) {
        this._set({ sortDirection });
    }
    set filterDate(filterDate: string) {
        this._set({ filterDate });
    }
    set filterCliente(filterCliente: string) {
        this._set({ filterCliente });
    }
    set filterStatus(filterStatus: string) {
        this._set({ filterStatus });
    }
    set filterPagamento(filterPagamento: string) {
        this._set({ filterPagamento });
    }
    set filterArmacao(filterArmacao: string) {
        this._set({ filterArmacao });
    }

    private _set(patch: Partial<State>) {
        Object.assign(this._state, patch);
        this._search$.next();
    }

    private _search(): Observable<SearchResult> {
        debugger
        let countries:any
        const {
            sortColumn,
            sortDirection,
            pageSize,
            page,
            searchTerm,
            filterDate,
            filterCliente,
            filterStatus,
            filterPagamento,
            filterArmacao,
        } = this._state;

        // 1. sort
        if(this.sessionService.getItem('listOrders')){
            countries = this.sessionService.getItem('listOrders')
        }else{
            countries = COUNTRIES
        }
         countries = sort(countries, sortColumn, sortDirection);
        // 2. filter
        if (searchTerm != '') {
            countries = countries.filter((Order: Order) => matches(Order, searchTerm, this.pipe));
        }

        if (filterDate != '') {
            countries = countries.filter((Order: { data: string; }) => Order.data == filterDate);
        }

        debugger 

        if (filterCliente != '') {
            countries = countries.filter(
                (                Order: any) =>
                    formateText(Order.cliente?.toLocaleLowerCase().split(' ')) ===
                    formateText(filterCliente.toLocaleLowerCase().split(' '))
            );
        }


        if (filterStatus != '') {
            countries = countries.filter((Order: { status: string; }) => Order.status == filterStatus);
        }

        if (filterPagamento != '') {
            countries = countries.filter((Order: { formaPagamento: string; }) => Order.formaPagamento == filterPagamento);
        }

        if (filterArmacao != '') {
            countries = countries.filter((Order: { noArmacao: string; }) => Order.noArmacao == filterArmacao);
        }

        // 3. paginate
        const total = countries.length;
        countries = countries.slice((page - 1) * pageSize, (page - 1) * pageSize + pageSize);
        return of({ countries, total });
    }
}
