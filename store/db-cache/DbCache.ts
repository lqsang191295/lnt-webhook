export default class DbCache<T> {
  private cache: T | null = null;

  async getOrFetch(fetcher: () => Promise<T>): Promise<T> {
    if (this.cache) return this.cache;

    const data = await fetcher();
    this.cache = data;
    return data;
  }

  clear() {
    this.cache = null;
  }

  has(): boolean {
    return this.cache !== null;
  }

  get(): T | null {
    return this.cache;
  }

  set(data: T) {
    this.cache = data;
  }
}
