export class WorkshopModeStore {
  private readonly listeners = new Set<() => void>();

  constructor(private readonly key: string = 'agroprecio:workshop') {}

  readonly subscribe = (listener: () => void): (() => void) => {
    this.listeners.add(listener);
    const onStorage = (event: StorageEvent) => {
      if (event.key === this.key) listener();
    };
    window.addEventListener('storage', onStorage);
    return () => {
      this.listeners.delete(listener);
      window.removeEventListener('storage', onStorage);
    };
  };

  readonly getSnapshot = (): boolean => {
    try {
      return window.localStorage.getItem(this.key) === '1';
    } catch {
      return false;
    }
  };

  readonly getServerSnapshot = (): boolean => false;

  readonly set = (value: boolean): void => {
    try {
      window.localStorage.setItem(this.key, value ? '1' : '0');
    } catch {
      // storage unavailable: the mode simply will not persist
    }
    this.listeners.forEach((listener) => listener());
  };
}

export const workshopStore = new WorkshopModeStore();