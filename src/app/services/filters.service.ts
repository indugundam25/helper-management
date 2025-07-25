import { Injectable, signal } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { IHelper } from '../models/helper.model';
import { toSignal } from '@angular/core/rxjs-interop';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class FilterService {
    private readonly baseUrl = 'http://localhost:3000/api/helpers';

    private helpersSignal = signal<IHelper[]>([]);
    private originalHelpers: IHelper[] = [];

    constructor(private http: HttpClient) {
        this.loadInitialHelpers();
    }

    private loadInitialHelpers(): void {
        this.http.get<{ helpers: IHelper[] }>(this.baseUrl).subscribe(res => {
            this.originalHelpers = res.helpers;
            this.helpersSignal.set(res.helpers);
        });
    }

    get helpers() {
        return this.helpersSignal.asReadonly();
    }

    sortByName(order: 'asc' | 'desc' = 'asc') {
        const sorted = [...this.helpersSignal()].sort((a, b) => {
            return order === 'asc'
                ? a.name.localeCompare(b.name)
                : b.name.localeCompare(a.name);
        });
        this.helpersSignal.set(sorted);
    }

    searchHelpers(keyword: string) {
        const lowerKeyword = keyword.toLowerCase();
        const filtered = this.originalHelpers.filter(h =>
            h.name.toLowerCase().includes(lowerKeyword) ||
            h.phone.toLowerCase().includes(lowerKeyword)
        );
        this.helpersSignal.set(filtered);
    }

    resetFilters() {
        this.helpersSignal.set([...this.originalHelpers]);
    }
}
