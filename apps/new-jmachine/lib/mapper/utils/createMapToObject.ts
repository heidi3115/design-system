type DefaultObjType = { type: string; name: string };

type TypeMap<T extends ReadonlyArray<DefaultObjType>> = {
  [K in T[number]['type']]: Extract<T[number], { type: K }>['name'];
};

type ReverseTypeMap<T extends ReadonlyArray<DefaultObjType>> = {
  [K in T[number]['name']]: Extract<T[number], { name: K }>['type'];
};

export default function createMapToObject<T extends ReadonlyArray<DefaultObjType>>(typeArray: T) {
  const typeMap = Object.fromEntries(typeArray.map(({ type, name }) => [type, name])) as TypeMap<T>;

  const nameMap = Object.fromEntries(typeArray.map(({ type, name }) => [name, type])) as ReverseTypeMap<T>;

  return { typeMap, nameMap };
}
