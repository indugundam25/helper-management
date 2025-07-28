import { Injectable } from '@angular/core';
import { HelperService } from './helper.service';

@Injectable({ providedIn: 'root' }) //we can create instances for this service in other components
export class FilterService {

    constructor(private helperService: HelperService) { }

    users = this.helperService._users;

    sortByName() {
        const sorted = [...this.users()].sort((a, b) => {
            return a.name.localeCompare(b.name)
        });
        this.helperService._users.set(sorted);
        this.helperService.onSelecthelper(this.helperService._users()[0]);
    }

    sortByID() {
        this.helperService._users.set(
            this.users().sort((a, b) => a.empCode - b.empCode)
        )
        this.helperService.onSelecthelper(this.helperService._users()[0]);
    }

    searchHelpers(keyword: string) {
        const lowerKeyword = keyword.toLowerCase();
        const filtered = this.helperService._dupusers().filter(h =>
            h.name.toLowerCase().includes(lowerKeyword) ||
            h.phone.toLowerCase().includes(lowerKeyword)
        );
        this.helperService._users.set(filtered);
        this.helperService.onSelecthelper(this.helperService._users()[0]);
    }
    filterHelpers(roles: string[], orgs: string[]): void {
        const allHelpers = this.helperService._dupusers();

        const filtered = allHelpers.filter(helper => {
            const matchRole = roles.length ? roles.includes(helper.role) : true;
            const matchOrg = orgs.length ? orgs.includes(helper.organization) : true;
            return matchRole && matchOrg;
        });

        this.helperService._users.set(filtered);
        this.helperService.onSelecthelper(this.helperService._users()[0]);
    }
}
