export interface INewsResponseJSON {
  _type: string;
  webSearchUrl: string;
  value?: IArticle[] | null;
}
export interface IArticle {
  _type: string;
  name: string;
  url: string;
  image?: Image | null;
  description: string;
  provider?: ProviderEntity[] | null;
  datePublished: string;
}
export interface Image {
  _type: string;
  thumbnail: Thumbnail;
  isLicensed: boolean;
}
export interface Thumbnail {
  _type: string;
  contentUrl: string;
  width: number;
  height: number;
}
export interface ProviderEntity {
  _type: string;
  name: string;
  image: Image1;
}
export interface Image1 {
  _type: string;
  thumbnail: Thumbnail1;
}
export interface Thumbnail1 {
  _type: string;
  contentUrl: string;
}
