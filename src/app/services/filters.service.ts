import { Injectable, signal } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { HelperService } from './helper.service';
import { IHelper } from '../models/helper.model';

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
        if (keyword.length > 0) {
            const lowerKeyword = keyword.toLowerCase();
            const filtered = this.helperService._dupusers().filter(h =>
                h.name.toLowerCase().includes(lowerKeyword) ||
                h.phone.toLowerCase().includes(lowerKeyword)
            );
            this.helperService._users.set(filtered);  //_dupusers iis the original users without changes
        }
        else {
            this.helperService._users.set(this.helperService._users());
        }
    }
    filterHelpers(roles: string[], orgs: string[]): void {
        const allHelpers = this.helperService._dupusers();

        const filtered = allHelpers.filter(helper => {
            const matchRole = roles.length ? roles.includes(helper.role) : true;
            const matchOrg = orgs.length ? orgs.includes(helper.organization) : true;
            return matchRole && matchOrg;
        });

        this.helperService._users.set(filtered);
    }

    editHelperSignal = signal<IHelper | null>(null);

    setHelper(helper: IHelper) {
        this.editHelperSignal.set(helper);
    }

    clearHelper() {
        this.editHelperSignal.set(null);
    }


}
