import { Injectable } from "@nestjs/common";
import { Subject } from "rxjs";
import { Event } from "./models/event.model";

@Injectable()
export class WsService {
  #events$ = new Subject<Event>();
  events$ = this.#events$.asObservable();

  emit(
    event: string,
    data: unknown,
    to?: string | string[],
    except?: string | string[],
  ) {
    this.#events$.next({
      event,
      data,
      to,
      except,
    });
  }
}
