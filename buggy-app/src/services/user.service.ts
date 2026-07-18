export interface User {
  id: number;
  name: string;
}

export const getUser = (): User => {
  const json = '{"id": 1, name: "Nupur"}';

  return JSON.parse(json);
};