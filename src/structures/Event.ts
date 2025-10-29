class Event {
  public declare name: string;
  public declare once: boolean;
  public declare run: (...args: any[]) => void;
}

export { Event };
