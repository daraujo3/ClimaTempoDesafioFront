import { Component, OnInit } from '@angular/core';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-favoritos',
  imports: [],
  templateUrl: './favoritos.html',
  styleUrl: './favoritos.css',
})
export class Favoritos implements OnInit {

tamanhoCard: 'pequeno' | 'medio' | 'grande' = 'medio';
  corDestaque: string = '#0d6efd';
  private deleteTimer: any;

  favoritos: CidadeFavorita[] = [];

  ngOnInit(): void {
    this.carregarFavoritosMock();
  }

  // ==========================================
  // LÓGICA DE DRAG AND DROP (POSIÇÃO MANUAL)
  // ==========================================

  onDrop(event: CdkDragDrop<CidadeFavorita[]>) {
    // moveItemInArray é uma função nativa do Angular CDK que reordena o array visualmente e logicamente
    moveItemInArray(this.favoritos, event.previousIndex, event.currentIndex);

    // Após alterar no array local, chamamos a função para salvar no banco/localstorage
    this.salvarPosicoes();
  }

  private salvarPosicoes(): void {
    // Aqui você enviaria a nova ordem para a sua API ou salvaria no LocalStorage.
    // Exemplo de como preparar os dados: pegamos apenas os IDs na nova ordem.
    const ordemIds = this.favoritos.map(fav => fav.id);

    console.log('Nova ordem salva:', ordemIds);
    // localStorage.setItem('ordemFavoritos', JSON.stringify(ordemIds));
    // this.apiService.salvarOrdem(ordemIds).subscribe();
  }

  // ==========================================
  // LÓGICA DE SEGURAR PARA DELETAR MANTIDA
  // ==========================================
  startDelete(id: number): void {
    this.deleteTimer = setTimeout(() => {
      this.removerFavorito(id);
    }, 1000);
  }

  cancelDelete(): void {
    if (this.deleteTimer) {
      clearTimeout(this.deleteTimer);
      this.deleteTimer = null;
    }
  }

  private removerFavorito(id: number): void {
    this.favoritos = this.favoritos.filter(fav => fav.id !== id);
    this.deleteTimer = null;
    this.salvarPosicoes(); // Salva a nova ordem após a exclusão
  }

  private carregarFavoritosMock(): void {
    // Carregamento mantido...
  }

}
