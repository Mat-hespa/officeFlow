import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';

interface ApiResponse {
  status: boolean;
  message?: string;
  companies: any[];
  setores: any[];
  pessoas: any[];
  pessoasNames: any[];
}

@Component({
  selector: 'app-lista',
  templateUrl: './lista.component.html',
  styleUrls: ['./lista.component.scss'],
})
export class ListaComponent implements OnInit {
  selectedOption: string = 'SETOR';
  headers: { [key: string]: string[] } = {
    EMPRESA: [
      'Razão Social',
      'Nome Fantasia',
      'CNPJ',
      'IE',
      'IM',
      'Telefone',
      'Email',
    ],
    PESSOA: [
      'Nome',
      'CPF',
      'RG',
      'CTPS',
      'Telefone',
      'Email',
      'Empresa',
      'Setor',
      'Cargo',
      'Ações',
    ],
    SETOR: [
      'Empresa',
      'Nome do setor',
      'Responsavel',
      'Contato',
      'Status do setor',
      'Ações',
    ],
  };
  empresas: any[] = [];
  setores: any[] = [];
  pessoas: any[] = [];
  usuarioLogadoEmail: string = '';
  pessoasNames: any[] = [];

  constructor(private http: HttpClient, private router: Router) {}

  ngOnInit(): void {
    // this.loadEmpresas();
    this.loadNomePessoas();
    this.loadSetores()
  }

  loadNomePessoas(): void {
    this.http.get<ApiResponse>(`${environment.apiUrl}/namePessoas`).subscribe(
      (response) => {
        if (response.status) {
          this.pessoasNames = response.pessoasNames;
        } else {
          console.error('Erro ao recuperar empresas:', response.message);
        }
      },
      (error) => {
        console.error('Erro ao recuperar empresas:', error);
      }
    );
  }

  loadSetores(): void {
    this.http.get<ApiResponse>(`${environment.apiUrl}/setores`).subscribe(
      (response) => {
        if (response.status) {
          this.setores = response.setores;
        } else {
          console.error('Erro ao recuperar setores:', response.message);
        }
      },
      (error) => {
        console.error('Erro ao recuperar setores:', error);
      }
    );
  }

  loadPessoas(): void {
    this.http.get<ApiResponse>(`${environment.apiUrl}/pessoas`).subscribe(
      (response) => {
        if (response.status) {
          this.pessoas = response.pessoas;
        } else {
          console.error('Erro ao recuperar pessoas:', response.message);
        }
      },
      (error) => {
        console.error('Erro ao recuperar pessoas:', error);
      }
    );
  }

  onOptionChange(event: Event) {
    // Não é mais necessário, a seleção é feita diretamente no botão
  }

  editarPessoa(email: string) {
    sessionStorage.setItem('emailParaEdicao', email);
    this.router.navigate(['/editUser']);
  }

  editarSetor(nomeSetor: string) {
    sessionStorage.setItem('nomeSetor', nomeSetor);
    this.router.navigate(['/editSetor']);
  }
}
