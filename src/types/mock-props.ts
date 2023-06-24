type Properties<T> = {
  -readonly [prop in keyof T]?: prop extends 'valueOf' | 'toString' ? unknown : T[prop]
}

export default Properties
