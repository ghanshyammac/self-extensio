export const GREETING = 'GREETING';

export const sayHello = (message) => ({
  type: GREETING,
  message,
});
