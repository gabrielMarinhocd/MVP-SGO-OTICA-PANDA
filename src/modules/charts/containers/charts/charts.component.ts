import { ChangeDetectionStrategy, Component, OnInit, ViewChild } from '@angular/core';
import { listOrders } from '@modules/charts/data/orders';
import { Order } from '@modules/charts/models/orders.model';
// import { MdbCheckboxModule } from 'mdb-angular-ui-kit/checkbox';
import { FormBuilder, FormGroup } from '@angular/forms';
import { SessionService } from 'core/session.service';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NgxMaskModule, IConfig } from 'ngx-mask';


@Component({
    selector: 'sb-charts',
    changeDetection: ChangeDetectionStrategy.OnPush,
    templateUrl: './charts.component.html',
    styleUrls: ['charts.component.scss'],
})
export class ChartsComponent implements OnInit {
    @ViewChild('pagamentoModal') modalConfirm: any;
    listOrders: Order[] = [];
    form!: FormGroup;
    newOrder: Order = new Order();
    formLente: boolean = false;
    formOculos: boolean = false;
    isAlteracao: boolean = false;
    isModal: boolean = false;
    orderSelect: Order = new Order();
    customPatterns = { '0': { pattern: new RegExp('-|[0-9]') },  '9': { pattern: new RegExp('[0-9]') } };

    constructor(
        private fb: FormBuilder,
        private sessionService: SessionService
    )
    {}
    ngOnInit() {
      
        this.sessionService.setItem('listOrders', listOrders);
        this.listOrders = this.sessionService.getItem('listOrders');
        this.createForm(new Order());
    }

    createForm(order: Order) {
        this.newOrder = order;
        this.form = this.fb.group({
            id: [order.id, null],
            esfLongeOD: [order.esfLongeOD, , null],
            esfLongeOE: [order.esfLongeOE, null],
            esfPertoOD: [order.esfPertoOD, null],
            esfPertoOE: [order.esfPertoOE, null],
            cilLongeOD: [order.cilLongeOE, null],
            cilLongeOE: [order.cilLongeOE, null],
            cilPertoOD: [order.cilPertoOD, null],
            cilPertoOE: [order.cilPertoOE, null],
            eixoLongeOD: [order.eixoLongeOD, null],
            eixoLongeOE: [order.eixoLongeOE, null],
            eixoPertoOD: [order.eixoPertoOD, null],
            eixoPertoOE: [order.eixoPertoOE, null],
            dnpLongeOD: [order.dnpLongeOD, null],
            dnpLongeOE: [order.dnpLongeOE, null],
            dnpPertoOD: [order.dnpPertoOD, null],
            dnpPertoOE: [order.dnpPertoOE, null],
            alturaLongeOD: [order.alturaLongeOD, null],
            alturaLongeOE: [order.alturaLongeOE, null],
            alturaPertoOD: [order.alturaPertoOD, null],
            alturaPertoOE: [order.alturaPertoOE, null],
            adicao: [order.adicao, null],
            horario: [order.horario, null],
            status: [order.status, null],
            noArmacao: [order.noArmacao, null],
            lente: [order.lente, null],
            oculos: [order.oculos, null],
            valor: [order.valor, null],
            formaPagamento: [order.formaPagamento, null],
            data: [order.data, null],
            dtEntrega: [order.dtEntrega, null],
            noFuncionario: [order.noFuncionario, null],
            cliente: [order.cliente, null],
            tipoLente: [order.tipoLente, null],
            dm: [order.dm, null],
            vert: [order.vert, null],
            hor: [order.hor, null],
            ponte: [order.ponte, null],
            obs: [order.obs, null],
            valorApagar: [order.valorApagar, null],
            sinal: [order.sinal, null],
            parcelaCartao: [order.parcelaCartao, null],
            cpf:[ order.cpf],
            email: [order.email],
            telefone: [order.telefone],
            dtNacimento: [order.dtNacimento],
        });
    }

    verificaDados() {
      
        if (this.form.valid) {
            if (this.isAlteracao) {
                // this.alterar();
            } else {
                this.cadastrar();
            }
        } else {
        }
    }

    cadastrar() {
      
        if (this.form.value.noArmacao) {
            this.form.value.lente = true;
        }

        if (this.form.value.tipoLente) {
            this.form.value.oculos = true;
        }
        this.form.value.status = "ativo"
        this.form.value.noFuncionario = "Admin"

        let b:number = 0
        listOrders.forEach( (a:any) => {
            a.id > b  ? b = a.id : b
        });
        this.form.value.id = ++b

        this.listOrders.push(this.form.value);

        this.sessionService.setItem('listOrders', this.listOrders);
        this.listOrders = this.sessionService.getItem('listOrders');
        this.createForm(new Order());
        window.location.href = './tables'
        alert('Item cadastrado com SUCESSO!!')
    }

    option(id: number) {
        
    }

    redirecionarFormularioEdicao(order: Order) {
      
        this.orderSelect = order
        this.isModal = true;
    }
}
