import { computed, Injectable, signal } from "@angular/core";
import { Workspace } from "../model/workspace";
import { Subject, tap } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { API } from "../../../config/api.config";

@Injectable({
  providedIn: "root",
})
export class WorkspaceService {

  public selectedWorkspace = signal<Workspace | null>(sessionStorage.getItem("selectedWorkspace") ? JSON.parse(sessionStorage.getItem("selectedWorkspace")!) : null);

  private newWorkspaceSubject$ = new Subject<Workspace>();
  newWorkspace$ = this.newWorkspaceSubject$.asObservable();

  constructor(private http: HttpClient) {}

  getWorkspaces() {
    return this.http.get<{ data: Workspace[]; count: number }>(API.workspace);
  }

  getWorkspaceById(id: string) {
    return this.http.get<Workspace>(`${API.workspace}/${id}`);
  }

  createWorkspace(workspaceData: any) {
    return this.http.post<Workspace>(API.workspace, workspaceData).pipe(
      tap((newWorkspace) => {
        this.newWorkspaceSubject$.next(newWorkspace);
      }),
    );
  }
}
