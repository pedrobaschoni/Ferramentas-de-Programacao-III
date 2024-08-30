import { Component } from '@angular/core';
import { AlertController, ToastController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  public nome: string = 'Pedro'; 
  public nomes: string[] = [];
  public nomesFiltrados: string[] = [];


  // public showMessage = false;

  constructor(
    private toastController: ToastController,
    private alertController: AlertController) {}

    private async exibirAlert(index: number) {
      const alert = await this.alertController.create({
        message: 'Confirma a exclusão?',
        buttons: 
        [
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

  public setShowMessage(show: boolean) {
    // this.showMessage = show;
  }

  public adicionar(): void {
    this.nomes.push(this.nome);

    console.log(this.nomes);

    // this.setShowMessage(true);

    this.exibirMensagem("Pessoa adicionada!");
  }

  public excluir(index: number) {
    console.log('Método excluir');

    this.exibirAlert(index);
  }


}
