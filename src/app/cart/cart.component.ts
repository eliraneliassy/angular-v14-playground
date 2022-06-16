import { FormGroup, FormControl, FormBuilder, NonNullableFormBuilder, FormRecord } from '@angular/forms';
import { Subscription, Observable, interval } from 'rxjs';
import { AService } from './../a.service';
import { Component, OnInit, inject, ChangeDetectorRef, ViewRef, InjectFlags } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {

  a = inject(AService, InjectFlags.Optional);
  form!: FormGroup<MyForm>;
  form2!: FormRecord;

  destory = inejctDestory();

  constructor(private fb: FormBuilder, private nnFormBuilder: NonNullableFormBuilder) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      firstName: this.fb.nonNullable.control(''),
      phoneNumber: this.fb.nonNullable.control(123)
    })

    

    this.form2.addControl('asdasd', this.fb.control(''));
    

    

    this.destory(interval(1000), (value: number) => console.log(value))
  }

}

export interface MyForm {
  firstName: FormControl<string>;
  phoneNumber: FormControl<number>;
}

function inejctDestory() {
  const subscription = new Subscription();

  const viewRef = inject(ChangeDetectorRef) as ViewRef;

  viewRef.onDestroy(() => {
    console.log('destory');
    subscription.unsubscribe();
  })

  return (source$: Observable<any>, observerFn: any) => {
    const sub = source$.subscribe(observerFn);
    subscription.add(sub);
    return sub;
  }
}
