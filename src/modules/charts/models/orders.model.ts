import { Cliente } from './cliente.model';

export class Order {
    constructor(
        public id?: number,
        public esfLongeOD?: number,
        public esfLongeOE?: number,
        public esfPertoOD?: number,
        public esfPertoOE?: number,
        public cilLongeOD?: number,
        public cilLongeOE?: number,
        public cilPertoOD?: number,
        public cilPertoOE?: number,
        public eixoLongeOD?: number,
        public eixoLongeOE?: number,
        public eixoPertoOD?: number,
        public eixoPertoOE?: number,
        public dnpLongeOD?: number,
        public dnpLongeOE?: number,
        public dnpPertoOD?: number,
        public dnpPertoOE?: number,
        public alturaLongeOD?: number,
        public alturaLongeOE?: number,
        public alturaPertoOD?: number,
        public alturaPertoOE?: number,
        public adicao?: number,
        public horario?: String,
        public status?: String,
        public noArmacao?: String,
        public lente?: boolean,
        public oculos?: boolean,
        public valor?: number,
        public formaPagamento?: String,
        public data?: String,
        public dtEntrega?: String,
        public noFuncionario?: string,
        public cliente?: string,
        public cpf?: string,
        public email?: string,
        public telefone?: string,
        public dtNacimento?: string,
        public tipoLente?: string,
        public dm?: number,
        public vert?: number,
        public hor?: number,
        public ponte?: number,
        public obs?: number,
        public valorApagar?: number,
        public sinal?: string,
        public parcelaCartao?: string,
        public coVendendor?: number
    ) {}

    transform(dados: any): Order {
        if (dados) {
            this.id = dados.id;
            this.esfLongeOD = dados.esfLongeOD;
            this.esfLongeOE = dados.esfLongeOE;
            this.esfPertoOD = dados.esfPertoOD;
            this.cilPertoOE = dados.cilPertoOD;
            this.cilLongeOD = dados.cilLongeOD;
            this.cilLongeOE = dados.cilLongeOE;
            this.cilPertoOD = dados.cilPertoOD;
            this.cilPertoOE = dados.cilPertoOD;
            this.eixoLongeOD = dados.eixoLongeOD;
            this.eixoLongeOE = dados.eixoLongeOE;
            this.eixoPertoOD = dados.eixoPertoOD;
            this.eixoPertoOE = dados.eixoPertoOD;
            this.dnpLongeOD = dados.dnpLongeOD;
            this.dnpLongeOE = dados.dnpLongeOE;
            this.dnpPertoOD = dados.dnpPertoOD;
            this.dnpPertoOE = dados.dnpPertoOD;
            this.alturaLongeOD = dados.alturaLongeOD;
            this.alturaLongeOE = dados.alturaLongeOE;
            this.alturaPertoOD = dados.alturaPertoOD;
            this.alturaPertoOE = dados.alturaPertoOD;
            this.adicao = dados.adicao;
            this.horario = dados.horario;
            this.status = dados.status;
            this.noArmacao = dados.noArmacao;
            this.lente = dados.lente;
            this.oculos = dados.oculos;
            this.valor = dados.valor;
            this.formaPagamento = dados.formaPagamento;
            this.data = dados.data;
            this.dtEntrega = dados.dtEntrega;
            this.noFuncionario = dados.noFuncionario;
            this.dm = dados.dm;
            this.vert = dados.vert;
            this.hor = dados.hor;
            this.ponte = dados.ponte;
            this.obs = dados.obs;
            this.valorApagar = dados.valorApagar;
            this.sinal = dados.sinal;
            this.parcelaCartao = dados.parcelaCartao;
            this.tipoLente = dados.tipoLente;
            this.coVendendor = dados.coVendendor;
            this.cliente = dados.cliente;
            this.cpf= dados.cpf;
            this.email= dados.email;
            this.telefone= dados.telefone;
            this.dtNacimento= dados.dtNacimento;
        }
        return this;
    }
}
