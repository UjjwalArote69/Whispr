// filepath: src/types/css.d.ts
// if you only import for side‑effects you can keep it simple:
declare module '*.css';

// or, if you use CSS modules:
// declare module '*.css' {
//   const classes: { [key: string]: string };
//   export default classes;
// }