interface  FavoritosModel {
  cidades: CidadeFavorita[];
}

interface CidadeFavorita {
  id: number;

  name: string;
  region: string;
  country: string;

  previsao: Previsao[];

  posicao: number;
  cor: string;
  tamanho: 'pequeno' | 'medio' | 'grande';
}

interface Previsao {
  data: Date;

  temp_c: number;
  humidity: number;

  forecastMaxtemp_c: number;
  forecastMintemp_c: number;

  condition: Condition | null;
}

export interface NovoFavorito {
  name: string;
  region: string;
  country: string;
}


export interface FavoritosDto {
    cidadesFavoritas: CidadeFavoritaComTempoDto[];
}

export interface CidadeFavoritaComTempoDto {
    id: number;
    name: string;
    region: string;
    country: string;
    posicao: number;
    cor: string;
    tamanho: string;

    temp_c: number;
    humidity: number;
    forecastMaxtemp_c: number;
    forecastMintemp_c: number;
    text: string;
    icon: string;

    previsao: PrevisaoFavoritoDto[];
}

export interface PrevisaoFavoritoDto {
    data: Date | string;
    humidity: number;
    forecastMaxtemp_c: number;
    forecastMintemp_c: number;

    text: string;
    icon: string;
}
