import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    Input,
    OnInit,
    QueryList,
    ViewChildren,
} from '@angular/core';
import { listOrders } from '@modules/charts/data/orders';
import { Order } from '@modules/charts/models/orders.model';
import { SBSortableHeaderDirective, SortEvent } from '@modules/tables/directives';
import { Country } from '@modules/tables/models';
import { CountryService } from '@modules/tables/services';
import { Observable } from 'rxjs';
import { SessionService } from 'core/session.service';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
    selector: 'sb-ng-bootstrap-table',
    changeDetection: ChangeDetectionStrategy.OnPush,
    templateUrl: './ng-bootstrap-table.component.html',
    styleUrls: ['ng-bootstrap-table.component.scss'],
})
export class NgBootstrapTableComponent implements OnInit {
    @Input() pageSize = 4;

    listOrders!: Observable<any>;
    total$!: Observable<any>;
    sortedColumn!: string;
    sortedDirection!: string;
    isModal: boolean = false;
    orderSelect: Order = new Order();
    filterDate: any = '';
    filterCliente: any = '';
    filterStatus: any = '';
    filterPagamento: any = '';
    filterArmacao: any = '';

    @ViewChildren(SBSortableHeaderDirective) headers!: QueryList<SBSortableHeaderDirective>;

    constructor(
        public countryService: CountryService,
        private changeDetectorRef: ChangeDetectorRef,
        private sessionService: SessionService
    ) {}

    ngOnInit() {
        this.countryService.pageSize = this.pageSize;

        this.listOrders = this.countryService.countries$;

        this.total$ = this.countryService.total$;
    }

    onSort({ column, direction }: SortEvent) {
        this.sortedColumn = column;
        this.sortedDirection = direction;
        this.countryService.sortColumn = column;
        this.countryService.sortDirection = direction;
        this.countryService.sortDirection = direction;
        this.changeDetectorRef.detectChanges();
    }

    redirecionarFormularioEdicao(order: Order) {
        debugger
        this.orderSelect = order;
    }

    selectStatus(event: any) {
        debugger;
        this.filterStatus = event.target.value.toLocaleLowerCase();
    }

    selectPagamento(event: any) {
        debugger;
        this.filterPagamento = event.target.value;
    }

    selectArmacao(event: any) {
        debugger;
        this.filterArmacao = event.target.value;
    }

    limpar() {
        this.filterDate = '';
        this.filterCliente = '';
        this.filterStatus = '';
        this.filterStatus = '';
        this.filterArmacao = '';
        this.filterOrder();
    }

    filterOrder() {
        this.countryService.filterDate = this.filterDate;
        this.countryService.filterCliente = this.filterCliente;
        this.countryService.filterStatus = this.filterStatus;
        this.countryService.filterPagamento = this.filterPagamento;
        this.countryService.filterArmacao = this.filterArmacao;

    }
}
