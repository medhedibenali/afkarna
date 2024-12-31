import { Injectable } from '@angular/core';
import { Workspace } from '../model/workspace';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { API } from '../../../config/api.config';

@Injectable({
  providedIn: 'root'
})
export class WorkspaceService {
  private workspaces: Workspace[] = []

  #selectWorkspaceSuject$ = new Subject<Workspace>();

  selectWorkspace$ = this.#selectWorkspaceSuject$.asObservable();

  constructor(
    private http: HttpClient
  ) { }

  getWorkspaces() {
    return this.http.get<Workspace[]>(API.workspace);
  }

  getWorkspaceById(id: string) {
    return this.http.get<Workspace>(`${API.workspace}/${id}`);
  }

}
