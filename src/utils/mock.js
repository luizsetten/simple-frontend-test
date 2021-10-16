export const mock = (value) => new Promise((resolve) => {
  setTimeout(
    () => resolve({
      data: value,
    }),
    2500,
  );
});
