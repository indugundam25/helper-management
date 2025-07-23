import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";

@Injectable({ providedIn: 'root' })
export class SharedStepService {
    private stepSource = new BehaviorSubject<number>(1);
    step$ = this.stepSource.asObservable();

    setStep(step: number) {
        this.stepSource.next(step);
    }

    get currentStep() {
        return this.stepSource.getValue();
    }
}
