export class Cliente  {
    constructor(
        public id?: number,
        public cpf?: string,
        public  nome?: string,
        public email?: string,
        public telefone?: string,
        public dataNacimento?:string,
    ) {}
    transform(dados: Cliente ): Cliente  {
        if (dados) {
            this.id = dados.id;
            this.cpf = dados.cpf;
            this.nome = dados.email;
            this.telefone = dados.telefone;
            this.dataNacimento = dados.dataNacimento;
        }
        return this;
    }
}
