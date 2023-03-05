/// <reference types="react-scripts" />

declare module '*.css' {
  const styles: { [key: string]: string };
  export = styles;
}

declare module '*.module.css' {
  const classes: { readonly [key: string]: string };
  export default classes;
}

declare module "*.svg" {
  const content: any;
  export default content;
}

declare module "*.woff2" {
  const content: any;
  export default content;
}

declare module "*.png" {
  const content: any;
  export default content;
}

declare module "*.wav" {
  const content: any;
  export default content;
}
