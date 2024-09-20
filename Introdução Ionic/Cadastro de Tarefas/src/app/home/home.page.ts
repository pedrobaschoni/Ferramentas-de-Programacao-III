import { Component } from '@angular/core';
import { AlertController, ToastController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  public nome: string = '';
  public nomes: string[] = [];
  public status: string[] = [];

  constructor(
    private toastController: ToastController,
    private alertController: AlertController
  ) {}

  private async exibirAlert(index: number) {
    const alert = await this.alertController.create({
      message: 'Confirma a exclusão?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          handler: () => {
            console.log('Alert canceled');
          },
        },
        {
          text: 'Continuar',
          role: 'confirm',
          handler: () => {
            const pessoaExcluida = this.nomes.splice(index, 1);
            this.status.splice(index, 1);

            this.exibirMensagem(`${pessoaExcluida} foi excluído(a).`);
          },
        },
      ],
    });

    await alert.present();
  }

  private async exibirMensagem(mensagem: string) {
    const toast = await this.toastController.create({
      message: mensagem,
      duration: 1500,
      position: 'bottom',
    });
    await toast.present();
  }

  public adicionar(): void {
    const nomeSemEspaco = this.nome.trim();
    if (nomeSemEspaco === '') {
      this.exibirMensagem('Informe o nome da tarefa');
    } else if (this.nomes.includes(nomeSemEspaco)) {
      this.exibirMensagem('A tarefa já existe');
    } else {
      this.nomes.push(nomeSemEspaco);
      this.status.push('Cadastrada');
      this.exibirMensagem(`Tarefa ${this.nome} cadastrada!`);
      this.nome = '';
    }
    console.log(this.nomes);
  }
 
  public excluir(index: number) {
    console.log('Método excluir');

    if(this.status[index] === 'Cancelada' || this.status[index] === 'Finalizada') {
      this.exibirAlert(index);

    } else {
      this.exibirMensagem("A tarefa não pode ser excluida");
    }

  }

  public cancelar(index: number) {
    if (this.status[index] === 'Cadastrada' || this.status[index] === 'Andamento') {
      this.status[index] = 'Cancelada';
      const tarefaCancelada = this.nomes[index];

      this.exibirMensagem(`${tarefaCancelada} foi cancelada(o).`);
    } else {
      this.exibirMensagem('A tarefa não pode ser cancelada');
    }
  }

  public andamento(index: number) {
    if(this.status[index] === 'Cadastrada') {
      this.status[index] = 'Andamento';
      const tarefaAndamento = this.nomes[index];

      this.exibirMensagem(`${tarefaAndamento} foi iniciada(o).`);
    } else {
      this.exibirMensagem("A tarefa já foi finalizada");
    }
  }

  public finalizar(index: number) {
    if(this.status[index] === 'Andamento') {
      this.status[index] = 'Finalizada';
      const tarefaFinalizada = this.nomes[index];

      this.exibirMensagem(`${tarefaFinalizada} foi finalizada(o).`);
    } else {
      this.exibirMensagem("A tarefa não pode ser finalizada");
    }
  }

  getStatus(index: number): string {
    return this.status[index];
  }
}
