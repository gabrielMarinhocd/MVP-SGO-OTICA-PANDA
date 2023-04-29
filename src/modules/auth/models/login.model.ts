import { Funcionario } from "./funcionario.model";


export class Login  {
    constructor(
        public login?: String,
        public senha?: String,
    ) {}
    transform(dados: any ): Login  {
        if (dados) {
            this.login = dados.login;
            this.senha = dados.senha;
        }
        return this;
    }
}

// export class Login  {
//     constructor(
//         public auth?: boolean,
//         public funcionario?: Funcionario,
//         public token?: String
//     ) {}
//     transform(dados: any ): Login  {
//         if (dados) {
//             this.auth = dados.auth;
//             this.funcionario = dados.funcionario;
//             this.token = dados.token;
//         }
//         return this;
//     }
// }
