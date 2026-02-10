declare module "swagger-jsdoc" {
  export interface Options {
    [key: string]: any;
  }
  function swaggerJSDoc(options?: Options): any;
  namespace swaggerJSDoc {}
  export default swaggerJSDoc;
}