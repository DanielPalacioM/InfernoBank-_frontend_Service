import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BalanceService {
  private balanceSubject = new BehaviorSubject<number>(0);
  balance$: Observable<number> = this.balanceSubject.asObservable();

  setBalance(value: number) {
    this.balanceSubject.next(value);
  }

  getBalance(): number {
    return this.balanceSubject.value;
  }
}
