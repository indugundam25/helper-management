import { Injectable, signal } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { HelperService } from './helper.service';

@Injectable({ providedIn: 'root' })
export class FilterService {
    private readonly baseUrl = 'http://localhost:3000/api/helpers';

    constructor(private http: HttpClient, private helperService: HelperService) { }

    users = this.helperService._users;

    sortByName(order: 'asc' | 'desc' = 'asc') {
        const sorted = [...this.users()].sort((a, b) => {
            return order === 'asc'
                ? a.name.localeCompare(b.name)
                : b.name.localeCompare(a.name);
        });
        this.helperService._users.set(sorted);
    }

    sortByID() {
        this.helperService._users.set(
            this.users().sort((a, b) => a.empCode - b.empCode)
        )
    }

    searchHelpers(keyword: string) {
        const lowerKeyword = keyword.toLowerCase();
        const filtered = this.helperService._dupusers().filter(h =>
            h.name.toLowerCase().includes(lowerKeyword) ||
            h.phone.toLowerCase().includes(lowerKeyword)
        );
        this.helperService._users.set(filtered);
    }

}
