export class Funcionario  {
    constructor(
        public id?: number,
        public nome?: string,
        public login?: string,
        public senha?: string,
        public perfil?: string,
        public status?:number
    ) {}
    transform(dados: any ): Funcionario  {
        if (dados) {
            this.id = dados.id;
            this.nome = dados.nome;
            this.login = dados.login;
            this.senha = dados.senha;
            this.perfil = dados.perfil;
            this.status = dados.status;
        }
        return this;
    }
}
