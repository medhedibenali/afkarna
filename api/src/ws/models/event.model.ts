export interface Event {
  event: string;
  data: unknown;
  to?: string | string[];
  except?: string | string[];
}
