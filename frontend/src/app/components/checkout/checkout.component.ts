import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Country } from 'src/app/common/country';
import { State } from 'src/app/common/state';
import { FromService } from 'src/app/services/from.service';
import { CheckoutValidators } from 'src/app/validators/checkout-validators';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {

  checkoutFormGroup!: FormGroup;

  totalPrice: number = 0;
  totalQuantity: number = 0;

  creditCardMonths: number[] = [];
  creditCardYears: number[] = [];

  countries: Country[] = [];
  shippingAddressStates: State[] = [];
  billingAddressStates: State[] = [];

  constructor(private formBuilder: FormBuilder,
    private formService: FromService) { }

  ngOnInit(): void {
    this.checkoutFormGroup = this.formBuilder.group({
      customer: this.formBuilder.group({
        firstName: new FormControl('', [Validators.required, Validators.minLength(2), CheckoutValidators.notOnlyWhitespace]),
        lastName: new FormControl('', [Validators.required, Validators.minLength(2), CheckoutValidators.notOnlyWhitespace]),
        email: new FormControl('', [Validators.required, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')])
      }),
      shippingAddress: this.formBuilder.group({
        street: new FormControl('', [Validators.required, Validators.minLength(2), CheckoutValidators.notOnlyWhitespace]),
        city: new FormControl('', [Validators.required, Validators.minLength(2), CheckoutValidators.notOnlyWhitespace]),
        state: new FormControl('', [Validators.required]),
        country: new FormControl('', [Validators.required]),
        zipCode: new FormControl('', [Validators.required, Validators.minLength(2), CheckoutValidators.notOnlyWhitespace])
      }),
      billingAddress: this.formBuilder.group({
        street: new FormControl('', [Validators.required, Validators.minLength(2), CheckoutValidators.notOnlyWhitespace]),
        city: new FormControl('', [Validators.required, Validators.minLength(2), CheckoutValidators.notOnlyWhitespace]),
        state: new FormControl('', [Validators.required]),
        country: new FormControl('', [Validators.required]),
        zipCode: new FormControl('', [Validators.required, Validators.minLength(2), CheckoutValidators.notOnlyWhitespace])
      }),
      creditCard: this.formBuilder.group({
        cardType: [''],
        nameOnCard: [''],
        cardNumber: [''],
        securityCode: [''],
        expirationMonth: [''],
        expirationYear: ['']
      })
    });

    const startMonth: number = new Date().getMonth() + 1;
    this.formService.getCreditCardMonths(startMonth).subscribe(
      data => {
        this.creditCardMonths = data;
      }
    );

    this.formService.getCreditCardYears().subscribe(
      data => {
        this.creditCardYears = data;
      }
    );

    this.formService.getAddressCountries().subscribe(
      data => {
        this.countries = data;
      }
    );
  }

  handleExpirationDate() {
    const creditCardFormGroup = this.checkoutFormGroup.get('creditCard');

    const currentYear: number = new Date().getFullYear();
    const selectedYear: number = Number(creditCardFormGroup?.value.expirationYear);

    let startMonth: number = 1;

    if (selectedYear === currentYear) {
      startMonth = new Date().getMonth() + 1;
    }

    this.formService.getCreditCardMonths(startMonth).subscribe(
      data => {
        this.creditCardMonths = data;
      }
    );
  }

  handleAddressStates(formGroupName: string) {
    const shippingAddressFormGroup = this.checkoutFormGroup.get(formGroupName);

    const selectedCountryCode: string = shippingAddressFormGroup?.value.country.code;

    this.formService.getAddressStates(selectedCountryCode).subscribe(
      data => {
        if (formGroupName === 'shippingAddress') {
          this.shippingAddressStates = data;
        } else {
          this.billingAddressStates = data;
        }
      }
    );
  }

  copyShippingToBillingAddress(inputElement: HTMLInputElement) {
    if (inputElement.checked) {
      this.billingAddressStates = this.shippingAddressStates;
      this.checkoutFormGroup.controls.billingAddress
        .setValue(this.checkoutFormGroup.controls.shippingAddress.value);
    } else {
      this.billingAddressStates = [];
      this.checkoutFormGroup.controls.billingAddress.reset();
    }
  }

  onSubmit() {
    if (this.checkoutFormGroup.invalid) {
      this.checkoutFormGroup.markAllAsTouched();
    }
  }

  get firstName() {
    return this.checkoutFormGroup.get('customer.firstName');
  }

  get lastName() {
    return this.checkoutFormGroup.get('customer.lastName');
  }

  get email() {
    return this.checkoutFormGroup.get('customer.email');
  }

  get shippingAddressStreet() {
    return this.checkoutFormGroup.get('shippingAddress.street');
  }

  get shippingAddressCity() {
    return this.checkoutFormGroup.get('shippingAddress.city');
  }

  get shippingAddressCountry() {
    return this.checkoutFormGroup.get('shippingAddress.country');
  }

  get shippingAddressState() {
    return this.checkoutFormGroup.get('shippingAddress.state');
  }

  get shippingAddressZipcode() {
    return this.checkoutFormGroup.get('shippingAddress.zipcode');
  }

  get billingAddressStreet() {
    return this.checkoutFormGroup.get('billingAddress.street');
  }

  get billingAddressCity() {
    return this.checkoutFormGroup.get('billingAddress.city');
  }

  get billingAddressCountry() {
    return this.checkoutFormGroup.get('billingAddress.country');
  }

  get billingAddressState() {
    return this.checkoutFormGroup.get('billingAddress.state');
  }

  get billingAddressZipcode() {
    return this.checkoutFormGroup.get('billingAddress.zipcode');
  }

}
