export interface IconContent {
  contents: string;
  svgAttribs: SVGAttribs;
  fileName: string;
}

export interface PackItem {
  shortName: string;
  packName: string;
  license: string;
  url: string;
  path: string;
}

export interface PackAttachedIcons extends PackItem {
  icons: IconContent[];
  count?: number;
}

export interface SVGAttribs {
  viewBox?: string;
  height?: string;
}

export interface PackageJSONExport {
  [key: string]: PackageJSONItem;
}

interface PackageJSONItem {
  [key: string]: unknown;
}
