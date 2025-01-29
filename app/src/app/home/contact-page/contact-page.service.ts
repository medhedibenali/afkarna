import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { environment } from "../../../environments/environment";
import { ContactDto } from "./contact.dto";
import { map, tap } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class contactPageService {
  private http = inject(HttpClient);

  private contactEndpoint = `${environment.apiUrl}/contact`;
  #contactData: any;

  constructor() {}
  contact(contactDto: ContactDto) {
    return this.http.post<void>(`${this.contactEndpoint}`, contactDto).pipe(
      tap((data) => void this.#contactData.set(data)),
      map(() => {}),
    );
  }
}
