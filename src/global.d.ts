declare type Nullable<T> = T | null;

declare module '*.graphql' {
  import { DocumentNode } from 'graphql';
  const value: DocumentNode;
  export { value };
}
