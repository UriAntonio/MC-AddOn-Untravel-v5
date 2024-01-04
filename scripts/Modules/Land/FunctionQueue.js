export default class FunctionQueue {
  constructor() {
    this.queue = [];
    this.running = false;
  }

  enqueue(fn) {
    return new Promise((resolve) => {
      this.queue.push({
        fn,
        resolve,
      });

      if (!this.running) {
        this.runNext();
      }
    });
  }

  async runNext() {
    if (this.queue.length > 0) {
      const { fn, resolve } = this.queue.shift();
      this.running = true;

      try {
        const result = await fn();
        resolve(result);
      } catch (error) {
        if (error) console.error(error);
        resolve(); // Resolve even if there's an error to continue with the next function
      }

      this.running = false;
      this.runNext();
    }
  }
}