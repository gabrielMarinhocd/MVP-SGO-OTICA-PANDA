import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Funcionario } from '@modules/auth/models/funcionario.model';
import { Login } from '@modules/auth/models/login.model';
import { AuthService } from '@modules/auth/services';
import { SessionService } from 'core/session.service';

@Component({
    selector: 'sb-login',
    changeDetection: ChangeDetectionStrategy.OnPush,
    templateUrl: './login.component.html',
    styleUrls: ['login.component.scss'],
})
export class LoginComponent implements OnInit {
    funcionario: Funcionario = new Funcionario();
    form!: FormGroup;

    constructor(
        private fb: FormBuilder,
        private authService: AuthService,
        private sessionService: SessionService
    ) {}
    ngOnInit() {
        this.createForm(new Login());
    }

    login() {
        debugger
        console.log('Login');
        this.funcionario.login = this.form.value.login;
        this.funcionario.senha = this.form.value.senha;
        this.form.value

        this.authService.getLogin(this.funcionario).subscribe(data => {
            console.log(data);
            this.sessionService.setItem('user', data);
        });
    }

    createForm(data: Login) {
        this.form = this.fb.group({
            login: [data.login, null],
            senha: [data.senha, null],
        });
    }
}
