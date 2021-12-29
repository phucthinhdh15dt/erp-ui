export const useTest = () => {
  return useState<boolean>("test", () => false);
};
