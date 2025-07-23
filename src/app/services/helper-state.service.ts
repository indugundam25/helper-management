import { Injectable, Input, signal } from '@angular/core';
import { IHelper } from '../models/helper.model';
import { HelperService } from './helper.service';

@Injectable({
    providedIn: 'root'
})
export class HelperStateService {
    private _helpers = signal<IHelper[]>([]);
    constructor(private helperService: HelperService) { }
    helpers: IHelper[] | any;
    get allhelpers() {
        return this._helpers;
    }

    loadHelpers() {
        this.helperService.getAllHelpers().subscribe({
            next: (helpers) => this._helpers.set(this.helpers),
            error: (err) => console.error('Error loading helpers', err)
        });
    }

    removeHelperById(id: string) {
        const updated = this._helpers().filter(helper => helper._id !== id);
        this._helpers.set(updated);
    }

}
