import { Injectable, signal } from '@angular/core';
import { WorkspaceItem } from '../model/workspace-item';
import { Observable, Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { API } from '../../../config/api.config';

@Injectable({
  providedIn: 'root'
})
export class WorkspaceItemService {
  private workspacesItem: WorkspaceItem[] = []

  selectedNodeSignal = signal<WorkspaceItem | null>(null);

  constructor(
    private http: HttpClient
  ) { }

  getWorkspaceItemById(id: string) {
    return this.http.get<WorkspaceItem>(`${API.workspceItem}/${id}`);
  }

  getWorkspaceItemsByParentId(id: string): Observable<WorkspaceItem[]> {
    return this.http.get<WorkspaceItem[]>(`${API.workspceItem}/parent/${id}`);
  }
}
