export interface ICountdownTimerConfig {
  timeRemaining: number;
  tickIntervalMs?: number;
  tick?: (timeRemainingMs: number) => void;
  complete?: () => void;
}

export class CountdownTimer {
  private timeRemaining: number;
  private tickIntervalMs: number;
  private tick?: (timeRemainingMs: number) => void;
  private complete?: () => void;

  private paused: boolean = true;
  private lastTime: number;
  private intervalId: number;

  constructor(config: ICountdownTimerConfig) {
    this.timeRemaining = config.timeRemaining;
    this.tickIntervalMs = config.tickIntervalMs || 1000;
    this.tick = config.tick;
    this.complete = config.complete;
  }

  public start(): void {
    if (this.timeRemaining > 0) {
      this.intervalId = setInterval(() => this.tock(), this.tickIntervalMs);
      this.lastTime = Date.now();
      this.paused = false;
    }
  }

  public pause(): void {
    if (!this.paused && this.timeRemaining > 0) {
      this.tock();
      clearInterval(this.intervalId);
      this.paused = true;
    }
  }

  public getTimeRemaining(): number {
    return this.timeRemaining;
  }

  public isPaused(): boolean {
    return this.paused;
  }

  private tock(): void {
    if (this.paused) { return; }
    const now = Date.now();
    this.timeRemaining = this.timeRemaining - (now - this.lastTime);
    this.lastTime = now;

    if (this.timeRemaining < 0) {
      if (this.complete) {
        this.complete();
      }
      clearInterval(this.intervalId);
      this.intervalId = undefined;
      return;
    }

    if (this.tick) {
      this.tick(this.timeRemaining);
    }
  }
}