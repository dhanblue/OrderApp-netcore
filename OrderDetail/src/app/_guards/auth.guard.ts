import { CanActivateFn } from '@angular/router';
import { AcccountService } from '../_services/acccount.service';
import { ToastrService } from 'ngx-toastr';
import { inject } from '@angular/core';

export const authGuard: CanActivateFn = (route, state) => {
  const accountService = inject(AcccountService);
  const toastr = inject(ToastrService);

  if (accountService.currentUser()) {
    return true;

  }
  else {
    toastr.error("You do no have accesss");
    return false;
  }

};
