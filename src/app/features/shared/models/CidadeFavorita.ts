interface  FavoritosModel {
  cidades: CidadeFavorita[];
}

export interface CidadeFavorita {
  id: number;

  name: string;
  region: string;
  country: string;

  posicao: number;
  isExpanded: boolean;
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
    isExpanded: boolean;

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
