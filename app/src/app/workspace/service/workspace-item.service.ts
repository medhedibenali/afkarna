import { Injectable, signal } from "@angular/core";
import { WorkspaceItem } from "../model/workspace-item";
import { Observable, Subject, tap } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { API } from "../../../config/api.config";

@Injectable({
  providedIn: "root",
})
export class WorkspaceItemService {
  private workspacesItem: WorkspaceItem[] = [];

  selectedNodeSignal = signal<WorkspaceItem | null>(
    sessionStorage.getItem("selectedNode")
      ? JSON.parse(sessionStorage.getItem("selectedNode")!)
      : null,
  );

  private newItemSubject$ = new Subject<any>();
  newItem$ = this.newItemSubject$.asObservable();

  constructor(
    private http: HttpClient,
  ) {}

  getWorkspaceItemById(id: string) {
    return this.http.get<WorkspaceItem>(`${API.workspceItem}/${id}`);
  }

  getWorkspaceItemsByParentId(id: string): Observable<WorkspaceItem[]> {
    return this.http.get<WorkspaceItem[]>(`${API.workspceItem}/parent/${id}`);
  }

  createItem(itemData: any) {
    return this.http.post<any>(API.workspceItem, itemData).pipe(
      tap((newItem) => {
        this.newItemSubject$.next(newItem);
      }),
    );
  }

  deleteItem(id: string) {
    return this.http.delete<any>(`${API.workspceItem}/${id}`);
  }
}
